import { APIGatewayProxyHandler } from "aws-lambda";
import { agendaMock } from "../agenda/mocks";

export const postAgendamento: APIGatewayProxyHandler = async (event) => {
  const { medico_id, paciente_nome, data_horario } = JSON.parse(event.body || "{}");

  const medico = agendaMock.find((m) => m.id === medico_id);
  if (!medico) {
    return {
      statusCode: 404,
      body: JSON.stringify({ mensagem: "Médico não encontrado" })
    };
  }

  return {
    statusCode: 201,
    body: JSON.stringify({
      mensagem: "Agendamento realizado com sucesso",
      agendamento: {
        medico: medico.nome,
        paciente: paciente_nome,
        data_horario
      }
    })
  };
};
