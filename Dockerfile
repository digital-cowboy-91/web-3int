# IMG: Default
FROM node:18.19.0-alpine AS base

# IMG: Deps
FROM base as deps

RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY package.json .
COPY package-lock.json .

RUN npm ci

# IMG: Builder
FROM base AS builder

ARG MONGO_URL
ARG RECAPTCHA_SITE_KEY
ARG RECAPTCHA_SECRET_KEY

ENV MONGO_URL=$MONGO_URL \
    RECAPTCHA_SITE_KEY=$RECAPTCHA_SITE_KEY \
    RECAPTCHA_SECRET_KEY=$RECAPTCHA_SECRET_KEY \
    CMS_HOST=http://cms:8055 \
    WEB_HOST=http://web:3000 \
    NODE_ENV=production \
    NODE_OPTIONS=--max-old-space-size=512 \
    NEXT_TELEMETRY_DISABLED=1

WORKDIR /app
COPY . .

RUN rm -rf .next .vscode .git* Dockerfile* dc.* README.md node_modules

COPY --from=deps /app/node_modules ./node_modules

RUN npx prisma generate &&\
    npm run build

# IMG: Runner
FROM base AS runner

ARG MONGO_URL
ARG RECAPTCHA_SITE_KEY
ARG RECAPTCHA_SECRET_KEY

ENV MONGO_URL=$MONGO_URL \
    RECAPTCHA_SITE_KEY=$RECAPTCHA_SITE_KEY \
    RECAPTCHA_SECRET_KEY=$RECAPTCHA_SECRET_KEY \
    CMS_HOST=http://cms:8055 \
    WEB_HOST=http://web:3000 \
    NODE_ENV=production \
    NODE_OPTIONS=--max-old-space-size=512 \
    NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js

EXPOSE 3000

CMD ["npm", "start"]