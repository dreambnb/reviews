FROM node:7.6-alpine

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN yarn install

# RUN npm run fakeData

# RUN npm run db

EXPOSE 8080

CMD [ "npm", "start" ]