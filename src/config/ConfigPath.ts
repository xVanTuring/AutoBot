import { join } from "path";

const pathdict: Record<ProvidedConfig, string> = {
  IOS: join(__dirname, "buildConfig", "buildConfig_ios.json"),
  ANDROID: join(__dirname, "buildConfig", "buildConfig_android.json"),
};
export enum ProvidedConfig {
  IOS = "IOS",
  ANDROID = "ANDROID",
}
export function getConfigPath(wanted: ProvidedConfig) {
  return pathdict[wanted];
}
