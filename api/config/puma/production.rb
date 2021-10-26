environment "production"

app_root = File.expand_path("../..", __FILE__)
bind "unix://#{app_root}/tmp/sockets/puma.sock"

# スレッド数とWorker数の指定
threads 5, 5
workers 0
preload_app!



pidfile ENV.fetch("PIDFILE") { "tmp/pids/server.pid" }
stdout_redirect "#{app_root}/log/puma.stdout.log", "#{app_root}/log/puma.stderr.log", true

plugin :tmp_restart

# puma_worker_killerの設定
before_fork do
  PumaWorkerKiller.config do |config|
    # 1. サーバのRAMを記述する(MB単位)
    config.ram           = 1024
    # 2. メモリ使用率の確認頻度(秒単位)
    config.frequency     = 5 * 60
    # 3. メモリ使用率(%) ※(例)90%
    # ※2の確認時にこの値を超えるとWorkerが再起動される
    config.percent_usage = 0.9 # 90%
    # 4. 2/3とは別にWorkerを再起動する周期
    config.rolling_restart_frequency = 24 * 3600
    # workerをkillしたことをログに残す
    config.reaper_status_logs = false
  end
  PumaWorkerKiller.start
  ActiveRecord::Base.connection_pool.disconnect! if defined?(ActiveRecord)
end
on_worker_boot do
  ActiveRecord::Base.establish_connection if defined?(ActiveRecord)
end
