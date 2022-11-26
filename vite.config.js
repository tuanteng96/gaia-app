import path from 'path';
import reactRefresh from '@vitejs/plugin-react-refresh';


const SRC_DIR = path.resolve(__dirname, './src');
const PUBLIC_DIR = path.resolve(__dirname, './public');
const BUILD_DIR = path.resolve(__dirname, './www', );
//https://quanly.wow.edu.vn/app2021/

export default {
    plugins: [
        reactRefresh(),
    ],
    root: SRC_DIR,
    base: '',
    publicDir: PUBLIC_DIR,
    build: {
        outDir: BUILD_DIR,
        assetsInlineLimit: 0,
        emptyOutDir: true,
        rollupOptions: {
            treeshake: false,
            output: {
                assetFileNames: (assetInfo) => {
                    if (/\.css$/.test(assetInfo.name)) {
                        return 'assets/css/[name][extname]'
                    }
                    return `assets/[name][extname]`;
                },
                chunkFileNames: 'assets/js/[name].js',
                entryFileNames: 'assets/js/[name].js',
            }
        },

    },
    resolve: {
        alias: {
            '@': SRC_DIR,
        },
    },
    server: {
        host: true,
    },

};