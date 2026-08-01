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


export class CrudLuny {
  constructor(collectionName) {
    this.collectionName = collectionName;
    this.data = new Map();
  }

  async create(item) {
    const id = Date.now().toString();
    const newItem = { id, ...item };
    this.data.set(id, newItem);
    return newItem;
  }

  async findMany() {
    return Array.from(this.data.values());
  }

  async delete(id) {
    return this.data.delete(id);
  }
}

export class FileLuny {
  constructor(options) {
    this.uploadDir = options.uploadDir || './public/uploads';
  }

  async saveFile({ filename, content }) {
    // File saving logic
    return { filename, path: `${this.uploadDir}/${filename}` };
  }

  async deleteFile(filename) {
    // File deletion logic
    return true;
  }
}