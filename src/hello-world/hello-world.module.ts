import { Module } from '@nestjs/common';
import { HelloWorldResolver } from './hello-world.resolver';

@Module({
  providers: [HelloWorldResolver] //resolvers === controller
})
export class HelloWorldModule {}
