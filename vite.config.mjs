import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      name: '@microsoft/api-docs-ui',
      formats: ['cjs'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        dir: './dist',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    cssCodeSplit: false,
  },
  plugins: [
    tsconfigPaths(),
    dts({
      insertTypesEntry: true,
    }),
  ],
});
