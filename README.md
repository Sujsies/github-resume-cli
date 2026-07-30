# 📄 Terminal-Based GitHub Resume Generator

A lightweight, developer-friendly CLI tool built with TypeScript and Node.js that fetches a user's GitHub profile data via the GitHub API and renders a clean, formatted resume directly in the terminal.

---

## 🌟 Key Features

* **Pinned Repositories as Featured Projects:** Automatically queries and displays pinned repositories along with star counts, descriptions, and primary languages.
* **Skill Extraction:** Dynamically synthesizes top programming languages and repository topics from projects into a core skills section.
* **GraphQL Integration:** Uses GitHub's GraphQL API to fetch user bio, stats, contact details, and pinned projects in a single network request.
* **Fallback Support:** Gracefully handles accounts without pinned repositories or missing public information.
* **Interactive Terminal UI:** Built with `inquirer` for smooth prompts and `chalk` for styled, scannable terminal output.

---

## 🛠️ Tech Stack & Dependencies

* **Language:** TypeScript / Node.js (ES Modules)
* **API Client:** `@octokit/graphql`
* **CLI Styling & UI:** `chalk`, `inquirer`, `ora`
* **Execution:** `tsx`

---

## 🚀 Setup & Installation Guide

### Prerequisites
* **Node.js** (v18 or higher recommended)
* **npm** (comes with Node.js)

### 1. Clone or Open the Repository
```bash
git clone [https://github.com/Sujsies/github-resume-cli.git](https://github.com/Sujsies/github-resume-cli.git)
cd github-resume-cli
