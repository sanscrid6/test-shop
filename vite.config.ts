import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default ({ mode }: { mode: string }) => {
  // Load app-level env vars to node-level env vars.
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    // server: { https: true },
    plugins: [react()],
    // To access env vars here use process.env.TEST_VAR
    define: {
      "process.env": process.env,
    },
  });
};
