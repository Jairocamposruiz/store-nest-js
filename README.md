<p align="center">
  <a href="https://blog.jcoder.es/" target="blank"><img src="https://jcoderbucket.s3.eu-west-2.amazonaws.com/Logo/logo512.png" width="200" alt="JCodeR Logo" /></a>
</p>

## Descripción

Ejemplo de un RestServer con NestJS y TypeScript más info sobre proyectos en [JCodeR.es](https://blog.jcoder.es).

Este proyecto es una RestServer para una tienda online cuenta con prácticamente todas las funcionalidades necesarias,
tiene implementada autenticación con JWT, sistema de roles y permisos para los endpoints, Un ORM para conectarse a cualquier
base de datos relacional de nuestra preferencia, sistema de migraciones para la base de datos y muchas features más.

## Instalación

```bash
$ npm install
```

## Corriendo la aplicación

```bash
# development
$ npm run start

# staging
$ npm run start:stag

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Bases de datos

### Configuración docker

En el archivo de configuración de docker compose se encuentran las dos bases de datos para las que está configurado
el proyecto, junto con el manejador de cada una de ellas.
Se puede añadir la que se necesite sin hacer modificaciones al proyecto siempre que la soporte TypeORM.

Una vez elegida cual queremos hay que añadir una carpeta donde se monta el volumen de docker con la base de datos
para que esta tenga persistencia. En caso de elegir postgres ./data/postgres_data y en caso de elegir mysql ./data/mysql_data.
Si queremos que esta no tenga persistencia o cambiar el origen de la carpeta se puede hacer desde el **docker-compose.yml**.

```
volumes:
  - ./data/mysql_data:/var/lib/mysql
```

### Variables de entorno

En el archivo .env.example pueden ver las variables de entorno que se deben configurar para que funcione el proyecto.

### Configuración TypeORM

En el archivo **/src/modules/common/database/database.module.ts** se encuentra toda la configuración de la base de datos.
Dentro de este veremos el objeto de configuración de TypeORM donde tendremos que indicar la base de datos que usaremos,
por defecto está **postgres**.

```
    type: 'postgres',
```

En el objeto de configuración también tenemos la posibilidad de activar las migraciones automáticas de la base de datos,
para ello se deben añadir los siguientes parámetros:

```
    synchronize: true,
```
No se recomienda activar las migraciones automáticas en producción, ya que puede generar errores de integridad de datos.
Aunque es muy útil en desarrollo si estamos modificando continuamente nuestras entidades.

### Migraciones

Este proyecto tiene implementado un sistema de migraciones para la base de datos, con los siguientes comandos podemos
ejecutar dichas migraciones:

```bash
# Generar una nueva migración
$ npm run migrations:generate -- <nombre_migracion>

# Correr la ultima migración
$ npm run migrations:run

# Mostrar datos de las migraciones
$ npm run migrations:show

# Borrar todos los datos de la base de datos ¡¡¡Peligroso!!!
$ npm run migrations:drop
```

## Autenticación y autorización

Esta Api cuenta con un sistema de autenticación y autorización para que los usuarios puedan acceder a los endpoints,
se gestiona todo mediante JWT y un sistema de roles. También cuenta con encriptación de contraseñas, para proteger,
en caso de algún ataque a la base de datos.

## Datos sobre el autor

- Autor - Jairo Campos Ruiz
- Website - [JCodeR.es](https://jcoder.es)
- Blog - [blog.JCodeR.es](https://blog.jcoder.es)
