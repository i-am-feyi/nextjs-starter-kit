import { User } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export const useCreateUser = async (data: User) => {
  try {
    const user = await prisma.user.create({ data });
    return user;
  } catch (error) {
    throw new Error("Unable to create user: " + data.clerkId);
  }
};
