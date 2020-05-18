import { NestFactory } from "@nestjs/core";
import { APIGatewayEvent, Context, Handler } from "aws-lambda";
import * as serverless from "aws-serverless-express";
import { eventContext } from "aws-serverless-express/middleware";
import { Server } from "http";
import env_variables from "_Common/Utilities/Environments/env_variables";
import { AllExceptionsFilter } from "_Common/Filters/Exception.filter";
import { waitForLogger } from "_Common/Utilities/Loggers/Logger";
import { ApiDDBModule } from "_DistributedServiceLayer/API/api.ddb.module";

let cachedServer: Server;
const expressApp = require("express")();

async function bootstrapServer(): Promise<any> {
  return NestFactory.create(ApiDDBModule, expressApp, {
    bodyParser: true,
    logger: env_variables.isDev ? undefined : false,
  })
    .then((app) => {
      app.use(eventContext());
      app.useGlobalFilters(new AllExceptionsFilter());
      app.setGlobalPrefix("api");
      app.enableCors();
      return app.init();
    })
    .then(() => {
      return serverless.createServer(expressApp);
    });
}

export const handler: Handler = async (
  event: APIGatewayEvent,
  context: Context
) => {
  context.succeed = succeedWaitsLogger(context.succeed);
  if (!cachedServer) {
    cachedServer = await bootstrapServer();
  }
  return serverless.proxy(cachedServer, event, context, "PROMISE").promise;
};

function succeedWaitsLogger(succeed: Context["succeed"]): Context["succeed"] {
  return (messageObject: any) => {
    waitForLogger()
      .then(() => {
        succeed(messageObject);
      })
      .catch((error) => {
        succeed(messageObject);
      });
  };
}
