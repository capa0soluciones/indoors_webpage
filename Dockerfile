# Usa una imagen base de Nginx
FROM nginx:stable-alpine

# Copia los archivos del proyecto al directorio de Nginx
COPY . /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# El contenedor usa el comando por defecto de Nginx