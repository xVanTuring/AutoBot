import { JobType, makeJob } from ".";

export const compileTask = (
  branch: string,
  env: string,
  version: string,
  platform: string
) => {
  const base = [
    makeJob(JobType.BUILD_SET_ENV_VERSION, false, [env, version]),
    makeJob(JobType.BUILD_PROJECT, false, [platform]),
  ]
  if (env === "prod") {
    base.push(makeJob(JobType.PACK_GEN_HOT_UPDATE, false, [platform]),)
    base.push(makeJob(JobType.PACK_HOT_UPDATE, false, [platform]),)
    base.push(makeJob(JobType.BUILD_PROJECT, false, [platform]),)
  }
  base.push(makeJob(JobType.PACK_COMPILE_BUNDLE, false, [platform, env]))
  
  if (platform === "android") {
    // base.unshift(makeJob(JobType.GIT_RESET_LOCAL, false, []),
    //   makeJob(JobType.GIT_CHECKOUT, false, [branch]),
    //   makeJob(JobType.GIT_PULL, false, []));
  }
  if (platform === "ios" && env === "prod") {
    base.push(makeJob(JobType.PACK_REMOTE_ASSETS, false, [platform]))
  }
  return base;
};

export const uploadTask = () => {
  const tasks = [
    makeJob(JobType.UPLOAD_REMOTE_ASSETS, false, []),
    // makeJob(JobType.UPLOAD_HOTUPDATE_ARTIFACT, false, ["android"]),
    // makeJob(JobType.UPLOAD_HOTUPDATE_ARTIFACT, false, ["ios"]),

    // makeJob(JobType.UPLOAD_UNZIP_HOT_UPDATE, false, ["android"]),
    // makeJob(JobType.UPLOAD_UNZIP_HOT_UPDATE, false, ["ios"]),

    // makeJob(JobType.UPLOAD_UNZIP_REMOTE_ASSETS, false, []),

    // makeJob(JobType.UPLOAD_MOVE_HOTUPDATE, false, ["ios"]),
    // makeJob(JobType.UPLOAD_MOVE_HOTUPDATE, false, ["android"]),
    // makeJob(JobType.UPLOAD_COPY_REMOTE, false, [])

  ]
  return tasks
}