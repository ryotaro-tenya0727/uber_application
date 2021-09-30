FROM node:16.1.0-stretch-slim
RUN mkdir /front
WORKDIR /front/reactapp
COPY . /front
RUN yarn install
EXPOSE 3000
CMD ["yarn","start"]
