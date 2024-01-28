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
FROM base AS runner

ARG MONGO_URL
ARG RECAPTCHA_SITE_KEY
ARG RECAPTCHA_SECRET_KEY

ENV MONGO_URL=$MONGO_URL \
    RECAPTCHA_SITE_KEY=$RECAPTCHA_SITE_KEY \
    RECAPTCHA_SECRET_KEY=$RECAPTCHA_SECRET_KEY \
    LOCAL_HOST=http://0.0.0.0:3000 \
    NODE_OPTIONS=--max-old-space-size=512 \
    NEXT_TELEMETRY_DISABLED=1

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN rm -rf .next .vscode .git* Dockerfile* dc.* README.md &&\
    npx prisma generate &&\
    npm run build

EXPOSE 3000

CMD ["npm", "start"]