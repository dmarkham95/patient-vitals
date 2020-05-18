import { NestFactory } from "@nestjs/core";
import { AuthResponse, CustomAuthorizerEvent } from "aws-lambda";
import env_variables from "_Common/Utilities/Environments/env_variables";
import { AuthorizerModule } from "./authorizer.module";
import { AuthorizerService } from "./authorizer.service";

process.on("unhandledRejection", (reason) => {
  console.error(reason);
});

process.on("uncaughtException", (reason) => {
  console.error(reason);
});

/** Built-in error messages that API Gateway auto-maps to HTTP status codes */
export enum APIGatewayErrorMessage {
  /** 401 */
  Unauthorized = "Unauthorized",
  /** 403 */
  AccessDenied = "Access Denied",
}

async function bootstrap(token: string, methodArn: string) {
  const app = await NestFactory.createApplicationContext(AuthorizerModule, {
    logger: env_variables.isDev ? undefined : false,
  });
  const service = app.get(AuthorizerService);

  return service.runAuthJob(token, methodArn).then((d) => d);
}

/** Lambda Authorizer handler */
export const handler = async (
  event: CustomAuthorizerEvent
): Promise<AuthResponse> => {
  if (!event.authorizationToken === undefined) {
    // No token provided
    throw new Error(APIGatewayErrorMessage.Unauthorized);
  }

  // first check Authorization bearer header
  const split = event.authorizationToken.split("Bearer");
  if (split.length !== 2) {
    console.log("AUTH: no token in Bearer");
    // Badly formed header
    throw new Error(APIGatewayErrorMessage.Unauthorized);
  }

  const token = split[1].trim();

  let auth = await bootstrap(token, event.methodArn);

  return auth;

  // ... rest of auth logic
};
