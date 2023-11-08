import gitRev from "git-rev-sync";
import githubUrlFromGit from "github-url-from-git";
import { promisify } from "node:util";
import { exec } from "node:child_process";

const execAsync = promisify(exec);

export function getCommitLink(): string | undefined {
  try {
    const branchName = gitRev.branch();
    const remoteUrl = gitRev.remoteUrl();

    if (!branchName || !remoteUrl) {
      return undefined;
    }

    const githubUrl = githubUrlFromGit(remoteUrl);

    if (!githubUrl) {
      return undefined;
    }

    const commitHash = gitRev.short();

    if (!commitHash) {
      return undefined;
    }

    return `${githubUrl}/tree/${commitHash}`;
  } catch (e) {
    return undefined;
  }
}

export async function getGitUsername() {
  try {
    const { stdout } = await execAsync("git config user.name");
    const username = stdout.trim();
    return username;
  } catch (e) {
    return undefined;
  }
}
