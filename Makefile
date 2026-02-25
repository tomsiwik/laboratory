.PHONY: install compile setup clean help

all: setup

install:
	gh extension install github/gh-aw
	gh extension upgrade github/gh-aw

compile:
	gh aw compile
	gh aw compile --dir workflows

setup: install compile

clean:
	gh extension remove github/gh-aw || true

help:
	@echo "Available targets:"
	@echo "  install  - Install the gh-aw extension"
	@echo "  compile  - Compile active + template workflows"
	@echo "  setup    - Install extension and compile (default)"
	@echo "  clean    - Uninstall the extension"
