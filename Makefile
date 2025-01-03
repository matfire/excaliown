install:
	cd ui && pnpm i
	go mod tidy

build:
	cd ui && pnpm build

