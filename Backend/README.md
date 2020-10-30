# Examen técnico forum

El examen técnico se desarrolló de la siguiente manera:

Se desarrolló un servidor api resful con tecnología NodeJs/Express y aplicando metodología Javascript airbnb.

La permanencia de los datos se realiza con MongoDB y se utilizo el paquete npm Mongoose para realizar la implementación en servidor.

Para las sesiones de usuario se utilizó jsonwebtoken y las contraseñas se almacenaron con bcrypt

El fronend se desarrolló con Angular 8, bootstrap 4 y se implementó el patrón redux para manejar el estado de la aplicación.

Para correr la aplicación solo vasta con ejecutar npm install y npm start en la carpeta y luego ingresar a la url [http://localhost:3000](http://localhost:3000)

Si se desea ejecutar la aplicación fronend por separado se debe ingresar a la carpeta del servidor e ir a src/frontend y ejecutar npm install y ng serve.

Para crear un usuario administrador hay que cambiar el rol por defecto en la base de datos por “admin”

# Dependencias
- mongoose
- bcrypt
- jsonwebtoken
- angular 8
- jquery
- bootstrap 4
- @ngrx/store
- @ngrx/store-devtools
- @auth0/angular-jwt