import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint2";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      cache: false,
      include: [
        "src/**/*.js",
        "src/**/*.jsx",
        "src/**/*.ts",
        "src/**/**/*.ts",
        "src/**/**/**/*.ts",
        "src/**/*.tsx",
        "src/**/**/*.tsx",
        "src/**/**/**/*.tsx"
      ], // Correção nos padrões de inclusão
      exclude: [] // Você pode adicionar pastas ou arquivos que deseja ignorar
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
});
