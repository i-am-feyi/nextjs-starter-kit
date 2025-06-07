import { User } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export const useUpsertUser = async ({
  id,
  clerkId,
  email,
  firstName,
  lastName,
  imageUrl,
  createdAt,
  updatedAt,
}: User) => {
  try {
    const user = await prisma.user.upsert({
      where: { clerkId },
      update: { email, firstName, lastName, imageUrl, updatedAt },
      create: {
        id,
        clerkId,
        email,
        firstName,
        lastName,
        imageUrl,
        createdAt,
        updatedAt,
      },
    });

    return user;
  } catch (error) {
    throw new Error("Unable to upsert user: " + clerkId);
  }
};
