
FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV DOTENV_PATH .env.local # not shure that is needed 
RUN corepack enable
WORKDIR /app
COPY . .
COPY .env.local /.env.local
RUN pnpm install --frozen-lockfile
EXPOSE 3000
CMD [ "pnpm", "start" ]

# FROM base AS prod-deps
# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# FROM base AS build
# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
# RUN pnpm run build

# FROM base
# COPY --from=prod-deps /app/node_modules /app/node_modules
# COPY --from=build /app/.next /app/.next


# EXPOSE 3000
# CMD [ "pnpm", "start" ]

