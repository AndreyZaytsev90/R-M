import { defineConfig } from 'orval';

export default defineConfig({
  rickAndMortyApi: {
    input: './docs/swagger.yaml',
    output: {
      target: './src/api',
      client: 'axios',
      schemas: './src/api/model'
    }
  }
});
