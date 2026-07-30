export interface PinnedRepo {
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: {
    name: string;
  } | null;
  repositoryTopics: {
    nodes: Array<{
      topic: {
        name: string;
      };
    }>;
  };
}

export interface UserProfile {
  name: string | null;
  login: string;
  bio: string | null;
  location: string | null;
  company: string | null;
  email: string;
  websiteUrl: string | null;
  twitterUsername: string | null;
  avatarUrl: string;
  followers: { totalCount: number };
  repositories: { totalCount: number };
  pinnedItems: {
    nodes: PinnedRepo[];
  };
}