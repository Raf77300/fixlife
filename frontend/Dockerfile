FROM node:20-alpine

WORKDIR /app

# Copiamos dependencias
COPY package*.json ./
RUN npm install

# Copiamos el resto del proyecto
COPY . .

# Exponemos Vite
EXPOSE 5173

# Vite en modo dev
CMD ["npm", "run", "dev", "--", "--host"]
