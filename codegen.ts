import type { CodegenConfig } from '@graphql-codegen/cli';

const url = `http://localhost:5022/graphql/`;

const config: CodegenConfig = {
  generates: {
    './generated/graphql/': {
      preset: 'client',
      config: {
        useTypeImports: true,
      },
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
        fragmentMasking: false,
      },
      schema: [url],
      documents: ['src/**/*.ts*', 'src/*.ts*,gql'],
    },
  },
};

export default config;
