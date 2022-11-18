#build step
FROM node:16-alpine as build

WORKDIR /backend_build
COPY . ./

# install all project dependencies and build
RUN npm install && npm run build

# runtime step
FROM node:16-alpine as run

WORKDIR /backend
# copy dependencies files
COPY --from=build ["/backend_build/package.json","/backend_build/package-lock.json", "./"]
# copy compiled files
COPY --from=build ["/backend_build/build","./build"]

# install runtime dependencies
RUN npm install --omit dev --ignore-scripts
EXPOSE 5000/tcp

# start express server
ENTRYPOINT [ "node","./build/index.js" ]