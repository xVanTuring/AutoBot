import { getBinaryPath, ProvidedBinary } from "../config/BinaryPath";
import { getConfigPath, ProvidedConfig } from "../config/ConfigPath";
import { getPatchPath, ProvidedPatch } from "../config/PatchPath";
import { applyPatch } from "./GitOps";
import { run } from "./Run";

export function setEnvVersion(
  projectPath: string,
  env: string,
  version: string,
  appVersion: string
) {
  const nodePath = getBinaryPath(ProvidedBinary.NODE);
  return run(
    nodePath,
    ["./scripts/setPackageCfg.js", "--env", env, "--version", version, appVersion],
    projectPath,
    0
  );
}

export function useLocalSdk(projectPath: string) {
  console.log(getPatchPath(ProvidedPatch.UseLocalSdk));
  return applyPatch(projectPath, getPatchPath(ProvidedPatch.UseLocalSdk));
}

export function useModoSdk(projectPath: string) {
  return applyPatch(projectPath, getPatchPath(ProvidedPatch.UseModoSdk));
}

export function buildProject(projectPath: string, platform: "android" | "ios") {
  const configPath = getConfigPath(
    platform === "android" ? ProvidedConfig.ANDROID : ProvidedConfig.IOS
  );
  const ccPath = getBinaryPath(ProvidedBinary.Cocos);
  return run(
    ccPath,
    ["--project", projectPath, "--build", `configPath=${configPath}`],
    projectPath,
    36
  );
}
