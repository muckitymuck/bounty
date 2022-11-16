FROM node:16.16.0
ENV NODE_ENV=/config/.env
WORKDIR /bounty

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install 

COPY . .

CMD [ "npm", "start" ]

EXPOSE 80