# Leer antes de empezar!!

### Base de datos

    _Voy a dejar adjunto un archivo llamado db_import.sql para que puedan importarlo y asi utilizar la base de datos correctamente.

    Basicamente seria el BackUp de la DB

### Pre-requisitos

Para que todo funcione correctamente deberian crear un archivo .env y copiar todas las variables de entorno que deje en el archivo .env.example.

Solo por esta vez permiti que esos datos fueran visualizados y subidos al repositorio para que ustedes puedan copiar los datos y manejar el optimo funcionamiento de la app.
De lo contrario esos datos nunca serian subidos a un repositorio ya que son sumamente privados.

## OriginSoftwareTask

Para iniciar el proyecto correctamente se necesita una conexion de base de datos por medio de un panel de control de XAMP donde nos permita iniciar el modulo de Apache y de Mysql para asi loguearnos dentro del localhost en phpMyAdmin.

Los primeros pasos a realizar para ver funcional el proyecto deberian ser:

-   Abrir dos terminales, en la primera utilizar el comando "cd server" y luego "npm run dev"

-   En la segunda terminal tendriamos que utilizar los siguientes comandos. "cd client" y "npm run start".

-   Luego de esto lanzar una solicitud post a la ruta http://localhost:3001/users que contenga en el body tanto el username, el name y la password. Ya que en el requerimiento no estaba contemplado el realizar un registro.

## Ejemplo

{
"name": "lautaro riveros",
"username" : "lautaro",
"password" : "passwordtest"
}

## Acciones

Luego de realizar esto ya podremos ingresar a nuestra plataforma de "Mis Acciones" mediante nuestro usuario y poder visualizar la lista de nuestras acciones.

Ademas, podemos ir seleccionando nuestras acciones preferidas y agregarlas a nuestra lista. Luego si en otro momento las acciones no son de nuestro interes, podemos eliminarlas clickeando el boton que tenemos a la derecha en la columna de acciones.

## Detalles de accion

Si queremos visualizar las cotizaciones de nuestras acciones preferidas unicamente deberiamos presionar sobre su nombre y esto nos llevara a una vista donde vamos a poder manejar un grafico que nos devuelva los datos que necesitamos.
