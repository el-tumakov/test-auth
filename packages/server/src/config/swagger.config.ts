import { DocumentBuilder } from '@nestjs/swagger';

const SwaggerConfig = new DocumentBuilder()
  .setTitle('Tumakov test API')
  .setDescription('Tumakov test API description')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

export default SwaggerConfig;
