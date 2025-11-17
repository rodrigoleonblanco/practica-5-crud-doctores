FROM node:18-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiamos solo los package*.json primero para aprovechar la cache de Docker
COPY package*.json ./

# Instalamos dependencias de producción
RUN npm ci --omit=dev

# Copiamos el código fuente
COPY src ./src

# Variables de entorno por defecto dentro del contenedor
ENV NODE_ENV=production
# Por defecto lo dejamos en prod, pero lo vas a sobreescribir con -e si quieres local
ENV APP_ENV=prod

# Puerto donde escucha la app
EXPOSE 3000

# Comando de arranque
CMD ["node", "src/server.js"]
