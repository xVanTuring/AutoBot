import path, { basename, join } from "path";
import archiver from "archiver";
import {
  getBuildPath,
  getDistPath,
  getHotUpdatePath,
  ProvidedDist,
} from "../config/ArtifactPath";
import { getBinaryPath, ProvidedBinary } from "../config/BinaryPath";
import { run } from "./Run";
import { createWriteStream } from "fs";
import { ensureDir, readFile } from "fs-extra";

export async function generateHotUpdate(
  projectPath: string,
  platform: "android" | "ios"
) {
  const npmPath = getBinaryPath(ProvidedBinary.NPM);
  if (platform === "android") {
    await run(npmPath, ["run", "genAndroidUpdate"], projectPath, 0);
  } else {
    await run(npmPath, ["run", "genIosUpdate"], projectPath, 0);
  }
}

export async function packCompileBundle(
  projectPath: string,
  platform: "android" | "ios",
  suffix = "prod"
) {
  const buildPath = getBuildPath(projectPath, platform);
  const version = await getVersion(projectPath);
  const artifactName = `${platform}-v${version}-${suffix}-compile.zip`;

  const compileBundleDir = getDistPath(ProvidedDist.CompileBundle, false);
  await ensureDir(compileBundleDir);
  const artifactPath = path.join(compileBundleDir, artifactName);

  const output = createWriteStream(artifactPath);
  const archive = archiver("zip");
  archive.pipe(output);
  if (platform === "android") {
    const assetsDir = join(buildPath, "assets");
    archive.directory(assetsDir, "assets");
  } else {
    const assetsDir = join(buildPath, "assets");
    archive.directory(assetsDir, "assets");
    const projDir = join(buildPath, "proj");
    archive.directory(projDir, "proj");

    archive.file("cocos.compile.config.json", {
      name: "cocos.compile.config.json",
    });
  }

  let wait = new Promise((resolve, reject) => {
    archive.on("finish", () => {
      resolve(null);
    });
    archive.on("error", (err) => {
      reject(err);
    });
  });

  archive.finalize();
  await wait;
  return artifactPath;
}

export async function packHotUpdateArtifact(
  projectPath: string,
  platform: "android" | "ios"
) {
  const version = await getVersion(projectPath);
  const hotPath = getHotUpdatePath(projectPath, platform, version);
  const hotUpdateDistDir = getDistPath(ProvidedDist.HotUpdate, false);
  await ensureDir(hotUpdateDistDir);
  const artifactPath = path.join(
    hotUpdateDistDir,
    `${platform}-v${version}-hotupdate.zip`
  );
  const output = createWriteStream(artifactPath);
  const archive = archiver("zip");
  archive.pipe(output);
  archive.directory(hotPath, basename(hotPath));

  let wait = new Promise((resolve, reject) => {
    archive.on("finish", () => {
      resolve(null);
    });
    archive.on("error", (err) => {
      reject(err);
    });
  });
  archive.finalize();
  await wait;
  return artifactPath;
}

async function getVersion(projectPath: string) {
  let version = "";
  const versionFilePath = path.join(projectPath, "/assets/scripts/Version.ts");
  const versionFileContent = await readFile(versionFilePath, "utf-8");
  const currentVersionMatch = versionFileContent.match(/version = '(.+)';/);
  if (currentVersionMatch != null && currentVersionMatch[1] != null)
    version = currentVersionMatch[1];
  if (version == null || version === "") {
    throw new Error("No Version was detected");
  }
  return version;
}
