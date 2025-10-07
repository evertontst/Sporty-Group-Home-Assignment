## Environment Variables

Before running the project, create a `.env` file in the root directory with the following variables:

```env
NUXT_PUBLIC_ALL_LEAGUES_API=https://www.thesportsdb.com/api/v1/json/3/all_leagues.php
NUXT_PUBLIC_BADGE_LOOKUP_API=https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php
```
These variables configure the API endpoints for fetching sports leagues data and badge lookups from TheSportsDB.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```
## AI Tools Used

This project was developed with assistance from **Claude Code** (Anthropic's official CLI for Claude). Below is a summary of how it was used:

### Tools & Usage

- **Claude Code CLI**: Used throughout development for code generation, debugging, and implementation assistance

### How Claude Code Helped

1. **Project Setup & Configuration**
   - Environment variable setup for API keys
   - TypeScript configuration

2. **Feature Implementation**
   - Component structure and composition
   - Responsive UI layout implementation

3. **Code Quality & Debugging**
   - Type error fixes and TypeScript improvements

4. **UI/UX Development**
   - Component design and styling
   - Tailwind utility class implementation
   - Responsive design patterns