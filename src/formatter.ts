import chalk from "chalk";
import { UserProfile } from "./types.js";

export function renderResume(user: UserProfile): void {
  const line = chalk.gray("─".repeat(60));

  console.log("\n" + line);
  
  // Header
  const name = user.name ? chalk.bold.cyan(user.name) : chalk.bold.cyan(user.login);
  const handle = chalk.dim(`(@${user.login})`);
  console.log(`${name} ${handle}`);

  if (user.bio) console.log(chalk.italic.white(user.bio));

  // Contact Info
  const contactParts: string[] = [];
  if (user.location) contactParts.push(`📍 ${user.location}`);
  if (user.company) contactParts.push(`🏢 ${user.company}`);
  if (user.websiteUrl) contactParts.push(`🔗 ${user.websiteUrl}`);
  if (user.email) contactParts.push(`✉️ ${user.email}`);

  if (contactParts.length > 0) {
    console.log("\n" + contactParts.join("  |  "));
  }

  console.log(line);

  // Extract Skills (Languages + Topics across pinned repos)
  const languages = new Set<string>();
  const topics = new Set<string>();

  user.pinnedItems.nodes.forEach((repo) => {
    if (repo.primaryLanguage?.name) languages.add(repo.primaryLanguage.name);
    repo.repositoryTopics.nodes.forEach((t) => topics.add(t.topic.name));
  });

  console.log(chalk.bold.yellow("🛠️  SKILLS & TECHNOLOGIES"));
  console.log(`${chalk.bold("Languages:")} ${Array.from(languages).join(", ") || "N/A"}`);
  console.log(`${chalk.bold("Domains/Topics:")} ${Array.from(topics).join(", ") || "N/A"}`);

  console.log(line);

  // Projects (Pinned Repositories)
  console.log(chalk.bold.green("🚀 PINNED PROJECTS"));
  
  if (user.pinnedItems.nodes.length === 0) {
    console.log(chalk.dim("No pinned repositories found for this user."));
  } else {
    user.pinnedItems.nodes.forEach((repo, idx) => {
      const title = chalk.bold.white(`${idx + 1}. ${repo.name}`);
      const stars = chalk.yellow(`★ ${repo.stargazerCount}`);
      const lang = repo.primaryLanguage?.name ? chalk.magenta(`[${repo.primaryLanguage.name}]`) : "";

      console.log(`\n${title} ${lang}  ${stars}`);
      if (repo.description) {
        console.log(`   ${chalk.gray(repo.description)}`);
      }
      console.log(`   ${chalk.blue.underline(repo.url)}`);
    });
  }

  console.log(line + "\n");
}