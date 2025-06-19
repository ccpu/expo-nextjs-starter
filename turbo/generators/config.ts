import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { parse } from "yaml";

// Utility function to convert string to kebab-case
function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2") // camelCase to kebab-case
    .replace(/[\s_]+/g, "-") // spaces and underscores to hyphens
    .replace(/[^a-zA-Z0-9-]/g, "") // remove special characters
    .toLowerCase()
    .replace(/^-+|-+$/g, "") // remove leading/trailing hyphens
    .replace(/-+/g, "-"); // collapse multiple hyphens
}

// Function to get workspace folders from pnpm-workspace.yaml
function getWorkspaceFolders(): string[] {
  try {
    const workspaceContent = readFileSync("pnpm-workspace.yaml", "utf8");
    const workspace = parse(workspaceContent);

    // Extract base folder names from patterns like "apps/*", "packages/*"
    return (workspace.packages as string[])
      .filter((pkg: string) => pkg.endsWith("/*"))
      .map((pkg: string) => pkg.replace("/*", ""))
      .sort();
  } catch (error) {
    console.warn("Could not read pnpm-workspace.yaml, using default folders");
    return ["packages", "apps", "tooling", "api"];
  }
}

// @ts-ignore
module.exports = function generator(plop: any) {
  const workspaceFolders = getWorkspaceFolders();

  plop.setGenerator("init", {
    description: "Generate a new monorepo package",
    prompts: [
      {
        type: "list",
        name: "workspace",
        message: "Select workspace folder:",
        choices: workspaceFolders,
        default: "packages",
      },
      {
        type: "input",
        name: "name",
        message: "Package name:",
        validate: (input: string) =>
          input && input.trim().length > 0 ? true : "Required",
        filter: (input: string) => toKebabCase(input.replace(/^@[^/]+\//, "")),
      },
      {
        type: "input",
        name: "deps",
        message: "Dependencies (space separated, optional):",
        default: "",
      },
    ],
    actions: [
      (answers: { name?: string; workspace?: string }) => {
        if (answers.name) {
          const kebabName = toKebabCase(answers.name);
          answers.name = kebabName.replace(/^@[^/]+\//, "");
        }
        return "Config sanitized";
      },
      {
        type: "add",
        path: "{{ workspace }}/{{ name }}/eslint.config.js",
        templateFile: "templates/eslint.config.js.hbs",
      },
      {
        type: "add",
        path: "{{ workspace }}/{{ name }}/package.json",
        templateFile: "templates/package.json.hbs",
      },
      {
        type: "add",
        path: "{{ workspace }}/{{ name }}/tsconfig.json",
        templateFile: "templates/tsconfig.json.hbs",
      },
      {
        type: "add",
        path: "{{ workspace }}/{{ name }}/src/index.ts",
        template: "export const name = '{{ name }}';",
      },
      {
        type: "modify",
        path: "{{ workspace }}/{{ name }}/package.json",
        async transform(content: string, answers: { deps?: string }) {
          if (answers.deps && answers.deps.trim()) {
            const pkg = JSON.parse(content);
            for (const dep of answers.deps.split(" ").filter(Boolean)) {
              try {
                const res = await fetch(
                  `https://registry.npmjs.org/-/package/${dep}/dist-tags`,
                );
                const json = (await res.json()) as any;
                const version = json.latest;
                pkg.dependencies = pkg.dependencies || {};
                pkg.dependencies[dep] = `^${version}`;
              } catch {
                console.warn(`Failed to fetch version for ${dep}, skipping...`);
              }
            }
            return JSON.stringify(pkg, null, 2);
          }
          return content;
        },
      },
      async (answers: { name?: string; workspace?: string }) => {
        if (answers.name && answers.workspace) {
          try {
            execSync("pnpm i", { stdio: "inherit" });
            execSync(
              `pnpm prettier --write ${answers.workspace}/${answers.name}/** --list-different`,
              { stdio: "inherit" },
            );
            return `Package '${answers.name}' created in '${answers.workspace}'!`;
          } catch {
            console.warn("Failed to install dependencies or format files");
            return `Package '${answers.name}' created in '${answers.workspace}' (with warnings)`;
          }
        }
        return "Package not scaffolded";
      },
    ],
  });
};
