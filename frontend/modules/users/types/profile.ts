import { LinkedProvider } from "./linked-provider";

export interface ProfileInfo {
  username: string;
  email: string;
  avatarUrl: string;
  roles: string[];
  id: string;
  linkedProviders?: LinkedProvider[];
}
