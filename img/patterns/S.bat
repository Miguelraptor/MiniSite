@echo off
setlocal enabledelayedexpansion

REM Cambia al directorio donde está el script
cd /d "%~dp0"

REM Recorre todos los archivos en la carpeta actual
for %%f in (*.*) do (
    REM Guarda el nombre del archivo sin extensión
    set "filename=%%~nf"
    REM Guarda la extensión del archivo
    set "extension=%%~xf"
    
    REM Convierte el nombre del archivo a mayúsculas
    set "uppercase=!filename!"
    set "uppercase=!uppercase:a=A!"
    set "uppercase=!uppercase:b=B!"
    set "uppercase=!uppercase:c=C!"
    set "uppercase=!uppercase:d=D!"
    set "uppercase=!uppercase:e=E!"
    set "uppercase=!uppercase:f=F!"
    set "uppercase=!uppercase:g=G!"
    set "uppercase=!uppercase:h=H!"
    set "uppercase=!uppercase:i=I!"
    set "uppercase=!uppercase:j=J!"
    set "uppercase=!uppercase:k=K!"
    set "uppercase=!uppercase:l=L!"
    set "uppercase=!uppercase:m=M!"
    set "uppercase=!uppercase:n=N!"
    set "uppercase=!uppercase:o=O!"
    set "uppercase=!uppercase:p=P!"
    set "uppercase=!uppercase:q=Q!"
    set "uppercase=!uppercase:r=R!"
    set "uppercase=!uppercase:s=S!"
    set "uppercase=!uppercase:t=T!"
    set "uppercase=!uppercase:u=U!"
    set "uppercase=!uppercase:v=V!"
    set "uppercase=!uppercase:w=W!"
    set "uppercase=!uppercase:x=X!"
    set "uppercase=!uppercase:y=Y!"
    set "uppercase=!uppercase:z=Z!"
    set "newname=!uppercase!!extension!"

    REM Renombra el archivo
    if not "%%f"=="!newname!" (
        echo Renaming "%%f" to "!newname!"
        ren "%%f" "!newname!"
    )
)

echo Done.
pause
