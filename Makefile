# Webサーバ起動
.PHONY: start
start:
	REACT_APP_ENVCODE=local yarn start

# Lintチェック
.PHONY: lint
lint:
	./node_modules/.bin/eslint src/ --ext .ts,.tsx,.js,.jsx

# 型チェック
tsc:
	./node_modules/typescript/bin/tsc --noemit

# JSONサーバ用のデータを生成
.PHONY: mock-data
mock-data:
	node ./mock/local/scripts/merge_data.js

# JSONサーバ起動
.PHONY: api
api: mock-data
	cd mock && \
	cd  local && \
	./../../node_modules/.bin/json-server -w data.json -r routes.json

# 開発環境ビルド
.PHONY: dev
dev:
	REACT_APP_ENVCODE=dev yarn react-scripts build

# ステージ環境ビルド
.PHONY: stg
stg:
	REACT_APP_ENVCODE=stg yarn react-scripts build

# 本番環境ビルド
.PHONY: prd
prd:
	REACT_APP_ENVCODE=prd yarn react-scripts build

# build後のローカル確認用 (./build)
.PHONY: serve
serve:
	./node_modules/.bin/serve -s build

# テスト実行
.PHONY: test
test:
	yarn react-scripts test

# カバレッジ確認
.PHONY: coverage
coverage:
	yarn test --coverage

# テスト結果のHTMLを作成
.PHONY: gen-test
gen-test:
	cd coverage && \
	cd lcov-report && \
	open index.html

# ライブラリのためのビルドをする
.PHONY: build
build:
	yarn run rollup -c

# ライブラリの publish をする
.PHONY: publish
publish:
	yarn publish --access public