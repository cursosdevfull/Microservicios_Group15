FROM node:22-alpine AS stage_base
WORKDIR /app

FROM stage_base AS stage_deps
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=cache,target=/root/.npm \
    npm install --omit=dev

FROM stage_base AS stage_build
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=cache,target=/root/.npm \
    npm install
COPY . .
RUN npm run build

FROM stage_base AS stage_prod
COPY --from=stage_deps /app/node_modules ./node_modules
COPY --from=stage_build /app/dist ./dist
COPY --from=stage_build /app/package.json ./package.json

CMD ["npm", "run", "start"]


