# volumes/

Esta carpeta almacena **los datos persistentes de los contenedores Docker**.

## El problema que resuelve

Por defecto, cuando paras y borras un contenedor Docker, todos sus datos
desaparecen. Si borras el contenedor de PostgreSQL, pierdes toda la base de datos.

Los volumenes solucionan esto: los datos se guardan en tu maquina (en esta carpeta)
y el contenedor los lee desde aqui. Aunque borres y recrees el contenedor,
los datos siguen estando.

## Subcarpetas

| Carpeta    | Que guarda                                              |
|------------|---------------------------------------------------------|
| `postgres/`| Los archivos internos de PostgreSQL (tablas, indices...) |
| `pgadmin/` | La configuracion de pgAdmin (conexiones guardadas, etc.) |

## Como se configuran en docker-compose.yml

```yaml
services:
  postgres:
    image: postgres:16
    volumes:
      - ./volumes/postgres:/var/lib/postgresql/data

  pgadmin:
    image: dpage/pgadmin4
    volumes:
      - ./volumes/pgadmin:/var/lib/pgadmin
```

## Regla

No edites ni borres los archivos de estas carpetas manualmente.
Son archivos internos de PostgreSQL y pgAdmin; si los tocas puedes corromper la BD.

Para resetear la base de datos completamente:
```
docker compose down -v
```
Y luego borra el contenido de `volumes/postgres/` a mano si fuera necesario.
