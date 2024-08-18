# travelers-album

クローン後の動作確認手順
1. 必要なパッケージをインストール  
```$ npm i```

2. サーバーを立ち上げる  
```$ npm run dev```

3.PostgresSQLを立ち上げる
docker compose up
docker compose up -d

4.DBを確認する(3.をしてから）
docker compose exec db psql -U travelers-album -d travelers_database

