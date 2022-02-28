import path from "path";
import { getHotUpdateDistPath, getRemoteArtifact, getVersion } from "./PackOps";
import { run } from "./Run";
const remoteTempUploadDir = "/tmp/sinonet_upload"
const remoteHostAddress = "lixiaofan@13.229.238.204"
const remoteUnzipDirName = "unzip"
const removeCDNUpdateUploadDir = "~/upload_dir/updates/"
const removeRemoteAssetsUploadDir = "~/upload_dir/remoteAssets/"

export async function uploadHotUpdateArtifact(projectPath: string,
    platform: "android" | "ios") {
    const version = await getVersion(projectPath)
    const filePath = getHotUpdateDistPath(projectPath, platform, version);
    await run("ssh", [
        remoteHostAddress,
        `mkdir -p ${remoteTempUploadDir}`
    ], projectPath)
    await run("scp", [
        filePath,
        `${remoteHostAddress}:${remoteTempUploadDir}`
    ], projectPath)
}

export async function uploadRemoteAssetsArtifact(projectPath: string) {
    const remoteAssetsArt = getRemoteArtifact()
    await run("ssh", [
        remoteHostAddress,
        `mkdir -p ${remoteTempUploadDir}`
    ], projectPath)
    await run("scp", [
        remoteAssetsArt,
        `${remoteHostAddress}:${remoteTempUploadDir}`
    ], projectPath)
}

export async function unzipServerHotUpdateArtifact(projectPath: string,
    platform: "android" | "ios") {
    const version = await getVersion(projectPath)
    const filePath = getHotUpdateDistPath(projectPath, platform, version);
    const remoteZipPath = path.join(remoteTempUploadDir, path.basename(filePath))
    return run("ssh", [
        remoteHostAddress,
        `unzip -q ${remoteZipPath} -d ${path.join(remoteTempUploadDir, remoteUnzipDirName, platform)}`
    ], projectPath)
}

export async function unzipRemoteAssetsArtifact(projectPath: string,) {
    const remoteZipPath = path.join(remoteTempUploadDir, "remote.zip")
    return run("ssh", [
        remoteHostAddress,
        `unzip -q ${remoteZipPath} -d ${path.join(remoteTempUploadDir, remoteUnzipDirName)}`
    ], projectPath)
}

export async function moveHotUpdateAssetsToUpload(projectPath: string,
    platform: "android" | "ios") {
    const version = await getVersion(projectPath)
    const assetsVerionDir = path.join(path.join(remoteTempUploadDir, remoteUnzipDirName, platform), version)
    return run("ssh", [
        remoteHostAddress,
        `mv ${assetsVerionDir} ${path.join(removeCDNUpdateUploadDir, platform)}`
    ], projectPath)
}

export async function copyRemoteAssetsToUpload(projectPath: string,) {
    const remoteDir = path.join(remoteTempUploadDir, remoteUnzipDirName, "remote")
    console.log(`cp -r ${remoteDir} ${removeRemoteAssetsUploadDir}`)
    return run("ssh", [
        remoteHostAddress,
        `cp -r ${remoteDir} ${removeRemoteAssetsUploadDir}`
    ], projectPath)
}