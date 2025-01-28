import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")

  return {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      }
    },
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_REAL_URL,
          changeOrigin: true,
          secure: true,
          rewrite: (p) => p.replace(/^\/api/, ""),
        },
        "/radio-api": {
          target: "https://radio.garden",
          changeOrigin: true,
          secure: true,
          rewrite: (p) => p.replace(/^\/radio-api/, ""),
        },
      },
      cors: false,
    },
    preview: {
      proxy: {
        "/api": {
          target: env.VITE_API_REAL_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (p) => p.replace(/^\/api/, ""),
        },
        "/radio-api": {
          target: "https://radio.garden",
          changeOrigin: true,
          secure: false,
          rewrite: (p) => p.replace(/^\/radio-api/, ""),
        },
      },
      cors: false,
    },
    css: {
      modules: {
        localsConvention: "camelCaseOnly"
      }
    }
}
})