# IMG: Default
FROM node:18.19.0-alpine AS base

# IMG: Dev Deps
FROM base as deps-dev

RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY package.json .
COPY package-lock.json .

RUN npm ci \
    && npm i -g clean-modules \
    && clean-modules -y
# RUN echo "###### DEV: $(du -sh node_modules)"

# IMG: Prod Deps
FROM base as deps-prod

RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY package.json .
COPY package-lock.json .

RUN npm ci --omit=dev \
    && npm i -g clean-modules \
    && clean-modules -y
# RUN echo "###### PROD: $(du -sh node_modules)"

# IMG: Builder
FROM base AS builder

ARG CMS_DOCKER_URL
ARG WEB_DOCKER_URL
ARG RECAPTCHA_SITE_KEY
ARG RECAPTCHA_SECRET_KEY
ARG STRIPE_SECRET_KEY
ARG ZEPTOMAIL_SECRET_KEY

ENV CMS_DOCKER_URL=$CMS_DOCKER_URL \
    WEB_DOCKER_URL=$WEB_DOCKER_URL \
    RECAPTCHA_SITE_KEY=$RECAPTCHA_SITE_KEY \
    RECAPTCHA_SECRET_KEY=$RECAPTCHA_SECRET_KEY \
    STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY \
    ZEPTOMAIL_SECRET_KEY=$ZEPTOMAIL_SECRET_KEY \
    NODE_OPTIONS=--max-old-space-size=512 \
    NEXT_TELEMETRY_DISABLED=1

WORKDIR /app
COPY . .

COPY --from=deps-dev /app/node_modules ./node_modules

RUN npm run build

# IMG: Runner
FROM base AS runner

ARG CMS_DOCKER_URL
ARG WEB_DOCKER_URL
ARG RECAPTCHA_SITE_KEY
ARG RECAPTCHA_SECRET_KEY
ARG STRIPE_SECRET_KEY
ARG ZEPTOMAIL_SECRET_KEY

ENV CMS_DOCKER_URL=$CMS_DOCKER_URL \
    WEB_DOCKER_URL=$WEB_DOCKER_URL \
    RECAPTCHA_SITE_KEY=$RECAPTCHA_SITE_KEY \
    RECAPTCHA_SECRET_KEY=$RECAPTCHA_SECRET_KEY \
    STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY \
    ZEPTOMAIL_SECRET_KEY=$ZEPTOMAIL_SECRET_KEY \
    NODE_OPTIONS=--max-old-space-size=512 \
    NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

COPY --from=deps-prod /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js

EXPOSE 3000

CMD ["npm", "start"]