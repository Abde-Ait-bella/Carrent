FROM php:8.2-apache  

RUN apt-get update && apt-get install -y \
    libpq-dev \
    unzip \
    git \
    curl

RUN docker-php-ext-install pdo pdo_pgsql

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN a2enmod rewrite

RUN sed -i 's|/var/www/html|/var/www/html/public|g' /etc/apache2/sites-available/000-default.conf

CMD ["apache2-foreground"]


# Dockerfile pour un projet React.js
FROM node:16

# Créer le répertoire de l'application dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tous les autres fichiers du projet
COPY . .

# Exposer le port 3000 (par défaut pour React)
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "start"]

