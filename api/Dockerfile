FROM ruby:2.7.3-buster
RUN apt-get update

RUN set -x && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
  echo 'deb http://dl.yarnpkg.com/debian/ stable main' > /etc/apt/sources.list.d/yarn.list

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - && \
  apt-get install nodejs

RUN apt-get install -y \
  build-essential \
  libpq-dev \
  nodejs \
  yarn
RUN mkdir /api
WORKDIR /api
COPY Gemfile  /api/
COPY Gemfile.lock /api/

RUN bundle install


COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]


