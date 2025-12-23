# backend/Dockerfile
FROM php:8.2-fpm

WORKDIR /var/www/html

# تثبيت dependencies
RUN apt-get update && apt-get install -y \
    git unzip libzip-dev libpng-dev \
    && docker-php-ext-install pdo pdo_mysql zip gd

# نسخ المشروع
COPY . .

# تثبيت composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install

# Serve Laravel
CMD php artisan serve --host=0.0.0.0 --port=8000
