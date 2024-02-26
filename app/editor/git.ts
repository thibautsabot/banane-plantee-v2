import { Image } from "./editor";
import { Octokit } from "@octokit/rest";

const getLatestCommit = async (octo: Octokit) => {
  let commitSha = "";

  const { data: refData } = await octo.git.getRef({
    owner: "thibautsabot",
    repo: "banane-plantee-v2",
    ref: "heads/main",
  });
  commitSha = refData.object.sha;

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

const createBlobForFile = (octo: Octokit) => async (file: Image) => {
  console.log("Creating blob for file", file);
  const blobData = await octo.git.createBlob({
    owner: "thibautsabot",
    repo: "banane-plantee-v2",
    content: file.content,
    encoding: "base64",
  });
  console.log("Blob created for file", file.name);
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
    mode: "100644",
    type: "blob",
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
      message: "[server-action]: Upload blog images",
      tree: currentTreeSha,
      parents: [currentCommitSha],
    })
  ).data;

const updateMain = (octo: Octokit, commitSha: string) =>
  octo.git.updateRef({
    owner: "thibautsabot",
    repo: "banane-plantee-v2",
    ref: "heads/main",
    sha: commitSha,
  });

const getFilePath = (file: Image) => `public/blog/${file.name}.png`;

const commitPostImages = async (files: Image[]) => {
  const octokit = new Octokit({
    // The token is read client side, but it can only be used in editor mode which is authenticated
    auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
  });

  const currentCommit = await getLatestCommit(octokit);

  const filesBlobs = await Promise.all(
    files.map(createBlobForFile(octokit))
  );
  const pathsForBlobs = files.map((file) => getFilePath(file))

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

  updateMain(
    octokit,
    newCommit.sha
  );
};

export { commitPostImages };
