import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'mqtt.jababeka-infra.com', // nama token yang bisa di-inject
        transport: Transport.MQTT,
        options: {
          url: 'mqtt://lorawan.jababeka-infra.com:1883',
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [], // kalau ada service lain bisa taruh di sini
})
export class AppModule {}
