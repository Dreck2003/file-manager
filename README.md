# file-manager

> **File-Manager** es una api Rest que permite manejar archivos,tanto como subiendolo a la nube,como descargandolo, visualizarlo.
>
> Ademas tiene un buscador de imagenes usando la api de [Unsplash](https://unsplash.com/) :) .

## Getting Started:


### Prerrequisitos:
 <ul>
  <li>Node >= 14.18.1</li>
  <li>Usar una base de datos relacional</li>
</ul>


> El proyecto esta hecho con el PrismaORM ,asi que cualquier duda puedes consultar [aqui](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgres).

## Índice de contenidos
* [Preparando las variables de entorno](#envFile)
* [Crear la base de datos](#INIT_DB)
* [Documentacion](#documentation)
* [Testing](#testing)


<br>
<a name="envFile"></a>

### 1. Archivo .env :

**SERVER:**

> Puedes usar el archivo .env.example como el esqueleto de el archivo .env. **Todas las variables del archivo ejemplo estan en el archivo .env.**

Empecemos con las variables más faciles: 
```text
PORT=3001
BASE_URL=http://localhost:3001
```
 La variable PORT hace referencia al puerto del servidor, por defecto esta en **3001**.Y la variable BASE_URL, hace referencia a el url base, por defecto esta en
 **http://localhost:3001**.
 <br><br>
 
**DATABASE:**
 <a name='DB_URL'></a>
 
 > Ahora empezemos a estructurar la **URL de nuesta base de datos**.
 
 ```text
 DB_URL="postgresql://username:randompassword@localhost:puerto/mydb?schema=public"
```
La variable DB_URL hace referencia a la url de nuestra base de datos.No tiene un valor por defecto!.

Hay diferentes formas de crear la url,dependiendo de que tipo de gestor de bases de datos uses.En este caso se esta usando PostgreSQL.

Si no sabes como crear la url, puedes consultar eso [aqui](https://www.prisma.io/docs/reference/database-reference/connection-urls).


> **username** => Es el nombre de usuario de postgres.

> **randomPassword** => Es la contraseña de postgres.

> **localhost** => Es el host del servidor de postgres.

> **puerto** => Es el puerto por el cual corre postgres.

> **mydb** => Es el nombre de la base de datos para usar en la API.
 
 
 **AWS:**
 > Ahora configuraremos las variables para usar AWS-S3
 
 
```text
AWS_KEY= KEY
AWS_SECRET= SECRET
AW_BUCKET= name_of_bucket
```

La variable **AWS_KEY** es la key de AWS, **AWS_SECRET** es la clave del bucket de AWS, y **AW_BUCKET** es el nombre del bucket.


 **NODE_MAILER:**
 
> Ahora configuraremos las variables para poder enviar emails para el **Forgot Password**.}

```text
EMAIL_FROM=random@gdandom.com
EMAIL_PASSWORD=google_secret
EMAIL_USER=user@user.com
```

Para obtener el EMAIL_PASSWORD e EMAIL_USER, tenemos que configurar nuestra cuenta de google.

Para ello nos dirigimos a la seccion **security** dentro de nuestra cuenta. Y en **Signing in to Google** seleccionamos **2-step verification**.

Seguimos todos los pasos para confirmar nuestra identidad.

Luego al volver a nuestra cuenta en **security**, seleccionamos **app passwords**.

Despues, seleccionamos un **other application**, y le ponemos un nombre. Esto nos dará una contraseña, la cual **es la variable EMAIL_PASSOWRD**.

Y las variables **EMAIL_FROM** y **EMAIL_USER**, es el cuenta de correo de google con la cual obtuvimos la contraseña.👍
 
**JWT:**
> Debemos crear un ***¨secreto¨*** para el manejo de la seguridad de los tokens

```text
JWT_SECRET=imposible_de_descubrir
```
Esta variable tiene un valor por defecto.


**Unsplash**

> Tambien necesitamos dos variables para usar la api de **Unsplash** para la busqueda de las imagenes.

```text
UNSPLASH_ACCES_KEY= key_acces_for_developers
UNSPLASH_SECRET_KEY = key_secret_for_developers
```

Básicamente decesitamos una **KEY** y un **SECRET**,por ello nos registramos en [Unsplash](https://unsplash.com/join). Y nos creamos una aplicacion demo
para poder usar su API.

Ahora ejecuta: <code>npm run dev</code>
Y con esto bastaría para poder correr el servidor 😎.

<br>
<a name="INIT_DB"></a>

### 2. Crear la Base de datos:

Ahora debes crear una nueva base de datos con el mismo nombre de la base de datos que pusimos en el archivo [.env](#DB_URL) (DB_URL => ***mydb***) 

Y ejecutar el siguiente comando en la terminal: <code>npm run prisma:init</code>
Ahora vuelve a ejecutar <code>npm run dev</code>, y deberia correr el servidor.😎

<a name="documentation"></a>

#### 3. Documentacion:

> Puedes ver la documentación de la API en: **http://localhost:3001/documentation/**:

La documentacion esta hecha con swagger, y hay algunos endpoints que no podran funcionar, debido a que se debe enviar archivos al server,por ello es necesario 
testear la api con un software como [Postman](https://www.postman.com/) o [insomnia](https://insomnia.rest/download).

**EndPoints**

***USERS***

POST: <code>/api/users</code> Este endpoint recibe un objeto como el siguiente:

```javascript
{
  "name": "string",
  "username": "string",
  "email": "string",
  "password": "string"
}
```
Y deberia retorna un objeto como el siguiente: 

```javascript
{
 error:null,
 content: User
}
```

PUT: <code>/api/users/:token</code> Este endpoint recibe el token por params y un objeto como el siguiente: 

```javascript
{
  "password": "string",
  "newPassword": "string"
}
```
Y deberia retorna un objeto como el siguiente: 

```javascript
{
 error:null,
 content: `Password changed!,try to login again ${newUser.name}`
}
```

***FILES***

POST: <code>/api/files</code> Este endpoint recibe un token por header y un objeto formData con el archivo(***fileUpload***)  y el nombre de la archivo(***nameFile***);

***fileUpload*** => Es el nombre del archivo

***nameFile*** => Es el nombre que el usuario quiere para el archivo que subio(Deberia ser seleccionado en un input).


Y deberia retorna : 

```javascript
{
 error:null,
 content: File
}
```


GET: <code>/api/files/userFiles</code> Este endpoint recibe un token por header y deberia retornar todos los archivos de un usuario

```javascript
{
 error:null,
 content: File[]
}
```


GET: <code>/api/files/singleFile/:key</code> Este endpoint recibe el key de un archivo para bajarlo por chunks.Deberia ser usado dentro de etiquetas html para la carga de los datos.

```html
<img src="htpp:localhost:3001/api/files/singleFile/{key}"/>
<video controls>
 <source src="htpp:localhost:3001/api/files/singleFile/{key}" type="video/mp4">
</video>
```


***FILEMANAGER***

GET: <code>/api/fileManager/download/:token/:key</code> Este endpoint recibe un token y una key para descargar el archivo cuando se hace un get a esa ruta.
Se deberia usar para redireccionar a la descarga.

GET: <code>/api/fileManager/searchFile?image=Lima</code> Este endpoint recibe una query con el nombre de **image** y devuelve las imagenes que coincidan con la query, traidas de Unsplash.

```javascript
{
 error:null,
 content: Images[]
}
```

***Auth***

PORT: <code>/api/auth/login</code> Este endpoint recibe el username y el  password y devuelve el usuario con el token

```javascript
{
  "username": "string",
  "password": "string"
}
```

Devuelve:

```javascript
{
 error:null,
 content: {
 name:"",
 username:"",
 token:""
}
```



GET: <code>/api/auth/forgotPassword</code> Este endpoint recibe el email y el token para enviar un email para cambiar de contraseña:

```javascript
{
  "email":"test@test.com"
}
```

```javascript
{
 error:null,
 content: `http://localhost:3000/${token}`;
}
```

<a>testing</a>

### 3. Testing:

> Puedes ejecutar <code>npm test</code> para correr los test de algunos endpoints.

[Subir](#top)

