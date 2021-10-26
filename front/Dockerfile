FROM node:16.12.0
RUN mkdir /front

COPY . /front
WORKDIR /front/reactapp
RUN yarn install
RUN yarn add react-router-dom
RUN yarn add axios
EXPOSE 3000
CMD ["yarn","start"]
