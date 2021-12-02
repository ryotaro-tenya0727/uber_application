# 概要
dockerでrails ,react ,mysql ,nginx のコンテナを作成しました
すぐに使い始めることができます。
railsはapi モードです。
nginxの設定が一部不要です（404errorの部分など)

# 使用方法

## git clone 

## docker-compose build

## docker-compose run front yarn install
docker-compose build の時に、yarn install が実行されない時があるのでその時に実行

## docker-compose up -d

## docker-compose run api rails db:create

## docker-compose run api rails db:migrate



この後に、localhost でrails の画面。localhost:3000 でReact の画面になる。
