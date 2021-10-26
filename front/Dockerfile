FROM node:16.12.0
RUN mkdir /front

COPY . /front
WORKDIR /front/reactapp
RUN yarn install
EXPOSE 3000
CMD ["yarn","start"]
