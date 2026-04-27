# Building a Type-Safe REST API with Node.js and TypeScript

If you've ever shipped a Node.js API and later found yourself wondering "what shape does this endpoint actually return?", you already understand why type safety matters at runtime, not just at compile time. This post walks through building an Express API with genuine end-to-end type safety using TypeScript, Zod for runtime validation, and Prisma as a type-safe ORM.

## Why End-to-End Type Safety?

TypeScript gives you static type checking, but it can't protect you from:

- A client sending unexpected JSON
- A database returning `null` where you didn't expect it
- A third-party API changing its response shape

The goal is to validate data at every trust boundary so that once data is inside your system, you can rely on its shape completely.

## Project Setup

```bash
mkdir ts-api && cd ts-api
npm init -y
npm install express zod @prisma/client
npm install -D typescript ts-node @types/express prisma
npx tsc --init
npx prisma init
```

Configure `tsconfig.json` with strict mode:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "strict": true,
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```

## Defining Your Schema with Zod

Zod is the bridge between runtime validation and TypeScript types. You define a schema once and get both the validator and the type for free.

```typescript
// src/schemas/user.ts
import { z } from "zod";

export const CreateUserSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  role: z.enum(["user", "admin"]).default("user"),
});

// Infer the TypeScript type from the schema
export type CreateUserInput = z.infer<typeof CreateUserSchema>;
```

## Validation Middleware

Rather than validating in every route handler, create reusable middleware:

```typescript
// src/middleware/validate.ts
import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export function validate<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: "Validation failed",
        issues: result.error.flatten().fieldErrors,
      });
    }

    // Attach parsed (and typed) data to the request
    req.body = result.data;
    next();
  };
}
```

## Prisma for Type-Safe Database Access

Define your database schema in `prisma/schema.prisma`:

```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  role      Role     @default(user)
  createdAt DateTime @default(now())
}

enum Role {
  user
  admin
}
```

Run `npx prisma migrate dev --name init` and Prisma generates a fully-typed client. Every query returns types that exactly match your schema — no manual type definitions needed.

## Wiring It Together

```typescript
// src/routes/users.ts
import { Router } from "express";
import { prisma } from "../lib/prisma";
import { validate } from "../middleware/validate";
import { CreateUserSchema, CreateUserInput } from "../schemas/user";

const router = Router();

router.post("/users", validate(CreateUserSchema), async (req, res) => {
  // req.body is typed as CreateUserInput here
  const input: CreateUserInput = req.body;

  const user = await prisma.user.create({
    data: input,
  });

  res.status(201).json(user);
});

router.get("/users/:id", async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: Number(req.params.id) },
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});

export default router;
```

## Error Handling

Centralise error handling to keep route handlers clean:

```typescript
// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Handle Prisma unique constraint violations
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return res.status(409).json({ error: "Resource already exists" });
    }
  }

  console.error(err);
  res.status(500).json({ error: "Internal server error" });
}
```

## Key Takeaways

- **Validate at the boundary** — use Zod on every request body, not just the ones you're "unsure" about.
- **Let Prisma own your DB types** — don't write manual interfaces that duplicate your schema.
- **Infer, don't duplicate** — use `z.infer<>` so your validation schema and TypeScript type are always in sync.
- **Centralise errors** — a single error handler keeps route logic focused on the happy path.

This pattern scales cleanly. As your API grows, each new resource follows the same shape: schema → middleware → handler, and you always know exactly what data looks like at each step.
