import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
        server: {
            port: 3000,
            host: '0.0.0.0',
        },
        plugins: [react()],
        define: {
            'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
            'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, '.'),
            }
        },
        build: {
            chunkSizeWarningLimit: 1000, // Increase the chunk size warning limit
            rollupOptions: {
                output: {
                    manualChunks: {
                        // Split vendor libraries into separate chunks
                        react: ['react', 'react-dom', 'react-router-dom'],
                        // Split large components into separate chunks
                        components: [
                            './components/Header',
                            './components/Footer',
                            './components/ContactModal'
                        ],
                        // Split pages into separate chunks
                        pages: [
                            './pages/Home',
                            './pages/ServicePage',
                            './pages/LegalPage'
                        ]
                    },
                },
            },
        },
    };
});
