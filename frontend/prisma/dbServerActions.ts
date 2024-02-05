"use server";
import prisma from "./db";

export interface User {
  id: string;
  email: string;
  username: string;
  avatarUrl?: string | null;
  // eslint-disable-next-line no-use-before-define
  linkedProviders?: LinkedProviders[];
}

export interface LinkedProviders {
  id: string;
  user: User;
  userId: string;
  providerUserId: string;
  provider: string;
  linkingDatetime: Date;
}

export async function loginWithOAuth(
  provider: string,
  providerUserId: string,
  email: string,
  username: string,
  avatarUrl: string | null
): Promise<User> {
  // Check if a LinkedProvider entry exists for the given providerUserId
  const existingLinkedProvider = await prisma.linkedProviders.findFirst({
    where: {
      providerUserId,
    },
    include: {
      user: true,
    },
  });

  if (existingLinkedProvider) {
    // If a LinkedProvider entry exists, fetch the associated user
    return existingLinkedProvider.user;
  } else {
    // If no LinkedProvider entry exists, create a new user and LinkedProvider entry
    const newUser = await prisma.user.create({
      data: {
        id: crypto.randomUUID(),
        email,
        username,
        avatarUrl: avatarUrl ? `${provider}:${avatarUrl}` : null,
      },
    });

    const newLinkedProvider = await prisma.linkedProviders.create({
      data: {
        id: crypto.randomUUID(),
        userId: newUser.id,
        providerUserId,
        provider,
        linkingDatetime: new Date(),
      },
      include: {
        user: true,
      },
    });

    return newLinkedProvider.user;
  }
}
