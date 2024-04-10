export const rawAvatarToProfileImgUrl = (rawAvatar: string | undefined) => {
  if (!rawAvatar) {
    return rawAvatar;
  }

  const rawAvatarLower = rawAvatar.toLowerCase();

  if (rawAvatarLower.startsWith("discord:")) {
    const avatarUser = rawAvatar.substring(8);
    return `https://cdn.discordapp.com/avatars/${avatarUser}/${avatarUser}`;
  } else if (rawAvatarLower.startsWith("github:")) {
    const avatarUser = rawAvatar.substring(7);
    return avatarUser;
  } else if (rawAvatarLower.startsWith("link:")) {
    return rawAvatar.substring(5);
  }

  return rawAvatar;
};
