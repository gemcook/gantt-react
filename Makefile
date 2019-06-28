# Webサーバ起動
.PHONY: start
start:
	REACT_APP_ENVCODE=local \
	yarn start

# Lintチェック
.PHONY: lint
lint:
	yarn run eslint --ext .ts,.tsx,.json,.js,.jsx src/

# 各環境ビルド
.PHONY: build
build:
	REACT_APP_ENVCODE=$(envcode) yarn build