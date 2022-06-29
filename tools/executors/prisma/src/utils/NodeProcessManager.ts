import { ChildProcess, spawn } from 'child_process';
import { randomColor } from './randomColor';

export class NodeProcessesManager {
  currentRunning: ChildProcess | null = null;
  color = randomColor();

  coloredId(process: ChildProcess) {
    return `[${this.color(process.pid)}]`
  }

  killCurrentRunning() {
    if (!this.currentRunning) {
      return;
    }

    this.currentRunning.kill();
    console.log(`\nKilling node process ${this.coloredId(this.currentRunning)}`);

    this.color = randomColor();
  }

  summonNewNode(
    entryPointPath: string
  ) {
    const prefix = this.currentRunning ? '' : '\n';

    this.killCurrentRunning();

    const childProcess = spawn(
      `node`,
      [
        entryPointPath
      ],
      { stdio: 'inherit' }
    );

    console.log(`${prefix}Spawned new node process ${this.coloredId(childProcess)}\n`)

    this.currentRunning = childProcess;
  
    return childProcess;
  }
}
