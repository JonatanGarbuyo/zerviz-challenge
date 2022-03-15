
FROM node:16 AS development

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm i -g @nestjs/cli
RUN npm install glob rimraf

RUN npm install --only=development

COPY . .

RUN npm run build


FROM node:16 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm i -g @nestjs/cli

# RUN npm install --only=production
RUN npm ci --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]