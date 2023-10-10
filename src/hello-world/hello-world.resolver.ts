import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
  //With this we say a graphql the type to data to return
  @Query(() => String, {
    description: 'Hello word from resolver with nest',
    name: 'panas',
  })
  helloWorld(): string {
    return 'Hola mundo';
  }

  //Create another query, for generate ramdon mumber
  @Query(() => Float, {
    name: 'randomNumbers',
    description: 'Return a random number of type float',
  })
  getRandomNumber(): number {
    return Math.random() * 100;
  }

  @Query(() => Int, {
    name: 'numberToZeroTo',
    description: 'Return random number between certain number (default 9)',
  })
  //With @Args('name of the parameter') we can pass it as a parameter
  getRandomFromZeroTo(
    @Args('to', { nullable: true, type: () => Int}) to: number = 9
  ): number {
    return Math.floor(Math.random() * to) ;
  }
}
