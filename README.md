
Subir exploraciones
-------------------

1. Copiar el mp3 al directorio `_scripts/audio_original/`
2. Fijate que el nombre del archivo mp3 esté todo en minúsculas, sin acentos, ni símbolos, ni espacios
   (podés usar guíones). Por ejemplo si el archivo se llama `Rebeldía&Sueños.mp3`, lo renombrás como
   `rebeldia-y-suenos.mp3`.
3. Abrí una terminal y andá al directorio raíz del proyecto (donde está este archivo que estás leyendo).
4. Ejecutá `make add-exploration`. Este script hace varias cosas, en un punto te pide que entres un título
   y después una descripción. Cuando pongas las dos cosas, te abre el browser (vas a tener que esperar unos)
   segundos y refrescar). Fijate el texto, dale play al audio, si todo está bien, volvés a la consola y apretás
   CTRL-C. Sino podes editar el texto en el archivo _data/resources.yml (usá sublime) y refrescar la página.
5. Una vez que todo esté bien, ejecutás desde la terminal: `make publish-exploration`.
