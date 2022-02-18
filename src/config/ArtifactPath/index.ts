import { join } from "path";
import { ensureEnvPath } from "../utils";
import dayjs from "dayjs";

export function getBuildPath(projectPath: string, platform: "android" | "ios") {
  return join(projectPath, "build", platform);
}
export function getRemoteAssetsPath(projectPath: string,
  platform: "android" | "ios",) {
  return join(getBuildPath(projectPath, platform), "remote")
}

export function getHotUpdatePath(
  projectPath: string,
  platform: "android" | "ios",
  version: string
) {
  return join(projectPath, "r-assets", platform, version);
}

const pathdict: Record<ProvidedDist, string> = {
  HotUpdate: ensureEnvPath("HOT_UPDATE_DIST"),
  CompileBundle: ensureEnvPath("COMPILE_BUNDLE_DIST"),
  Remote: ensureEnvPath("REMOTE_ASSETS_DIST"),
};
export enum ProvidedDist {
  HotUpdate = "HotUpdate",
  CompileBundle = "CompileBundle",
  Remote = "Remote"
}
export function getDistPath(wanted: ProvidedDist, random = false) {
  if (random) {
    return join(pathdict[wanted], dayjs().format("YYYY-MM-DD-HH"));
  }
  return pathdict[wanted];
}
