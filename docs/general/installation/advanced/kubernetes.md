---
uid: installation-advanced-kubernetes
title: Kubernetes Deployment
description: Deploy Jellyfin on Kubernetes using Helm
sidebar_position: 7
---

# Kubernetes Deployment

This guide covers deploying Jellyfin on Kubernetes using the [official Helm chart](https://github.com/jellyfin/jellyfin-helm/tree/master/charts/jellyfin).

## Prerequisites

- Kubernetes cluster (v1.19+)
- Helm 3.x installed
- `kubectl` configured for your cluster
- Sufficient storage for media and configuration
- Ingress controller (e.g. traefik) for external access (required for this tutorial, see [official docs](https://github.com/jellyfin/jellyfin-helm/tree/master/charts/jellyfin) for alternatives)

## Installation

### 1. Add Helm Repository

```bash
helm repo add jellyfin https://jellyfin.github.io/jellyfin-helm
helm repo update
```

### 2. Custom Installation

For complete installation instructions and configuration options, see the [official Jellyfin Helm chart repository](https://github.com/jellyfin/jellyfin-helm/tree/master/charts/jellyfin).

Create a `values.yaml` file for customization:

```yaml
# values.yaml
replicaCount: 1

image:
  pullPolicy: IfNotPresent

persistence:
  config:
    enabled: true
    size: 5Gi
    storageClass: ''
  media:
    enabled: true
    size: 100Gi
    storageClass: ''

ingress:
  enabled: true
  className: 'traefik'
  hosts:
    - host: jellyfin.example.com
      paths:
        - path: /
          pathType: Prefix

resources:
  limits:
    cpu: 2000m
    memory: 4Gi
  requests:
    cpu: 500m
    memory: 1Gi

nodeSelector: {}
tolerations: []
affinity: {}
```

Install with custom values:

```bash
helm install jellyfin jellyfin/jellyfin -f values.yaml
```

## Configuration Options

### Service Types

This guide covers ClusterIP service type (default) for internal access only, with external access via ingress controller. Alternatives include LoadBalancer and NodePort services.

### Persistence

#### Using Existing Persistent Volume Claims

```yaml
persistence:
  config:
    enabled: true
    existingClaim: 'jellyfin-config-pvc'
  media:
    enabled: true
    existingClaim: 'jellyfin-media-pvc'
```

#### Creating New PVCs via Helm

```yaml
persistence:
  config:
    enabled: true
    size: 5Gi
    storageClass: 'fast-ssd'
  media:
    enabled: true
    size: 100Gi
    storageClass: 'slow-hdd'
```

### Ingress

#### Basic Ingress Configuration

```yaml
ingress:
  enabled: true
  className: 'traefik'
  hosts:
    - host: jellyfin.example.com
      paths:
        - path: /
          pathType: Prefix
```

#### Advanced Ingress with TLS

```yaml
ingress:
  enabled: true
  className: 'traefik'
  annotations:
    traefik.ingress.kubernetes.io/router.entrypoints: websecure
    traefik.ingress.kubernetes.io/router.middlewares: default-jellyfin-buffering@kubernetescrd
  hosts:
    - host: jellyfin.example.com
      paths:
        - path: /
          pathType: Prefix
  tls:
    - secretName: jellyfin-tls
      hosts:
        - jellyfin.example.com

apiVersion: traefik.io/v1alpha1
kind: Middleware
metadata:
  name: jellyfin-buffering
  namespace: default
spec:
  buffering:
    maxRequestBodyBytes: 0
```

## Accessing Jellyfin

### Port Forwarding (Development)

```bash
kubectl port-forward svc/jellyfin 8096:8096
```

Access at: `http://localhost:8096`

### External Access

Once ingress is configured, access Jellyfin at your configured domain (e.g., `https://jellyfin.example.com`).

## Monitoring

### Health Checks

The chart includes readiness and liveness probes:

```yaml
livenessProbe:
  httpGet:
    path: /health
    port: http
  initialDelaySeconds: 30
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /health
    port: http
  initialDelaySeconds: 5
  periodSeconds: 5
```

### Metrics

Enable Prometheus metrics if available:

```yaml
metrics:
  enabled: true
  serviceMonitor:
    enabled: true
```

## Troubleshooting

### Common Issues

1. **Permission Denied**: Ensure proper security context for media access
2. **Storage Issues**: Verify persistent volume claims are bound
3. **Network Access**: Check service type and ingress configuration

### Debug Commands

```bash
# Check pod status
kubectl get pods -l app.kubernetes.io/name=jellyfin

# View logs
kubectl logs -f deployment/jellyfin

# Check service
kubectl get svc jellyfin

# Describe pod for events
kubectl describe pod -l app.kubernetes.io/name=jellyfin
```

## Upgrading

```bash
# Update repository
helm repo update

# Upgrade installation
helm upgrade jellyfin jellyfin/jellyfin

# Check upgrade status
helm status jellyfin
```

## Uninstalling

```bash
# Remove Helm release
helm uninstall jellyfin

# Clean up persistent volumes (if needed)
kubectl delete pvc -l app.kubernetes.io/name=jellyfin
```

## Advanced Configuration

### Hardware Acceleration

For GPU acceleration, add device access and security context:

```yaml
securityContext:
  privileged: true

resources:
  limits:
    gpu.intel.com/i915: 1
    # or nvidia.com/gpu: 1

extraVolumes:
  - name: dri
    hostPath:
      path: /dev/dri

extraVolumeMounts:
  - name: dri
    mountPath: /dev/dri
```

### Multiple Media Sources

Mount multiple media sources using additional volumes:

```yaml
volumes:
  - name: movies
    persistentVolumeClaim:
      claimName: movies-pvc
  - name: tv
    persistentVolumeClaim:
      claimName: tv-pvc

volumeMounts:
  - name: movies
    mountPath: /movies
  - name: tv
    mountPath: /tv
```

### Custom Environment Variables

```yaml
extraEnvVars:
  - name: JELLYFIN_PublishedServerUrl
    value: 'https://jellyfin.example.com'
  - name: JELLYFIN_CACHE_DIR
    value: '/cache'
```

For more configuration options, see the [Jellyfin Helm chart documentation](https://github.com/jellyfin/jellyfin-helm/tree/master/charts/jellyfin).
