// orval.config.ts
import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: './openapi.json',
    output: {
      mode: 'single',  
      target: 'src/api/generated/api.ts',
      schemas: 'src/api/generated/models',
      // client: 'axios',    
      client: 'vue-query', 
      
      override: {
        // query: {
        //   useQuery: true,
        //   useMutation: true,
        // },
        mutator: {
          path: './src/api/custom-instance.ts',
          name: 'customInstance',
        },
      },
    },
  },
});
