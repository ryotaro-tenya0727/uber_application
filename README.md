#概要
dockerでrails ,react ,mysql ,nginx のコンテナを作成しました
すぐに使い始めることができます。

#使用方法

##1.git clone 

##2.docker-compose build

##3.docker-compose exec rails db:create

##4.docker-compose exec rails db:migrate

##5.docker-compose exec front yarn install
docker-compose build の時に、yarn install が実行されない時があるのでその時に実行

##6.docker-compose up

この後に、localhost でrails の画面。localhost:3000 でReact の画面になる。
