import { GitHubManager } from "./index.js";

describe("GitHubManager SDK", () => {
  test("should throw an error if no auth token is provided", () => {
    expect(() => new GitHubManager()).toThrow("GitHub Auth Token is required.");
  });

  test("should create an instance successfully with a token", () => {
    const manager = new GitHubManager("fake_token_123");
    expect(manager).toBeDefined();
    expect(manager.octokit).toBeDefined();
  });
});