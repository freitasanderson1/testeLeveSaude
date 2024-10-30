import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import { agendaMock } from '../agenda/mocks';

const agendamentosFeitos: {
  medico_id: number;
  data_horario: string;
  paciente_nome: string;
}[] = [];

export const postAgendamento: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
) => {
  const { medico_id, paciente_nome, data_horario } = JSON.parse(
    event.body || '{}',
  );

  // Verifica se o médico existe
  const medico = agendaMock.find((m) => m.id === medico_id);
  if (!medico) {
    return {
      statusCode: 404,
      body: JSON.stringify({ mensagem: 'Médico não encontrado' }),
    };
  }

  // Verifica se o horário está disponível
  const horarioDisponivel = medico.horarios_disponiveis.includes(data_horario);
  if (!horarioDisponivel) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        mensagem: 'Horário não disponível para agendamento',
      }),
    };
  }

  // Verifica se o horário já foi agendado
  const horarioJaAgendado = agendamentosFeitos.some(
    (agendamento) =>
      agendamento.medico_id === medico_id &&
      agendamento.data_horario === data_horario,
  );
  if (horarioJaAgendado) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        mensagem: 'Esse horário já foi agendado. Por favor, escolha outro.',
      }),
    };
  }

  // Adiciona o novo agendamento à lista
  agendamentosFeitos.push({ medico_id, data_horario, paciente_nome });

  // Remove o horário do mock
  // medico.horarios_disponiveis = medico.horarios_disponiveis.filter(
  //   (h) => h !== data_horario,
  // );

  // Log dos agendamentos
  console.log(`Agendamentos Feitos: ${JSON.stringify(agendamentosFeitos)}`);
  agendamentosFeitos.forEach((agendamento) =>
    console.log(
      `Item: ${agendamento.medico_id} ${agendamento.paciente_nome} ${agendamento.data_horario}`,
    ),
  );

  return {
    statusCode: 201,
    body: JSON.stringify({
      mensagem: 'Agendamento realizado com sucesso',
      agendamento: {
        medico: medico.nome,
        paciente: paciente_nome,
        data_horario,
      },
    }),
  };
};
