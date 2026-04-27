# Designing Scalable Database Schemas

A schema that feels fine at 10,000 rows can become a serious operational problem at 10 million. The decisions you make early — normalization level, index strategy, ID choice, pagination approach — compound over time. This post covers the principles and patterns that make schemas age well.

## Normalization: How Far Is Far Enough?

Full normalization (3NF) eliminates redundancy and update anomalies. In practice, most production schemas land somewhere between 2NF and 3NF, with deliberate denormalization where read performance demands it.

**A pragmatic starting point:**
- Normalize by default
- Denormalize with intention, documenting why
- Use materialized views or application-level caching before adding redundant columns

```sql
-- Normalized: category name lives in one place
CREATE TABLE categories (
  id   SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE products (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  category_id INT REFERENCES categories(id),
  price_cents INT NOT NULL
);

-- Denormalized (only justified if category_name is read-heavy
-- and JOIN latency is measurable):
-- ALTER TABLE products ADD COLUMN category_name TEXT;
```

## Choosing Primary Keys

`SERIAL`/`BIGSERIAL` auto-incrementing integers are simple and index-friendly. But they leak information (record counts, creation order) and can cause issues with distributed systems.

**UUIDs** (v4) solve the leakage problem but are random, which causes index fragmentation over time.

**ULIDs and UUID v7** give you the best of both worlds — globally unique, URL-safe, and time-ordered, which means they insert at the "end" of B-tree indexes just like integers:

```sql
-- Using pgcrypto for UUID v4 (PostgreSQL)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE orders (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

For most new projects: use `BIGSERIAL` for internal/join tables, UUID v7 (or ULID) for externally-facing resources.

## Indexing Strategy

Indexes speed up reads and slow down writes. The goal is not maximum indexes — it's the right indexes.

**Rules of thumb:**
- Index every foreign key column (PostgreSQL doesn't do this automatically)
- Index columns used in `WHERE`, `ORDER BY`, and `JOIN` predicates
- Use composite indexes for queries that always filter on multiple columns together, with the most selective column first
- Use partial indexes to index only the rows you actually query

```sql
-- Index the FK
CREATE INDEX idx_orders_user_id ON orders(user_id);

-- Composite index for a common filter pattern
CREATE INDEX idx_orders_user_status ON orders(user_id, status);

-- Partial index: only index incomplete orders (much smaller)
CREATE INDEX idx_orders_pending ON orders(created_at)
  WHERE status = 'pending';
```

Use `EXPLAIN ANALYZE` constantly while designing:

```sql
EXPLAIN ANALYZE
SELECT * FROM orders
WHERE user_id = $1 AND status = 'pending'
ORDER BY created_at DESC
LIMIT 20;
```

Look for `Seq Scan` on large tables — that's where indexes are needed.

## Pagination: Offset vs Cursor

Offset pagination is intuitive but breaks at scale:

```sql
-- OFFSET becomes slower as the offset grows
-- PostgreSQL must scan and discard N rows before returning results
SELECT * FROM posts ORDER BY created_at DESC LIMIT 20 OFFSET 10000;
```

Cursor-based pagination is stable and performant regardless of page depth:

```sql
-- "Give me 20 posts older than this cursor"
SELECT * FROM posts
WHERE created_at < $cursor_timestamp
ORDER BY created_at DESC
LIMIT 20;
```

The cursor is the last `created_at` value from the previous page. If your sort column isn't unique, use a tie-breaker:

```sql
WHERE (created_at, id) < ($cursor_time, $cursor_id)
ORDER BY created_at DESC, id DESC
LIMIT 20;
```

## Handling Soft Deletes

Soft deletes (`deleted_at TIMESTAMPTZ`) preserve data history but pollute every query. Always create a partial index and consider using views:

```sql
ALTER TABLE users ADD COLUMN deleted_at TIMESTAMPTZ;

-- Partial index so "active" lookups stay fast
CREATE INDEX idx_users_active ON users(email) WHERE deleted_at IS NULL;

-- View so application queries don't need to remember the filter
CREATE VIEW active_users AS
  SELECT * FROM users WHERE deleted_at IS NULL;
```

## Schema Evolution: Migrations That Don't Break Production

Large tables require zero-downtime migration strategies:

```sql
-- ❌ Dangerous on large tables: locks the table
ALTER TABLE users ADD COLUMN phone TEXT NOT NULL DEFAULT '';

-- ✅ Safe: add nullable first, backfill in batches, then add constraint
ALTER TABLE users ADD COLUMN phone TEXT;

-- Backfill in application code or in batches:
UPDATE users SET phone = '' WHERE phone IS NULL AND id BETWEEN 1 AND 10000;
-- ... repeat in batches ...

-- Finally, add the constraint once backfill is complete
ALTER TABLE users ALTER COLUMN phone SET NOT NULL;
```

## Key Principles

1. **Normalize first, denormalize with evidence** — measure before adding redundancy
2. **Index foreign keys immediately** — forgetting this is the most common performance oversight
3. **Use cursor pagination for any list that grows** — offset is a trap
4. **Plan migrations for zero downtime** — always check the lock behavior of DDL statements
5. **`EXPLAIN ANALYZE` is your best friend** — run it on every query you care about

Good schema design is mostly about deferring complexity until you have data to justify it.
