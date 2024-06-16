FROM node:18.12.1

COPY ["../package.json", "/usr/src/"]

WORKDIR /usr/src

RUN yarn install

COPY ["../", "/usr/src/"]

EXPOSE 4000

RUN addgroup --gid 11500 nodejs && \
    adduser --uid 11400 --gid 11500 --disabled-password --gecos '' nodejs && \
    mkdir -p /app && \
    chown -R nodejs:nodejs /app

USER nodejs

CMD ["yarn", "run", "start"]