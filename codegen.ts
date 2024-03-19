import type { CodegenConfig } from '@graphql-codegen/cli';

const url = 'http://studieforeningskalender-backend-dev.eba-kjvansm7.eu-north-1.elasticbeanstalk.com/graphql/';

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
