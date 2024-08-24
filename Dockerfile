# ベースイメージとしてNode.js18を使用する
FROM node:20-alpine

# アプリケーションディレクトリを作成
WORKDIR /usr/src/app

# パッケージの依存関係をインストール
COPY package*.json ./
RUN npm install

# アプリケーションのソースをコピー
COPY . .

# Typescriptをコンパイル
RUN npx tsc

# アプリケーションの起動
CMD ["node", "dist/index.js"]