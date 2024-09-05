FROM node:18

RUN apt-get update
RUN apt-get install -y openssl

WORKDIR /app/

COPY . /app/

RUN npm install --silent && mv node_modules ../
RUN npx prisma generate --schema ./prisma/schema.prisma

EXPOSE 3000

CMD [ "npm", "start" ]
