export function getProjectPath() {
  if (process.env["REPO_PATH"] == null || process.env["REPO_PATH"] === "") {
    throw new Error("`REPO_PATH` required is not provided");
  }
  return process.env["REPO_PATH"];
}
