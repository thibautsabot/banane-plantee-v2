import { Octokit, RestEndpointMethodTypes } from "@octokit/rest";

import { Body } from "../pages/api/uploadPost";
import fs from "node:fs";
import path from "node:path";

// https://dev.to/lucis/how-to-push-files-programatically-to-a-repository-using-octokit-with-typescript-1nj0
const getCurrentCommit = async (octo: Octokit, branch: string = "main") => {
  let commitSha = "";
  try {
    // Get the ref from the branch if it exists
    const { data: refData } = await octo.git.getRef({
      owner: "thibautsabot",
      repo: "banane-plantee-v2",
      ref: `heads/${branch}`,
    });
    commitSha = refData.object.sha;
  } catch (_) {
    // Create a branch from main if it doesn't exist
    const { data: refData } = await octo.git.getRef({
      owner: "thibautsabot",
      repo: "banane-plantee-v2",
      ref: `heads/main`,
    });
    commitSha = refData.object.sha;

    const ref = await octo.git.createRef({
      owner: "thibautsabot",
      repo: "banane-plantee-v2",
      ref: `refs/heads/${branch}`,
      sha: commitSha,
    });

    commitSha = ref.data.object.sha;
  }

  const { data: commitData } = await octo.git.getCommit({
    owner: "thibautsabot",
    repo: "banane-plantee-v2",
    commit_sha: commitSha,
  });
  return {
    commitSha,
    treeSha: commitData.tree.sha,
  };
};

const getFile = (filePath: string) =>
  fs.readFileSync(filePath, filePath.includes(".mdx") ? "utf8" : "base64");

const createBlobForFile = (octo: Octokit) => async (filePath: string) => {
  const content = await getFile(filePath);
  const blobData = await octo.git.createBlob({
    owner: "thibautsabot",
    repo: "banane-plantee-v2",
    content,
    encoding: filePath.includes(".mdx") ? "utf-8" : "base64",
  });
  return blobData.data;
};

const createNewTree = async (
  octo: Octokit,
  blobs: any[],
  paths: string[],
  parentTreeSha: string
) => {
  const tree = blobs.map(({ sha }, index) => ({
    path: paths[index],
    mode: `100644`,
    type: `blob`,
    sha,
  })) as any[];
  const { data } = await octo.git.createTree({
    owner: "thibautsabot",
    repo: "banane-plantee-v2",
    tree,
    base_tree: parentTreeSha,
  });
  return data;
};

const createNewCommit = async (
  octo: Octokit,
  currentTreeSha: string,
  currentCommitSha: string
) =>
  (
    await octo.git.createCommit({
      owner: "thibautsabot",
      repo: "banane-plantee-v2",
      message: "Update blog post",
      tree: currentTreeSha,
      parents: [currentCommitSha],
    })
  ).data;

const setBranchToCommit = (octo: Octokit, branch: string, commitSha: string) =>
  octo.git.updateRef({
    owner: "thibautsabot",
    repo: "banane-plantee-v2",
    ref: `heads/${branch}`,
    sha: commitSha,
  });

const openPullRequest = async (octokit: Octokit, branch: string) => {
  await octokit.rest.pulls.create({
    owner: "thibautsabot",
    repo: "banane-plantee-v2",
    head: branch,
    title: "New blog post",
    base: "main",
  });
};

const listPullRequests = async (branch?: string) => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const pulls = await octokit.rest.pulls.list({
    owner: "thibautsabot",
    repo: "banane-plantee-v2",
    ...(branch ? { head: `thibautsabot:new-blog-${branch}` } : {}),
  });

  return pulls.data;
};

const mergePullRequest = async (PRNumber: number) => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const pulls = await octokit.rest.pulls.merge({
    owner: "thibautsabot",
    repo: "banane-plantee-v2",
    pull_number: PRNumber,
  });

  return pulls.data;
};

const getPRContent = async (PRNumber: number) => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const pulls = await octokit.rest.pulls.listFiles({
    owner: "thibautsabot",
    repo: "banane-plantee-v2",
    pull_number: PRNumber,
  });

  return pulls.data;
};

const commitBlogPost = async (body: Body, folder: string) => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const branchName = "new-blog-" + body.slug;

  const currentCommit = await getCurrentCommit(octokit, branchName);

  const filesPaths = fs
    .readdirSync(path.join(process.cwd() + `/public/assets/blog/${body.slug}`))
    .map((file) => process.cwd() + `/public/assets/blog/${body.slug}/${file}`);

  filesPaths.push(`${folder}${body.slug}.mdx`);

  const filesBlobs = await Promise.all(
    filesPaths.map(createBlobForFile(octokit))
  );

  const pathsForBlobs = filesPaths.map((fullPath) =>
    path.relative(process.cwd(), fullPath)
  );

  const newTree = await createNewTree(
    octokit,
    filesBlobs,
    pathsForBlobs,
    currentCommit.treeSha
  );

  const newCommit = await createNewCommit(
    octokit,
    newTree.sha,
    currentCommit.commitSha
  );

  await setBranchToCommit(octokit, branchName, newCommit.sha);

  try {
    await openPullRequest(octokit, branchName);
  } catch (e) {
    console.error(e);
  }
};

export { commitBlogPost, listPullRequests, mergePullRequest, getPRContent };
