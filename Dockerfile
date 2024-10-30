FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Adicione suas credenciais
# COPY .aws/credentials /root/.aws/credentials

RUN npm run build

EXPOSE 3000

CMD ["npx", "serverless", "offline"]
