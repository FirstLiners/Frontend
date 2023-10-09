
FROM node:20-slim AS base
ENV HOME=/app
ENV PNPM_HOME="/pnpm"

# Install pnpm
# RUN curl -fsSL https://get.pnpm.io/install.sh | sh -

# Set the PATH environment variable

ENV PATH="$PNPM_HOME:$PATH"
ENV DOTENV_PATH .env.local # not shure that is needed 
RUN corepack enable
WORKDIR /app
COPY . .
COPY .env.local /.env.local
RUN pnpm install --frozen-lockfile
EXPOSE 3000
CMD [ "pnpm", "dev" ]
