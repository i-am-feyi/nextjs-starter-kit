import { hc } from "hono/client";

import { AppType } from "@/app/api/[[...route]]/route";
import { env } from "@/config/env/client";

export const client = hc<AppType>(env.NEXT_PUBLIC_APP_URL);
