## Why Container Security Matters

Containers share the host kernel, making security crucial. A compromised container can potentially affect the entire host.

### Minimal Base Images

Use distroless or Alpine-based images to minimize attack surface:

```dockerfile
FROM gcr.io/distroless/static-debian12
COPY --from=builder /app /app
ENTRYPOINT ["/app"]
```

### Multi-Stage Builds

Keep build tools out of production images:

```dockerfile
FROM golang:1.21 AS builder
WORKDIR /src
COPY . .
RUN CGO_ENABLED=0 go build -o /app

FROM gcr.io/distroless/static-debian12
COPY --from=builder /app /app
```

### Vulnerability Scanning

Integrate Trivy or Snyk into your CI pipeline to catch vulnerabilities early.

## Runtime Security

Run containers as non-root, use read-only filesystems, and drop unnecessary Linux capabilities.
