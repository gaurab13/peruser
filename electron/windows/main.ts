import { BrowserWindow, BrowserView } from 'electron';
import initIpcEventHandlers from '../events/ipcEvents';
import initViewEventHandlers from '../events/viewEvents';
import main from '../app';

export default class Main {
  public window: BrowserWindow | null = null;
  public views: Array<BrowserView> = [];
  public activeView: BrowserView | null = null;

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
    this.window.webContents.openDevTools();
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
    initViewEventHandlers(view);
  }

  public removeBrowserView(clickedIndex:number, newIndex: number) {
    console.log(clickedIndex, newIndex);
    const mainWindow = this.window!;
    const view = this.views[clickedIndex];
    mainWindow.removeBrowserView(view);
    view.destroy();
    this.views.splice(clickedIndex, 1);
    this.setActiveView(newIndex);
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

  public updateViewUrl(url: string) {
    this.activeView!.webContents.loadURL(url);
  }

  public reloadPageView() {
    const url = this.activeView!.webContents.getURL();
    const activeViewId = this.views.indexOf(this.activeView!);
    this.window!.webContents.send('update-omnibar-url', { url, activeViewId });
    this.activeView!.webContents.reload();
  }

  public stopPageViewReload() {
    this.activeView!.webContents.stop();
  }

  public goBacktoPreviousPageView() {
    this.activeView!.webContents.goBack();
  }

  public goForwardtoNextPageView() {
    this.activeView!.webContents.goForward();
  }
}
