import gitRev from "git-rev-sync";
import githubUrlFromGit from "github-url-from-git";

export function getCommitLink(): string | undefined {
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
  }