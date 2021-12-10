import { spawn } from "child_process";
import { Promise as BPromise } from "bluebird";
export function run(
  binaryPath: string,
  command: string[],
  cwd: string,
  succesCode?: number
) {
  return new BPromise<number | null>((resolve, reject, onCancel) => {
    const child = spawn(binaryPath, command, {
      cwd: cwd,
    });

    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);

    child.on("exit", (code) => {
      if (succesCode != null && code !== succesCode) {
        console.error(`Program filed with code ${code}`);
        reject(code);
        return;
      }
      console.log(`Program exit with code ${code}`);
      resolve(code);
    });

    if (onCancel != null) {
      onCancel(() => {
        console.log("Called cancel");
        if (process.platform === "win32") {
          if (child.pid != null) {
            spawn("taskkill", ["/pid", String(child.pid), "/f", "/t"]);
          }
        } else {
          child.kill();
        }
      });
    }
  });
}
