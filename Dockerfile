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

ARG RECAPTCHA_SITE_KEY
ARG RECAPTCHA_SECRET_KEY
# ARG REVOLUT_MERCHANT_HOST
# ARG REVOLUT_MERCHANT_SECRET

ENV RECAPTCHA_SITE_KEY=$RECAPTCHA_SITE_KEY \
    RECAPTCHA_SECRET_KEY=$RECAPTCHA_SECRET_KEY \
    # REVOLUT_MERCHANT_HOST=$REVOLUT_MERCHANT_HOST \
    # REVOLUT_MERCHANT_SECRET=$REVOLUT_MERCHANT_SECRET \
    CMS_HOST=https://cms.3int.uk \
    WEB_HOST=http://web:3000 \
    NODE_OPTIONS=--max-old-space-size=512 \
    NEXT_TELEMETRY_DISABLED=1

WORKDIR /app
COPY . .

COPY --from=deps-dev /app/node_modules ./node_modules

RUN npm run build

# IMG: Runner
FROM base AS runner

ARG RECAPTCHA_SITE_KEY
ARG RECAPTCHA_SECRET_KEY
# ARG REVOLUT_MERCHANT_HOST
# ARG REVOLUT_MERCHANT_SECRET

ENV RECAPTCHA_SITE_KEY=$RECAPTCHA_SITE_KEY \
    RECAPTCHA_SECRET_KEY=$RECAPTCHA_SECRET_KEY \
    # REVOLUT_MERCHANT_HOST=$REVOLUT_MERCHANT_HOST \
    # REVOLUT_MERCHANT_SECRET=$REVOLUT_MERCHANT_SECRET \
    CMS_HOST=http://cms:8055 \
    WEB_HOST=http://web:3000 \
    NODE_ENV=production \
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