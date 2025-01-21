N=[0m
G=[01;32m
Y=[01;33m
B=[01;34m

all:
	@echo ""
	@echo "${Y}Comandos:${N}"
	@echo ""
	@echo "  ${G}ejecutar${N}"
	@echo "  ${G}ejecutar-sin-live-reload${N}"
	@echo "  ${G}actualizar-cache${N}"
	@echo "  ${G}electron${N}"
	@echo "  ${G}binarios${N}"
	@echo "  ${G}lint${N}"
	@echo ""
	@echo " Nota: cada push hace un deploy acá: https://hugoruscitti.github.io/retroplayer/"
	@echo ""

GITHASH = $(shell git rev-parse --short HEAD)


ejecutar:
	httpwatcher -p 8080

ejecutar-sin-live-reload:
	python -m http.server 5558 --bind 0.0.0.0

actualizar-cache:
	echo "s/cache=(.)/cache=$(GITHASH)/g"
	sed -i '' 's/cache=.*"/cache=$(GITHASH)"/g' index.html

lint:
	LC_ALL=en_US.UTF-8 find ./js -name "*.js" -exec quick-lint-js "{}" \;

electron:
	./node_modules/.bin/electron .

binarios:
	@echo "Para generar binarios primero se tiene que crear un nuevo tag"
	@echo "siguiendo estos pasos:"
	@echo " "
	@echo " cat package.json | grep version"
	@echo " "
	@echo " (incrementar esta versión)"
	@echo " "
	@echo " ejecutar un comando como:"
	@echo " "
	@echo " git tag 0.0.3"
	@echo " git push --tags"
	@echo " "
	@echo " make crear-binarios"
	@echo " "
	@echo " y por último subirlos al sitio que indica el comando anterior."
	@echo " "

crear-binarios:
	@echo "${Y}Este comando demorará unos 10 o 15 minutos ...${N}"
	@sleep 2
	@echo "Borrando binarios anteriores..."
	rm -rf dist/retroplayer*
	@sleep 1
	CSC_IDENTITY_AUTO_DISCOVERY=false time ./node_modules/.bin/electron-builder -mwl
	@echo "${Y}los archivos generados están en el directorio 'dist'${N}"
	ls dist/retroplayer* | grep -v block
	@echo "${Y}el siguiente paso es subirlos como release aquí https://github.com/hugoruscitti/retroplayer/tags${N}"
