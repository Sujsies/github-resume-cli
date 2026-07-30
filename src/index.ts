import inquirer from "inquirer";
import ora from "ora";
import chalk from "chalk";
import { fetchGitHubData } from "./github.js";
import { renderResume } from "./formatter.js";

async function main() {
  console.log(chalk.bold.magenta("\n📄 Terminal GitHub Resume Generator\n"));

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "username",
      message: "Enter GitHub username:",
      validate: (input: string) => (input.trim() ? true : "Username cannot be empty."),
    },
    {
      type: "password",
      name: "token",
      message: "Enter GitHub Personal Access Token (optional, press Enter to skip):",
      mask: "*",
    },
  ]);

  const spinner = ora(`Fetching profile data for @${answers.username}...`).start();

  try {
    const userData = await fetchGitHubData(answers.username.trim(), answers.token.trim() || undefined);
    spinner.succeed("Data fetched successfully!");
    renderResume(userData);
  } catch (error: any) {
    spinner.fail("Failed to fetch resume data.");
    console.error(chalk.red(`\nError: ${error.message || error}\n`));
  }
}

main();