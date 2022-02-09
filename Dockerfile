FROM node:16

ENV MIRROR_BASE_URL=https://updates.jenkins.io

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY server.js .

EXPOSE 8080

CMD [ "node", "server.js" ]