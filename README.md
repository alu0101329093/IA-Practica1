# IA-Practica1
## Descargar repositorio
Debido a que este projecto usa un programa en javascript y despues crea un sub-processo que arranca un programa de C++ hemos decidido usar un repositorio distinto para el C++ y vincularlo a este como submodulo. Es por esto que para clonarlo abra que añadir la opción --recurse-submodules. El comando quedaría tal que así.
  git clone --recurse-submodules https://github.com/alu0101329093/IA-Practica1.git

## Requisitos para usar el programa
- Tener instalado Node.Js para el sistema operativo que este usando.
  Puedes descargarlo aqui: https://nodejs.org/es/download/
  La mejor opción serñia la versión LTS de su sistema operativo.
- Un compilador de c++
  Si está en linux o mac puede instalar g++
  Si está en window la opción que recomendadomos sería mingw-w64, ya que es la que se ha testeado en este projecto.
  Podras descargarlo aqui:https://sourceforge.net/projects/mingw-w64/files/Toolchains%20targetting%20Win32/Personal%20Builds/mingw-builds/installer/mingw-w64-install.exe/download

## Guia para iniciar el programa
La primera vez que se quiera usar el programa habrá que instalar unos modulos necesarios.
Es por esto que despues de clonar el repositorió de este projecto se debera usar los siguientes comandos en la consola dentro de este:
- npm install
- cd .\matrix_processor\
- Linux o Mac: make
- Windows con mingw-w64: mingw32-make
Ahora ya nuestro proyecto esta listo para poder funcionar. Solo se necesitará usar el siguiente comando:
- npm run start
Si saltará algun mensaje pidiendo permisos en las redes privadas, eso es debido a que este projecto usa websockets y podría llegar a saltar este mensaje. Puede aceptarlo sin problema.