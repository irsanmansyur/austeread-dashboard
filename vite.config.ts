import dotenv from "dotenv";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

dotenv.config();

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": "/src/" },
  },
  define: {
    "process.env": process.env,
  },
  server: { port: 4021 },
});
