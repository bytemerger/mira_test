FROM node:20-alpine as development

WORKDIR /app

COPY package*.json ./
COPY package-lock.json ./

RUN npm ci --omit=optional

COPY . .

RUN npm run test

RUN npx prisma generate

RUN npm run build

# --- final stage ---- #

FROM node:20-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./
COPY package-lock.json ./

COPY --from=development /app/prisma /app/prisma

COPY --from=development /app/dist ./dist

COPY --from=development /app/node_modules /app/node_modules

EXPOSE $PORT

CMD ["node", "dist/src/main"]