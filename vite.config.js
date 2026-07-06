import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  // Relative base so the gh-pages deploy works whether the site is served
  // from a custom domain root or a repo subpath (routing uses HashRouter).
  base: "./",
  resolve: {
    alias: {
      // Legacy react-reveal API, backed by a local React-18-safe shim.
      "react-reveal": path.resolve(dirname, "src/shims/react-reveal.jsx"),
    },
  },
  // The codebase keeps JSX in .js files (CRA heritage); tell esbuild to
  // parse them as JSX instead of renaming ~50 files.
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
  build: {
    outDir: "build",
  },
});
