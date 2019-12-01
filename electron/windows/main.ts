import { BrowserWindow, BrowserView } from 'electron';
import initIpcEventHandlers from '../events/ipcEvents';
import initViewEventHandlers from '../events/viewEvents';

export default class Main {
  public window: BrowserWindow | null = null;
  public views: Array<BrowserView> = [];
  protected activeView: BrowserView | null = null;

  public init = () => {
    this.window = new BrowserWindow({
      webPreferences: {
        nodeIntegration: true
      },
    });

    this.window.maximize();
    this.window.loadURL('http://localhost:3000');
    this.window.on('closed', () => (this.window = null));
    initIpcEventHandlers();
  }

  public createBrowserView(url: string) {
    let view = new BrowserView({
      webPreferences: {
        webSecurity: true,
        nodeIntegration: false,
        sandbox: true,
        devTools: true,
        enableRemoteModule: false,
        contextIsolation: true,
      },
    });

    view.webContents.loadURL(url);
    this.views.push(view);
    this.window!.webContents.openDevTools();
    initViewEventHandlers(view);
  }

  public setActiveView(activeIndex: number) {
    const { height, width } = this.window!.getContentBounds();
    const activeView = this.views[activeIndex];
    this.activeView = activeView;
    this.window!.setBrowserView(activeView);
    activeView.setBounds({
      x: 0,
      y: 68,
      width: width,
      height: height - 68,
    });
  }
}
