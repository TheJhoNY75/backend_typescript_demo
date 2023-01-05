import { App } from './app';

async function main(){
  const app = new App(3333);
  await app.listen();
}


main()