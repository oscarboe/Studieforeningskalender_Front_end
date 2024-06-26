import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
//import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	return {
		define: {
			'process.env.REACT_APP_SITE_KEY': JSON.stringify(env.REACT_APP_SITE_KEY),
		},
		plugins: [react() /*, basicSsl()*/],
	};
});
