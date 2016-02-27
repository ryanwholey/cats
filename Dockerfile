FROM node
RUN mkdir /code
WORKDIR /code
COPY . /code
RUN apt-get update && \
  rm -rf /var/lib/apt/lists/*
RUN npm install --production
ENV host="192.241.234.14"
EXPOSE 8000
ENTRYPOINT ["node"]
CMD ["server/server.js"]
