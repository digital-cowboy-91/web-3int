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

ARG WEB_NODE_OPTIONS
ARG WEB_MONGO_URL
ARG WEB_RECAPTCHA_SITE_KEY
ARG WEB_RECAPTCHA_SECRET_KEY

ENV LOCAL_HOST http://web \
    NODE_OPTIONS $WEB_NODE_OPTIONS \
    MONGO_URL $WEB_MONGO_URL \
    RECAPTCHA_SITE_KEY $WEB_RECAPTCHA_SITE_KEY \
    RECAPTCHA_SECRET_KEY $WEB_RECAPTCHA_SECRET_KEY \
    NEXT_TELEMETRY_DISABLED 1

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY ./ .

RUN npx prisma generate &&\
    npm run build

EXPOSE 3000

CMD ["npm", "start"]