## Next.JS Commands

Standalone Build Configuration in next.config.ts

```bash
const nextConfig: NextConfig = {
  output: "standalone",
};
```

## Docker Commands

Initialize Docker via Terminal

```bash
docker init
```

Dockerfile changes

```bash
FROM node:18-alpine AS base

FROM base AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


FROM base AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
```

compose.yaml File Changes

```bash
services:
  server: 
    build:
      context: .
      dockerfile: Dockerfile
      platforms: 
        - linux/amd64
        - linux/arm64
    image:
        metrackv1:latest

    ports:
      - 80:80
    develop:
      watch:
        - path: ./package.json
          action: rebuild
        - path: ./next.config.js
          action: rebuild
        - path: ./package-lock.json
          action: rebuild
        - path: .
          target: /app
          action: sync
volumes:
  tasked:
```

Docker Build via Compose.yaml

```bash
docker compose -f compose.yaml build --no-cache
```

Docker check for Images

```bash
docker images
```

Docker Login

```bash
docker login
```

Docker Tag

```bash
docker tag metrackv1 garudaone/metrackv1:latest
```

Docker Push

```bash
docker push garudaone/metrackv1
```

Docker pull

```bash
docker pull garudaone/metrackv1
```

Docker Run

```bash
docker run -d -p 80:80 garudaone/metrackv1
```

Docker check Containers

```bash
docker ps # For Running Containers
docker ps -a # for All Containers
```

Docker Delete Commands

```bash
docker rmi metrackv1 # For Images
docker rm metractv1(ID of Container) # For Containers
docker stop metractv1(ID for Container) # Stopping the Container
```

Git token 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

Argo cd pass R8O4X6AaT4jlhJoB