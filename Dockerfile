FROM node:16.20.0-bullseye-slim AS ng-build
WORKDIR /usr/src/app
ARG ngBuildType="dev-build"
ENV NODE_OPTIONS="--max-old-space-size=6144"

COPY ng/ ./ng/
RUN cd ng && npm install --legacy-peer-deps && npm run ${ngBuildType}

FROM node:16.20.0-bullseye-slim AS node
WORKDIR /usr/src/app

RUN ln -sf /usr/share/zoneinfo/Asia/Kolkata /etc/localtime
RUN apt-get update
RUN apt-get install -y libfontconfig fontconfig libfreetype6 libfontconfig1 libglib2.0-0 bzip2 curl
RUN npm install -g phantomjs-prebuilt
RUN apt-get autoremove -y && apt-get clean && rm -rf /var/lib/apt/lists/*
COPY node/ ./node/
COPY --from=ng-build /usr/src/app/ng/dist/ ./node/public
RUN cd node && npm install && npm ci --only=production --omit=dev && npm cache clean --force
COPY node/app.js ./node/

EXPOSE 3000
RUN chmod a+x /usr/src/app/node/
RUN chmod a+x /usr/src/app/node/startup.sh
ENTRYPOINT ["/usr/src/app/node/startup.sh"]
