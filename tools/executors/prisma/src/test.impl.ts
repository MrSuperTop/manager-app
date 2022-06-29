import { ExecutorContext } from '@nrwl/devkit';
import jestExecutor from '@nrwl/jest/src/executors/jest/jest.impl';
import path from 'path';
import { exec } from './utils/exec';

export interface PrismaTestExecutorOptions {
  cwd: string,
  schemaPath: string
}

const USE_PROPER_ENV_VARIABLES = 'pnpm dotenv -e .env.test --';

export default async function prismaTextExecutor(
  options: PrismaTestExecutorOptions,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  const projectPath = path.join(context.root, options.cwd);
  const schemaPath = path.join(projectPath, options.schemaPath)

  console.info(`Running tests on ${projectPath}`);

  const command = `${USE_PROPER_ENV_VARIABLES} pnpm prisma migrate deploy --schema ${schemaPath}`.split(' ');

  await exec(
    command[0],
    command.slice(1)
  )

  const result = await jestExecutor(
    {
      verbose: true,
      jestConfig: path.join(options.cwd, 'jest.config.js')
    },
    context
  );

  return {
    success: result.success
  };
}
