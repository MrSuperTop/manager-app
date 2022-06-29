import { ExecutorContext } from '@nrwl/devkit';
import { join } from 'path';
import { exec } from './utils/exec';
import { NodeProcessesManager } from './utils/NodeProcessManager';

const joiner = (
  projectPath: string
): (relativePath: string) => string => {
  return (relativePath) => {
    return join(projectPath, relativePath);
  };
}

export interface PrismaTestExecutorOptions {
  cwd: string,
  outDir: string,
  entryPoint: string,
  runDocker?: boolean,
  paths: {
    schema: string,
    dockerCompose: string
  },
  swc: {
    config: string,
    sourceDir: string
  }
}

const manager = new NodeProcessesManager();

export default async function prismaTextExecutor(
  options: PrismaTestExecutorOptions,
  context: ExecutorContext
) {
  const projectPath = join(context.root, options.cwd);
  const projectJoiner = joiner(projectPath);

  console.log(`Serving the project: ${projectPath}`);

  const schemaPath = projectJoiner(options.paths.schema);
  const dockerComposePath = projectJoiner(options.paths.dockerCompose);

  await exec(
    'docker-compose',
    ['-f', dockerComposePath, 'up', '-d', '--remove-orphans']
  );

  const sourceDir = projectJoiner(options.swc.sourceDir);
  const swcConfig = projectJoiner(options.swc.config);

  const outDir = join(context.root, options.outDir);
  const entryPoint = join(outDir, options.entryPoint);

  process.stdin.on('data', data => {
    const command = data.toString().trim();

    switch (command) {
      case 'rs':
        manager.summonNewNode(entryPoint);
    }
  });

  await Promise.all([
    exec(
      `pnpm`,
      ['prisma', 'generate', `--schema=${schemaPath}`, '--watch']
    ),
    exec(
      `pnpm`,
      [
        'swc',
        sourceDir,
        '--out-dir',
        outDir,
        '--watch',
        '--config-file',
        swcConfig,
        '--copy-files',
        '--delete-dir-on-start',
        '--source-maps=true'
      ],
      {
        stdio: 'pipe'
      },
      async (data) => {
        process.stdout.write(data.toString());

        if (!data.toString().includes('ms')) {
          return;
        }

        manager.summonNewNode(entryPoint);
      }
    )
  ])

  return new Promise(() => {});
}
