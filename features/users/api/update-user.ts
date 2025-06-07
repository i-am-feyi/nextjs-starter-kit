import { User } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export const useUpdateUser = async (data: Partial<User>) => {
  const { clerkId } = data;

  if (!clerkId) {
    throw new Error("Clerk ID is required!");
  }

  try {
    const user = await prisma.user.update({
      where: { clerkId },
      data,
    });
    return { user };
  } catch (error) {
    throw new Error("Unable to update user: " + clerkId);
  }
};
