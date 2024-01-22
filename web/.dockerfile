# IMG: Default
FROM node:18.19.0-alpine AS base

# IMG: Deps
from base as deps

RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY ./web/package.json .
COPY ./web/package-lock.json .

RUN npm ci

# IMG: Builder
FROM base AS builder

ARG NODE_OPTIONS
ARG MONGO_URL
ARG RECAPTCHA_SITE_KEY
ARG RECAPTCHA_SECRET_KEY

ENV NODE_OPTIONS $NODE_OPTIONS \
    MONGO_URL $MONGO_URL \
    RECAPTCHA_SITE_KEY $RECAPTCHA_SITE_KEY \
    RECAPTCHA_SECRET_KEY $RECAPTCHA_SECRET_KEY \
    NEXT_TELEMETRY_DISABLED 1

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY ./web/ .

RUN npx prisma generate &&\
    npm run build

# IMG: Runner
FROM base AS runner

ENV NODE_ENV production \
    NEXT_TELEMETRY_DISABLED 1

WORKDIR /app

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

RUN rm -rf ./cache

EXPOSE 3000

CMD ["node", "server.js"]