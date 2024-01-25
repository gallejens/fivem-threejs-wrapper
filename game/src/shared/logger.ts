type Level = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';

export class Logger {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  private log(level: Level, ...args: string[]) {
    console.log(`[${this.name}] (${level}) ${args.join(' ')}`);
  }

  public info(...args: string[]) {
    this.log('INFO', ...args);
  }

  public warn(...args: string[]) {
    this.log('WARN', ...args);
  }

  public error(...args: string[]) {
    this.log('ERROR', ...args);
  }

  public debug(...args: string[]) {
    this.log('DEBUG', ...args);
  }
}
