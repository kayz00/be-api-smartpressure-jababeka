import { Controller, Post, Body, OnModuleInit } from '@nestjs/common';
import * as mqtt from 'mqtt';

// connect ke broker
const client = mqtt.connect('mqtt://lorawan.jababeka-infra.com:1883');

@Controller('api')
export class AppController implements OnModuleInit {
  onModuleInit() {
    // event connect
    client.on('connect', () => {
      console.log('✅ Connected to MQTT broker');
    });

    // event error
    client.on('error', (err) => {
      console.error('❌ MQTT Connection error:', err.message);
    });

    // event reconnect
    client.on('reconnect', () => {
      console.log('🔄 Reconnecting to MQTT broker...');
    });

    // event close
    client.on('close', () => {
      console.log('⚠️ Disconnected from MQTT broker');
    });
  }

  @Post('smartpressure')
  async receiveData(@Body() payload: any) {
    if (client.connected) {
      client.publish('testing', JSON.stringify(payload), { qos: 0, retain: true });
      console.log('📤 Payload published to topic "testing":', payload);
    } else {
      console.error('⚠️ Cannot publish, MQTT broker not connected');
    }

    return {
      status: 'success',
      message: 'Data received (check logs for MQTT status)',
      data: payload,
    };
  }
}
