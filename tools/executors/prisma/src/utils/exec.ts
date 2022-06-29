import { ChildProcess, spawn, SpawnOptions, SpawnOptionsWithoutStdio } from 'child_process';

export const exec = (
  command: string,
  args: string[] = [],
  options: SpawnOptions | SpawnOptionsWithoutStdio = { stdio: 'inherit' },
  middleware?: (data: Buffer) => void
) => {
  return new Promise<number | ChildProcess>((
    resolve,
    reject
  ) => {
    const childProcess = spawn(command, args, options);

    if (!options.stdio || options.stdio !== 'inherit') {
      childProcess.stdout?.on('data', (data) => {
        if (!middleware) {
          process.stdout.write(`${childProcess.pid}: ${data.toString()}`);
        } else {
          middleware(data);
        }
      });

      childProcess.stderr?.on('data', (data) => {
        console.error(data.toString());
      });
    }

    childProcess.on('exit', (code) => {
      console.log(`Child process (${childProcess.pid}) exited with code ${code?.toString()}`);

      code === 0 ? resolve(code) : reject(code);
    });
  })
}