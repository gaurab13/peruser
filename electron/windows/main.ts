import { BrowserWindow } from 'electron';

export default class Main {
  public window: BrowserWindow | null = null;

  public init = () => {
    this.window = new BrowserWindow({
      webPreferences: {
        nodeIntegration: true
      },
    });

    this.window.maximize();
    this.window.loadURL('http://localhost:3000');
    this.window.on('closed', () => (this.window = null));
  }
}
