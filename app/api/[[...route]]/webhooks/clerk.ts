import { revalidatePath } from "next/cache";

import { WebhookEvent } from "@clerk/backend";
import { createId } from "@paralleldrive/cuid2";
import type { User } from "@prisma/client";
import { Hono } from "hono";
import { Webhook } from "svix";

import { env } from "@/config/env/server";
import { useDeleteUser } from "@/features/users/api/delete-user";
import { useUpsertUser } from "@/features/users/api/upsert-user";

// import {
//   createUser,
//   deleteUser,
//   getUserByClerkId,
//   updateUser,
// } from "@/features/users/api/actions";

const app = new Hono().post("/", async (c) => {
  const clerkSigningSecret = env.CLERK_WEBHOOK_SECRET;

  if (!clerkSigningSecret)
    return c.json({ error: "Signing secret required to verify request!" }, 500);

  const wh = new Webhook(clerkSigningSecret);

  // Get headers
  const svix_id = c.req.header("svix-id");
  const svix_timestamp = c.req.header("svix-timestamp");
  const svix_signature = c.req.header("svix-signature");

  // Check if headers exist
  if (!svix_id || !svix_timestamp || !svix_signature)
    return c.json({ error: "Unauthorized!" }, 400);

  // Check the payload and stringify it
  const payload = await c.req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return c.json({ error: "Could not verify webhook" }, 400);
  }

  const eventType = evt.type;

  switch (eventType) {
    case "user.created":
    case "user.updated": {
      const {
        id,
        email_addresses,
        first_name,
        last_name,
        image_url,
        created_at,
        updated_at,
      } = evt.data;

      const email = email_addresses[0].email_address;

      const user: User = {
        id: createId(),
        clerkId: id,
        email: email,
        firstName: first_name!,
        lastName: last_name!,
        imageUrl: image_url,
        createdAt: new Date(created_at),
        updatedAt: new Date(updated_at),
      };

      try {
        await useUpsertUser(user);

        revalidatePath("/");
        return c.json({ success: "User updated successfully!" }, 200);
      } catch (error) {
        console.log(
          "[[WEBHOOK_UPSERT_USER_ERROR]]: Unable to add user to DB.",
          error
        );
        return c.json({ error: "Unable to add user to DB." }, 500);
      }
    }
    case "user.deleted": {
      const { id } = evt.data;

      try {
        await useDeleteUser(id!);

        return c.json({ success: "User deleted successfully!" }, 200);
      } catch (error) {
        console.log(error);
        return c.json({ error: "Unable to delete user from DB." }, 500);
      }
    }

    default: {
      console.log("Clerk webhook event not supported", eventType);
    }
  }
  return c.json({ success: "Webhook received successfully!" }, 200);
});

export default app;
