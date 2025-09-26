import { Injectable, OnModuleInit } from '@nestjs/common';
import { connect, MqttClient } from 'mqtt';

@Injectable()
export class MqttService implements OnModuleInit {
  private client: MqttClient;

  onModuleInit() {
    // konek ke broker MQTT (ubah url sesuai broker kamu)
    this.client = connect('mqtt://localhost:1883');

    this.client.on('connect', () => {
      console.log('✅ Connected to MQTT broker');
    });

    this.client.on('error', (err) => {
      console.error('❌ MQTT Error:', err);
    });
  }

  publish(topic: string, message: any) {
    const payload = JSON.stringify(message);
    this.client.publish(topic, payload, {}, (err) => {
      if (err) {
        console.error('❌ Publish error:', err);
      } else {
        console.log(`📤 Published to ${topic}:`, payload);
      }
    });
  }
}
