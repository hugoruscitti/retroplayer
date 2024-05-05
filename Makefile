all:
	@echo ""
	@echo "ejecutar"
	@echo "ejecutar-sin-live-reload"
	@echo "actualizar-cache"
	@echo ""

GITHASH = $(shell git rev-parse --short HEAD)

ejecutar:
	httpwatcher

ejecutar-sin-live-reload:
	python -m http.server 5555 --bind 0.0.0.0

actualizar-cache:
	echo "s/cache=(.)/cache=$(GITHASH)/g"
	sed -i '' 's/cache=.*"/cache=$(GITHASH)"/g' index.html
