## ¿cómo funciona?

El código del proyecto está realizado con Vanilla JavaScript, así que lo
siguiente es una explicación de los componentes más importantes.

### Archivo principal: main.js

El único archivo JavaScript que carga el proyecto es "main.js", este archivo
funciona como archivo principal, así que es el punto de entrada del programa.
Este archivo carga todos los componentes y los registra. También es el archivo
encargado de cargar el estado inicial de los servicios.


### Depuración

Tener en cuenta que hay una variable global llamada "d" a la que se puede
acceder para ver el estado de los objetos principales durante el desarrollo.
Esta variable no se tiene que leer dentro del código, solamente está ahí para
que se puedan hacer pruebas durante el desarrollo en la consola del navegador.

### Bus

La comunicación de compontenes se hace a través de un objeto llamado Bus, que
está en el archivo "./js/bus.js".

Ahí vas a encontrar una lista con todos los eventos de la aplicación, no hay
otros manejadores de eventos en el software, todo pasa a través de este bus.

Ten en cuenta que los eventos se conectan al objeto "document", así que vas a
poder ver los eventos en acción abriendo el inspector del navegador y explorando
la sección de "Event Listeners":

![](./images/event-listeners.png)

Los eventos se conectan usando la forma "bus.conectar('nombre-del-evento'..."
así que también se puede buscar en el código.


Tener en cuenta que los nombres de eventos siempre comienzan con el prefijo
"evento-" para facilitar la búsqueda en el código.

evento-r
