import { prisma } from "@/lib/prisma";

export const useGetClerkUser = async (clerkId: string) => {
  try {
    if (!clerkId) {
      throw new Error("Clerk ID is required!");
    }

    const user = await prisma.user.findUnique({
      where: {
        clerkId: clerkId,
      },
    });
    return { user };
  } catch (error) {
    throw new Error("Unable to fetch user with clerkId");
  }
};
