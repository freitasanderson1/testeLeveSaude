# Sistema de Agendamento de Consultas

Este projeto é uma API desenvolvida com **Node.js v20**, **TypeScript**, **Serverless Framework** e **AWS Lambda**. A API permite que pacientes consultem agendas médicas e realizem agendamentos de consultas.

## 📋 Índice

- [Descrição](#descrição)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Execução do Projeto](#execução-do-projeto)
- [Endpoints](#endpoints)
- [Testes](#testes)
- [Boas Práticas](#boas-práticas)
- [Docker](#docker)

## Descrição

A API possui dois endpoints principais:

1. **GET /agendas** - Retorna uma lista de médicos com suas especialidades e horários disponíveis para consulta.
2. **POST /agendamento** - Permite que o paciente marque um horário de consulta com um médico.

As respostas são **mockadas** para fins de teste e não requerem integração com um banco de dados real.

## Tecnologias Utilizadas

- **Node.js v20**
- **TypeScript**
- **Serverless Framework**
- **AWS Lambda**
- **Jest** (para testes unitários)

## Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/freitasanderson1/testeLeveSaude.git
   cd testeLeveSaude
   ```
2. **Instale as dependências:**
   ```bash
    npm install
   ```

#

## Execução do Projeto

Para rodar o projeto localmente, utilize:

```
npm run start
```

A API estará disponível em http://localhost:3000.

## Endpoints

1. **Buscar Agendas Médicas**
   Rota: GET /agendas

   Descrição: Retorna uma lista de médicos e seus horários disponíveis.

   Exemplo de Resposta:

   ```json
   {
     "medicos": [
       {
         "id": 1,
         "nome": "Dr. João Silva",
         "especialidade": "Cardiologista",
         "horarios_disponiveis": [
           "2024-10-05 09:00",
           "2024-10-05 10:00",
           "2024-10-05 11:00"
         ]
       },
       {
         "id": 2,
         "nome": "Dra. Maria Souza",
         "especialidade": "Dermatologista",
         "horarios_disponiveis": ["2024-10-06 14:00", "2024-10-06 15:00"]
       }
     ]
   }
   ```

2. **Marcar Agendamento**
   Rota: POST /agendamento

Descrição: Permite que o paciente marque uma consulta.

### Exemplos de Payloads:

Payload Esperado:

```json
{
  "medico_id": 1,
  "paciente_nome": "Carlos Almeida",
  "data_horario": "2024-10-05 09:00"
}
```

Exemplo de Resposta:

```json
{
  "mensagem": "Agendamento realizado com sucesso",
  "agendamento": {
    "medico": "Dr. João Silva",
    "paciente": "Carlos Almeida",
    "data_horario": "2024-10-05 09:00"
  }
}
```

##

Payload "Horário já ocupado":

```json
{
  "medico_id": 1,
  "paciente_nome": "Carlos Almeida",
  "data_horario": "2024-10-05 09:00"
}
```

Exemplo de Resposta:

```json
{
  "mensagem": "Esse horário já foi agendado. Por favor, escolha outro."
}
```

##

Payload "Horário não disponível":

```json
{
  "medico_id": 1,
  "paciente_nome": "Carlos Almeida",
  "data_horario": "2024-10-05 08:00"
}
```

Exemplo de Resposta:

```json
{
  "mensagem": "Horário não disponível para agendamento"
}
```

##

Payload "Médico não encontrado":

```json
{
  "medico_id": 3,
  "paciente_nome": "Carlos Almeida",
  "data_horario": "2024-10-05 08:00"
}
```

Exemplo de Resposta:

```json
{
  "mensagem": "Médico não encontrado"
}
```

##

## Testes

Para rodar os testes unitários, utilize o comando:

```
npm run test
```

## Boas Práticas

O projeto utiliza ESLint e Prettier para garantir a qualidade do código. Para executar a formatação e verificação, utilize:

```bash
npm run lint
npm run format
```

## Docker

#### Dockerfile

O Dockerfile está configurado para construir a imagem da aplicação. Para construir a imagem e rodar a aplicação, utilize o seguinte comando:

```bash
docker-compose up --build
```

Na linha 12 do arquivo Dockerfile, você pode colocar o Path para a localização de suas credenciais AWS:

```
COPY .aws/credentials /root/.aws/credentials
```

- Você precisa garantir que o diretório .aws esteja em seu contexto de build e que contenha o arquivo credentials.

#### docker-compose.yml

O arquivo docker-compose.yml define a configuração do contêiner, incluindo variáveis de ambiente e portas.

Em SERVERLESS_ACCESS_KEY você vai colocar sua ACESS_KEY do Serverless:

```
SERVERLESS_ACCESS_KEY=#SEU_ACCESS_KEY_SERVERLESS
```

Em AWS_ACCESS_KEY_ID e AWS_SECRET_ACCESS_KEY você vai colocar suas KEYS da AWS:

```
- AWS_ACCESS_KEY_ID=######SEU_ACCESS_KEY_AWS
- AWS_SECRET_ACCESS_KEY=####SEU_SECRET_KEY_AWS
```
