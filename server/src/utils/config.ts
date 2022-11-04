import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

export const getEnv = () => {
  return process.env.RUNNING_ENV;
};

export const IS_DEV = getEnv() === 'dev';

export const getConfig = () => {
  const environment = getEnv();
  return yaml.load(
    readFileSync(join(process.cwd(), `./global.${environment}.yaml`), 'utf8'),
  ) as Record<string, any>;
};
