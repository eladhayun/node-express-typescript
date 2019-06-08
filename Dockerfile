FROM ubuntu
RUN apt-get update
RUN apt-get install -y nodejs npm
COPY ./ /app/
WORKDIR /app
RUN npm install --silent
RUN npm run build
WORKDIR /app/dist
CMD ["node", "."]