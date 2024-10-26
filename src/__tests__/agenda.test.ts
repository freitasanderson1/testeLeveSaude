import { getAgendas } from "../agenda/controller";

test("GET /agendas should return a list of doctors", async () => {
  const response = await getAgendas();
  expect(response.statusCode).toBe(200);
  const body = JSON.parse(response.body || "{}");
  expect(body.medicos.length).toBeGreaterThan(0);
});
