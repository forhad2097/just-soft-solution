# syntax=docker/dockerfile:1.7

FROM node:22-alpine AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app
COPY package.json package-lock.json ./
# Prisma's postinstall runs `prisma generate` — needs the schema present
COPY prisma ./prisma
RUN npm ci --no-audit --no-fund

FROM node:22-alpine AS builder
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

# next.config has `output: standalone` → tiny self-contained server
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Prisma: schema, migrations, generated client + engine binaries
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma ./node_modules/@prisma

# Entrypoint: run migrations, then start the server
COPY --chown=nextjs:nodejs <<'EOF' /app/entrypoint.sh
#!/bin/sh
set -e
echo "Running database migrations..."
npx --prefix /app prisma migrate deploy --schema /app/prisma/schema.prisma || true
echo "Starting Next.js server..."
exec node server.js
EOF
RUN chmod +x /app/entrypoint.sh

USER nextjs
EXPOSE 3000

CMD ["/app/entrypoint.sh"]
