import { ensureEnvPath } from "./utils";

const pathdict: Record<ProvidedBinary, string> = {
  git: "git",
  cocos: ensureEnvPath("COCOS_PATH"),
  npm: process.platform === "win32" ? "npm.cmd" : "npm",
  node: "node",
};
export enum ProvidedBinary {
  GIT = "git",
  Cocos = "cocos",
  NPM = "npm",
  NODE = "node",
}

export function getBinaryPath(wanted: ProvidedBinary) {
  return pathdict[wanted];
}
