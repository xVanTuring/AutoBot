import { getBinaryPath, ProvidedBinary } from "../config/BinaryPath";
import { run } from "./Run";

export function fetchAll(repoPath: string) {
  const gitPath = getBinaryPath(ProvidedBinary.GIT);
  return run(gitPath, ["fetch", "--all"], repoPath, 0);
}

export function pull(repoPath: string) {
  const gitPath = getBinaryPath(ProvidedBinary.GIT);
  return run(gitPath, ["pull"], repoPath, 0);
}

export function checkout(repoPath: string, target: string) {
  const gitPath = getBinaryPath(ProvidedBinary.GIT);
  return run(gitPath, ["checkout", target], repoPath, 0);
}

export async function resetLocal(repoPath: string) {
  const gitPath = getBinaryPath(ProvidedBinary.GIT);
  await run(gitPath, ["checkout", "."], repoPath, 0);
  await run(gitPath, ["clean", "-f"], repoPath, 0);
}

export function applyPatch(repoPath: string, patchPath: string) {
  const gitPath = getBinaryPath(ProvidedBinary.GIT);
  return run(gitPath, ["apply", patchPath], repoPath, 0);
}
