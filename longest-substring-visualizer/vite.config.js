import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/longest-substring-visualizer/",  // 请替换成你的GitHub仓库名，末尾斜杠必须
  plugins: [react()],
});
