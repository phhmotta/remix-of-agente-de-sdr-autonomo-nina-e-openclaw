import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { componentTagger } from "lovable-tagger";

// Vite SPA config. Secrets (GEMINI_API_KEY, ANTHROPIC_API_KEY etc.) NÃO devem
// vazar para o bundle — são lidas dentro das Supabase Edge Functions via
// Deno.env.get(). Apenas chaves publicáveis (VITE_*) entram no frontend.
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
