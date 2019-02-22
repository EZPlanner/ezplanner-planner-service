FROM node:11.9.0-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install --silent --progress=false --production

COPY . .

EXPOSE 5000
CMD ["npm", "start"]