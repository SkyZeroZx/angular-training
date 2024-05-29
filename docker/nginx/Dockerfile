
# Stage 1: Compile app

FROM node:18-alpine AS BUILD_IMAGE

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat


# Install dependencies and tools
RUN apk --no-cache add curl bash

# Install Brotli
RUN apk update
RUN apk add --upgrade brotli


# Set the working directory inside the container
WORKDIR /usr/src/app

# Add the source code to app
COPY ./ /usr/src/app


# Install application dependencies
RUN npm ci

# Build the application
RUN npm run build:angular-training

# Convert dist to brotli
RUN cd /usr/src/app/dist && find . -type f -exec brotli {} \;

 
FROM alpine


RUN apk add brotli nginx nginx-mod-http-brotli

WORKDIR /usr/src/app

COPY ./docker/nginx/config/default.conf /etc/nginx/http.d/default.conf

# Copy the build output to replace the default nginx contents.
COPY --from=BUILD_IMAGE /usr/src/app/dist/apps/angular-training/browser /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]