# --- build ---------------------------------------------------------------------------------------------
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# The public address is baked into canonical links, hreflang and the sitemap at build time.
ARG NEXT_PUBLIC_SITE_URL=https://norvigate.com
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
RUN npm run build

# --- owner tools (orders CLI, readiness check). Not started by default. -----------------------------------
FROM build AS tools
ENV NODE_ENV=production NORVIGATE_DATA_DIR=/data
ENTRYPOINT ["npm", "run", "--silent"]

# --- run -----------------------------------------------------------------------------------------------
FROM node:22-alpine AS run
WORKDIR /app
ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0 NORVIGATE_DATA_DIR=/data NEXT_TELEMETRY_DISABLED=1
RUN addgroup -S app && adduser -S app -G app && mkdir /data && chown app:app /data
COPY --from=build --chown=app:app /app/.next/standalone ./
COPY --from=build --chown=app:app /app/.next/static ./.next/static
COPY --from=build --chown=app:app /app/public ./public
USER app
VOLUME ["/data"]
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s CMD wget -qO- http://127.0.0.1:3000/api/health || exit 1
CMD ["node", "server.js"]
