FROM cgr.dev/chainguard/node:latest-dev AS deps

WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

FROM cgr.dev/chainguard/node:latest

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
EXPOSE 5001

CMD ["server.js"]
