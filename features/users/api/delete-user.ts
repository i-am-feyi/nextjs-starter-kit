import { prisma } from "@/lib/prisma";

export const useDeleteUser = async (clerkId: string) => {
  try {
    const user = await prisma.user.delete({
      where: { clerkId },
    });

    return user;
  } catch (error) {
    throw new Error("Unable to delete user: " + clerkId);
  }
};
