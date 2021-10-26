# 概要
dockerでrails ,react ,mysql ,nginx のコンテナを作成しました
すぐに使い始めることができます。
railsはapi モードです。
nginxの設定が一部不要です（404errorの部分など)

# 使用方法

## 1.git clone 

## 2.docker-compose build

## 3.docker-compose up -d

## 4.docker-compose rum rails db:create

## 5.docker-compose run rails db:migrate

## 6.docker-compose run front yarn install
docker-compose build の時に、yarn install が実行されない時があるのでその時に実行

## 7.docker-compose up

この後に、localhost でrails の画面。localhost:3000 でReact の画面になる。
