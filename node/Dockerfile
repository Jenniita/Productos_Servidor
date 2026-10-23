# Dockerfile — Servidor Node.js + EJS

# Imagen base oficial de Node.js (version LTS ligera)
FROM node:20-alpine

# Carpeta de trabajo dentro del contenedor
WORKDIR /app

# Copiamos primero solo package.json para aprovechar la cache de Docker:
# si no cambian las dependencias, Docker no vuelve a hacer npm install
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto del codigo
COPY . .

# Puerto en el que escucha Express (debe coincidir con app.js)
EXPOSE 3000

# Comando que arranca el servidor
CMD ["node", "app.js"]
