import jiti from "jiti";
import { fileURLToPath } from "node:url";

const jitti = jiti(fileURLToPath(import.meta.url));
jitti("./config/env/server.ts");
jitti("./config/env/client.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // typedRoutes: true,
  },
};

export default nextConfig;
