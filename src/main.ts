import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { BaseErrorFilter } from "./filter/base-error.filter";
import { HttpExceptionFilter } from "./filter/http-exception.filter";
import { envs } from "./common/env-values";

const logger = new Logger("Bootstrap");

async function bootstrap() {
  const openApiConfig = new DocumentBuilder()
    .setTitle("Access")
    .setDescription("The Access API description")
    .setVersion("0.1")
    .build();

  // const fs = require("fs");
  // const httpsOptions = {
  //   key: fs.readFileSync("/root/privkey.pem"),
  //   cert: fs.readFileSync("/root/cert.pem"),
  // };

  // const app = await NestFactory.create(AppModule, {
  //   httpsOptions,
  // });

  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: /.*/ });
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
    })
  );
  app.useGlobalFilters(new HttpExceptionFilter(), new BaseErrorFilter());

  const document = SwaggerModule.createDocument(app, openApiConfig);
  SwaggerModule.setup("api", app, document);

  await app.listen(envs.APP_PORT, () => {
    logger.log(`Server running on port: ${envs.APP_PORT} ...`);
  });
}
bootstrap();
