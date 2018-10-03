.PHONY: install build run
default: run ;

install:
	@docker run -v `pwd`:/usr/src/app --rm node:8.11-onbuild /bin/bash -c "npm install"

build:
	@docker run -v `pwd`:/usr/src/app --rm node:8.11-onbuild

run:
	@docker run -p 3000:3000 -v `pwd`:/usr/src/app --rm node:8.11-onbuild npm run-script run
