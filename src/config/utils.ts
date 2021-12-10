export function ensureEnvPath(varName: string) {
  const value = process.env[varName];
  if (value != null) {
    return value;
  }
  throw new Error(`Required Path ${varName} is not Founded`);
}
