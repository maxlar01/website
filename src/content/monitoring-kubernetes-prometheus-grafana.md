## The Observability Stack

Modern Kubernetes monitoring requires metrics, logs, and traces. Prometheus and Grafana form the backbone of the metrics layer.

### Setting Up Prometheus

Use the kube-prometheus-stack Helm chart for a production-ready setup:

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install monitoring prometheus-community/kube-prometheus-stack
```

### Custom Metrics

Instrument your applications with Prometheus client libraries to expose custom business metrics.

### Alert Rules

Define meaningful alerts that are actionable, not noisy:

```yaml
groups:
  - name: app-alerts
    rules:
      - alert: HighErrorRate
        expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.1
        for: 5m
        labels:
          severity: critical
```

## Building Dashboards

Create Grafana dashboards that tell a story about your system's health, from infrastructure to application-level metrics.
