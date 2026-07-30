import { graphql } from "@octokit/graphql";
import { UserProfile } from "./types.js";

const GRAPHQL_QUERY = `
  query getProfileAndPinned($username: String!) {
    user(login: $username) {
      name
      login
      bio
      location
      company
      email
      websiteUrl
      twitterUsername
      avatarUrl
      followers {
        totalCount
      }
      repositories(ownerAffiliations: OWNER) {
        totalCount
      }
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            url
            stargazerCount
            forkCount
            primaryLanguage {
              name
            }
            repositoryTopics(first: 5) {
              nodes {
                topic {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

export async function fetchGitHubData(username: string, token?: string): Promise<UserProfile> {
  const graphqlWithAuth = graphql.defaults({
    headers: {
      authorization: token ? `token ${token}` : undefined,
    },
  });

  const response = await graphqlWithAuth<{ user: UserProfile }>(GRAPHQL_QUERY, {
    username,
  });

  if (!response.user) {
    throw new Error(`User "${username}" not found on GitHub.`);
  }

  return response.user;
}