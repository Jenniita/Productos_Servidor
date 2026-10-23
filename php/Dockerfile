# Dockerfile — Servidor PHP 8.3 + Apache

# Imagen oficial PHP 8.3 con Apache integrado
FROM php:8.3-apache

# Instalamos el driver de PostgreSQL para PHP (pdo_pgsql)
# sin esto PHP no puede hablar con PostgreSQL
RUN apt-get update && apt-get install -y libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql \
    && rm -rf /var/lib/apt/lists/*

# Le decimos a Apache que sirva los archivos desde /var/www/html
# que es donde copiamos nuestro codigo
COPY . /var/www/html/

# Damos permisos correctos a Apache sobre los archivos
RUN chown -R www-data:www-data /var/www/html

# Puerto de Apache (80 por defecto, docker-compose lo mapea al 8000 del host)
EXPOSE 80
