import { APIGatewayProxyHandler } from "aws-lambda";
import { agendaMock } from "./mocks";

export const getAgendas: APIGatewayProxyHandler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({ medicos: agendaMock })
  };
};
