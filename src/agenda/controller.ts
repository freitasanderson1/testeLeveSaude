import { agendaMock } from "./mocks";
import {
  APIGatewayProxyEvent,
  Context,
  Callback,
  APIGatewayProxyResult,
} from "aws-lambda";

export const getAgendas = async (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback<APIGatewayProxyResult>,
): Promise<APIGatewayProxyResult> => {
  const horariosLivres = agendaMock.map((medico) => ({
    id: medico.id,
    nome: medico.nome,
    especialidade: medico.especialidade,
    horarios_disponiveis: medico.horarios_disponiveis,
  }));

  return {
    statusCode: 200,
    body: JSON.stringify({ medicos: horariosLivres }),
  };
};
