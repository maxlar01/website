# System Design: From Monolith to Microservices

The monolith-to-microservices narrative is one of the most over-applied patterns in software engineering. Teams decompose perfectly functional monoliths because it feels like the "mature" thing to do — and end up with a distributed system that's harder to develop, test, deploy, and debug. This post is about making that decision well.

## Start With the Monolith

A well-structured monolith is often the right architecture for most products, for most of their lifetime. It's:

- Easier to develop locally — one process, one database connection, no network calls between services
- Easier to test — integration tests don't require spinning up N services
- Easier to deploy — one artifact, one rollback unit
- Easier to trace and debug — a single call stack, one place to add logging

The key word is "well-structured." A big ball of mud monolith and a modular monolith are not the same thing.

## The Modular Monolith

Before reaching for microservices, design your monolith with clear internal module boundaries:

```
src/
├── modules/
│   ├── users/
│   │   ├── users.service.ts
│   │   ├── users.repository.ts
│   │   └── users.types.ts
│   ├── orders/
│   │   ├── orders.service.ts
│   │   ├── orders.repository.ts
│   │   └── orders.types.ts
│   └── notifications/
│       ├── notifications.service.ts
│       └── notifications.types.ts
└── shared/
    ├── database.ts
    └── logger.ts
```

Enforce the rule: modules communicate only through their public interface (the service layer), never by importing from another module's repository or internal files. This is enforced by convention, linting rules (e.g., `eslint-plugin-import`), or a monorepo boundary tool.

A modular monolith can be extracted into services later if needed, because the service boundaries are already defined in code.

## When to Actually Split Services

Decompose when you have a specific, measurable problem that microservices solve and a monolith cannot:

### 1. Independent Scaling Requirements

A video transcoding job and a user-facing API have radically different compute profiles. Running them in the same process means you can't scale them independently.

```
Monolith: scale the whole thing to handle transcoding load
Microservices: scale transcoding workers independently, API stays lean
```

### 2. Independent Deployment Requirements

If two teams need to deploy independently without coordinating, a shared deployment unit is a bottleneck. But consider: do they actually need to deploy independently, or does the process just need to be faster?

### 3. Fault Isolation

A bug in a payment service crashing the notification service is unacceptable. Process isolation contains failures.

### 4. Technology Heterogeneity

A machine learning model written in Python needs to coexist with a Node.js API. They're naturally separate processes.

## Identifying Service Boundaries

The core principle is high cohesion within a service, loose coupling between services. Domain-Driven Design's concept of **Bounded Contexts** is the most practical framework:

- A bounded context is a region where a specific domain model applies
- `User` in the auth context and `User` in the analytics context can be different shapes — that's fine
- Services communicate across context boundaries only through well-defined APIs or events

**Warning signs of a bad service split:**
- Services that always deploy together (too coupled)
- Services that share a database (not actually separate)
- Services that call each other synchronously in a chain of 4+ hops (distributed monolith)

## Handling Data in a Distributed System

The hardest part of microservices is data. Each service should own its data and not share a database with other services.

### Sync Communication (HTTP/gRPC)

Use for queries that require an immediate response:

```typescript
// Order service needs user data at checkout
const user = await fetch(`${USER_SERVICE_URL}/users/${userId}`).then(r => r.json());
```

Design for failure: add timeouts, retries with exponential backoff, and circuit breakers.

### Async Communication (Events)

Use for operations where eventual consistency is acceptable:

```typescript
// Order service publishes an event; notification service reacts
await eventBus.publish("order.created", {
  orderId: order.id,
  userId: order.userId,
  total: order.total,
});
```

The notification service subscribes to `order.created` and sends the confirmation email independently. An order can complete even if the notification service is down.

### The Saga Pattern for Distributed Transactions

When a business transaction spans multiple services, use sagas instead of distributed transactions (which are fragile):

```
Choreography-based saga for "place order":
1. Order Service: creates order → publishes OrderCreated
2. Inventory Service: reserves stock → publishes StockReserved (or StockFailed)
3. Payment Service: charges card → publishes PaymentCaptured (or PaymentFailed)
4. On failure: each service publishes a compensating event to undo its step
```

## The Checklist Before You Split

Before extracting a service, verify:

- [ ] The boundary is clear and stable — it won't need to be redrawn in six months
- [ ] The service has an independent deployment lifecycle
- [ ] Your team can operate a distributed system (observability, distributed tracing, on-call)
- [ ] You have measurable pain in the monolith that microservices solve
- [ ] You've tried fixing the monolith first (better module structure, better deployment pipeline)

Microservices are an organizational pattern as much as a technical one. Conway's Law says your architecture will mirror your team structure. If your team is small and co-located, a modular monolith is almost always the right call.

## Summary

| Concern | Monolith | Microservices |
|---|---|---|
| Dev experience | Simple, one process | Complex, many processes |
| Testing | Straightforward | Requires contract tests, test environments |
| Deployment | Single artifact | Independent per service |
| Scaling | Coarse-grained | Fine-grained |
| Fault isolation | Low | High |
| Operational complexity | Low | High |

Start with a modular monolith. Extract services when the cost of not doing so is higher than the cost of the distributed system you're creating.
