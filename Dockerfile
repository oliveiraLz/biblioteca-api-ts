FROM node:18-alpine as production

ARG NODE_ENV
ARG PORT

ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/app

ENV TZ=America/Manaus
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY package*.json ./
COPY yarn.lock ./

# RUN yarn add @nestjs/cli -g

RUN yarn --prod --silent

COPY . .

RUN yarn build

EXPOSE ${PORT}

CMD ["node", "dist/main"]