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
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Autor](#autor)

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
3. **Configure o Serverless Framework: Certifique-se de que o Serverless Framework está instalado globalmente e configure as credenciais da AWS se planeja fazer o deploy:**
    ```bash
    npm install -g serverless
    ```

## Execução do Projeto
Para rodar o projeto localmente, utilize o serverless-offline:

```
npx serverless offline
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
                    "horarios_disponiveis": [
                        "2024-10-06 14:00",
                        "2024-10-06 15:00"
                    ]
                }
            ]
        }

    ```

2. **Marcar Agendamento**
    Rota: POST /agendamento

    Descrição: Permite que o paciente marque uma consulta.

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
## Testes
Para rodar os testes unitários, utilize o comando:
```
npx test
```

## Boas Práticas
O projeto utiliza ESLint e Prettier para garantir a qualidade do código. Para executar a formatação e verificação, utilize:

```bash
npx eslint . --fix
npx prettier --write .
```