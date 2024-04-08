import { LinkedProvider } from "./linked-provider";

export interface ProfileInfo {
  username: string;
  email: string;
  avatar: string;
  roles: string[];
  id: string;
  linkedProviders?: LinkedProvider[];
}
