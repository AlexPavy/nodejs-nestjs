# Use the official lightweight Node.js 12 image.
# https://hub.docker.com/_/node
FROM node:12-slim

# Create and change to the app directory.
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . ./

CMD [ "npm", "run", "start" ]
