import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AllExceptionsFilter } from "_Common/Filters/Exception.filter";
import { ApiDDBModule } from "./api.ddb.module";

async function bootstrap(): Promise<void> {
  const port = 4000;

  const app = await NestFactory.create(ApiDDBModule, {
    bodyParser: true,
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.setGlobalPrefix("api");
  app.useGlobalFilters(new AllExceptionsFilter());
  app.enableCors();
  await app.listen(port);
}
bootstrap();
