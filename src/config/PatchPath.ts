import { Patches, where } from "./patches";

const pathdict: Record<ProvidedPatch, string> = {
  UseLocalSdk: where(Patches.useLocalSdk),
  UseModoSdk: where(Patches.useModoSdk),
};
export enum ProvidedPatch {
  UseLocalSdk = "UseLocalSdk",
  UseModoSdk = "UseModoSdk",
}
export function getPatchPath(wanted: ProvidedPatch) {
  return pathdict[wanted];
}
