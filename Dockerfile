FROM node:18
WORKDIR /app/
COPY . /app/
RUN npm install
RUN chmod +x docker-entrypoint.sh
EXPOSE 3000
CMD [ "./docker-entrypoint.sh" ]
