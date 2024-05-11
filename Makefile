all:
	@echo ""
	@echo "ejecutar"
	@echo "ejecutar-sin-live-reload"
	@echo "actualizar-cache"
	@echo ""

GITHASH = $(shell git rev-parse --short HEAD)

ejecutar:
	httpwatcher -p 8080

ejecutar-sin-live-reload:
	python -m http.server 5558 --bind 0.0.0.0

actualizar-cache:
	echo "s/cache=(.)/cache=$(GITHASH)/g"
	sed -i '' 's/cache=.*"/cache=$(GITHASH)"/g' index.html
