.DEFAULT_GOAL := setup

install:
	gh extension install github/gh-aw --upgrade

compile:
	gh aw compile
	cd workflows && gh aw compile

setup: install compile

clean:
	gh extension remove github/gh-aw || true

help:
	@echo "make install  - Install gh-aw extension"
	@echo "make compile  - Compile all workflows"
	@echo "make setup    - Install + compile"
	@echo "make clean    - Remove gh-aw extension"
