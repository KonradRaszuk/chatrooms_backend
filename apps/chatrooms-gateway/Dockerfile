FROM node:22.14.0-slim AS development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
RUN npm ci

COPY --chown=node:node . .

USER node

EXPOSE 9229 9230

### BUILD
FROM node:22.14.0-slim AS build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .

RUN npm run build -- chatrooms-gateway

ENV NODE_ENV production
RUN npm ci --omit=dev && npm cache clean --force

USER node

### PRODUCTION
FROM node:22.14.0-slim AS production

WORKDIR /usr/src/app

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

CMD ["node", "--dns-result-order=ipv4first", "dist/apps/chatrooms-gateway/main.js"]