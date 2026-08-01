import { Octokit } from "@octokit/rest";

export class GitHubManager {
  constructor(authToken) {
    if (!authToken) {
      throw new Error("GitHub Auth Token is required.");
    }
    this.octokit = new Octokit({ auth: authToken });
  }

  // ==========================================
  // 1. READ FILE
  // ==========================================
  async getFile(owner, repo, path, branch = "main") {
    const response = await this.octokit.rest.repos.getContent({
      owner,
      repo,
      path,
      ref: branch,
    });

    if (Array.isArray(response.data)) {
      throw new Error("Path points to a directory, not a file.");
    }

    // GitHub API returns file content encoded in Base64
    const content = Buffer.from(response.data.content, "base64").toString(
      "utf-8",
    );
    return {
      content,
      sha: response.data.sha, // Required for updating/deleting
      size: response.data.size,
      downloadUrl: response.data.download_url,
    };
  }

  // ==========================================
  // 2. CREATE FILE
  // ==========================================
  async createFile(owner, repo, path, content, commitMessage, branch = "main") {
    const encodedContent = Buffer.from(content).toString("base64");

    const response = await this.octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: commitMessage,
      content: encodedContent,
      branch,
    });

    return response.data;
  }

  // ==========================================
  // 3. UPDATE FILE
  // ==========================================
  async updateFile(owner, repo, path, content, commitMessage, branch = "main") {
    // 1. Fetch existing file to retrieve its 'sha'
    const existingFile = await this.getFile(owner, repo, path, branch);

    const encodedContent = Buffer.from(content).toString("base64");

    const response = await this.octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: commitMessage,
      content: encodedContent,
      sha: existingFile.sha, // 'sha' is mandatory for updating existing files
      branch,
    });

    return response.data;
  }

  // ==========================================
  // 4. DELETE FILE
  // ==========================================
  async deleteFile(owner, repo, path, commitMessage, branch = "main") {
    // 1. Fetch existing file to retrieve its 'sha'
    const existingFile = await this.getFile(owner, repo, path, branch);

    const response = await this.octokit.rest.repos.deleteFile({
      owner,
      repo,
      path,
      message: commitMessage,
      sha: existingFile.sha, // 'sha' is mandatory for deletion
      branch,
    });

    return response.data;
  }

  // Existing Issue Method
  async getIssue(owner, repo, issueNumber) {
    const response = await this.octokit.rest.issues.get({
      owner,
      repo,
      issue_number: issueNumber,
    });
    return response.data;
  }
}
