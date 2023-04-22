import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from '../app.config';
async function start() {
  try {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(PORT, () => console.log(`server runing on PORT ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}
start();
