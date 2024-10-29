import { APIGatewayProxyEvent } from "aws-lambda";
import { getAgendas } from "../agenda/controller";
import { Callback } from "aws-lambda";

describe("Agenda Controller", () => {
  it("should return a list of agendas", async () => {
    const event: APIGatewayProxyEvent = {
      body: null,
      headers: {},
      httpMethod: "GET",
      isBase64Encoded: false,
      path: "/agendas",
      pathParameters: null,
      queryStringParameters: null,
      multiValueHeaders: {},
      multiValueQueryStringParameters: null,
      requestContext: {
        accountId: "123456789012",
        apiId: "exampleApiId",
        authorizer: null,
        httpMethod: "GET",
        identity: {
          accessKey: null,
          accountId: null,
          apiKey: null,
          apiKeyId: null,
          caller: null,
          clientCert: null,
          cognitoAuthenticationProvider: null,
          cognitoAuthenticationType: null,
          cognitoIdentityId: null,
          cognitoIdentityPoolId: null,
          principalOrgId: null,
          sourceIp: "127.0.0.1",
          user: null,
          userAgent: "PostmanRuntime/7.26.8",
          userArn: null,
        },
        path: "/agendas",
        stage: "dev",
        requestId: "c9b7c1b4-1fbd-4e5a-b1f7-d87b734a18f8",
        requestTimeEpoch: 1639167838897,
        resourceId: "resourceId",
        resourcePath: "/agendas",
        protocol: "HTTP/1.1",
      },
      resource: "/agendas",
      stageVariables: null,
    };

    const response = await getAgendas(event, {} as any, () => {});
    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body || "{}");
    expect(body.medicos).toBeDefined();
  });
});
