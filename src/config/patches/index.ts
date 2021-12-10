import { join } from "path";
export enum Patches {
  useLocalSdk = "useLocalSdk.patch",
  useModoSdk = "useModoSdk.patch",
}
export function where(fileName: Patches) {
  return join(__dirname, fileName);
}
