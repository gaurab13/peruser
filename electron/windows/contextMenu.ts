import { Menu, MenuItem, BrowserWindow, BrowserView, clipboard } from 'electron';
import main from '../app';

// Base class for context menus that will be displayed in our app.
// Use this class to store/extend all the common methods and attributes
// relevant to context menus
class BaseContextMenu {
  // Context menu templates
  protected textInputContextMenu: Menu;

  protected cmdOrCtrlA: string;
  protected cmdOrCtrlC: string;

  constructor() {
    this.cmdOrCtrlA = 'CmdOrCtrl+A';
    this.cmdOrCtrlC = 'CmdOrCtrl+C';

    // Note: When we add context menus, accelerators are not assigned to it.
    // So, let's assign the accelerators for the standard context menu items
    this.textInputContextMenu = Menu.buildFromTemplate([
      {
        role: 'undo',
        accelerator: 'CmdOrCtrl+Z',
      },
      {
        role: 'redo',
        accelerator: 'CmdOrCtrl+Shift+Z',
      },
      {
        type: 'separator',
      },
      {
        role: 'cut',
        accelerator: 'CmdOrCtrl+X',
      },
      {
        role: 'copy',
        accelerator: this.cmdOrCtrlC,
      },
      {
        role: 'paste',
        accelerator: 'CmdOrCtrl+V',
      },
      {
        type: 'separator',
      },
      {
        role: 'selectAll',
        accelerator: this.cmdOrCtrlA,
      },
    ]);
  }
}

export class MainWindowContextMenu extends BaseContextMenu {
  constructor(browserWindow: BrowserWindow) {
    super();

    // Callback invoked when displaying context menu for the web contents of the main window
    browserWindow.webContents.on('context-menu', (e, props) => {
      const { isEditable } = props;
      if (isEditable) {
        this.textInputContextMenu.popup();
      }
    });
  }
}

export class RenderProcessContextMenu extends BaseContextMenu {
  // Context menu templates
  protected canvasContextMenu: Menu;
  protected selectionContextMenu: Menu;
  protected linkContextMenu: Menu;

  // Context menu Ids
  protected backContextMenuIdLabel: string;
  protected forwardContextMenuLabel: string;

  protected linkToURL: string;

  constructor(browserView: BrowserView) {
    super();

    this.backContextMenuIdLabel = 'Back';
    this.forwardContextMenuLabel = 'Forward';

    this.linkToURL = '';

    // Context menus to display when right clicked on a canvas
    this.canvasContextMenu = Menu.buildFromTemplate([
      {
        id: this.backContextMenuIdLabel,
        label: this.backContextMenuIdLabel,
        enabled: false,
        click: (menuItem: MenuItem, browserWindow: BrowserWindow, event: Event) => {
          browserView.webContents.goBack();
        },
      },
      {
        id: this.forwardContextMenuLabel,
        label: this.forwardContextMenuLabel,
        enabled: false,
        click: (menuItem: MenuItem, browserWindow: BrowserWindow, event: Event) => {
          browserView.webContents.goForward();
        },
      },
      {
        id: '3',
        role: 'reload',
        accelerator: 'CmdOrCtrl+R',
        click: (menuItem: MenuItem, browserWindow: BrowserWindow, event: Event) => {
          browserView.webContents.reload();
        },
      },
      {
        type: 'separator',
      },
      {
        role: 'selectAll',
        accelerator: this.cmdOrCtrlA,
      },
    ]);

    this.selectionContextMenu = Menu.buildFromTemplate([
      {
        role: 'copy',
        accelerator: this.cmdOrCtrlC,
      },
      {
        type: 'separator',
      },
      {
        role: 'selectAll',
        accelerator: this.cmdOrCtrlA,
      },
    ]);

    this.linkContextMenu = Menu.buildFromTemplate([
      {
        id: '1',
        label: 'Open Link in New Tab',
        click: () => {
          main.createBrowserView(this.linkToURL);
          main.window!.webContents.send('update-urls', this.linkToURL);
        },
      },
      {
        type: 'separator',
      },
      {
        id: '2',
        label: 'Copy Link Address',
        click: () => {
          clipboard.writeText(this.linkToURL);
        },
      },
    ]);

    // Callback invoked when displaying context menu for the web contents of this render process
    browserView.webContents.on('context-menu', (event, props) => {
      const { selectionText, isEditable, linkText, linkURL, titleText } = props;
      if (isEditable) {
        this.textInputContextMenu.popup();
      } else if ((selectionText && selectionText.trim() !== '' && linkURL) || linkURL) {
        this.linkToURL = linkURL;
        this.linkContextMenu.popup();
      } else if (selectionText && selectionText.trim() !== '') {
        this.selectionContextMenu.popup();
      } else {
        this.onCanvasContextMenu(browserView);
      }
    });
  }

  // For displaying canvas's context menu
  public onCanvasContextMenu(browserView: BrowserView): void {
    this.canvasContextMenu.getMenuItemById(
      this.backContextMenuIdLabel,
    )!.enabled = browserView.webContents.canGoBack();
    this.canvasContextMenu.getMenuItemById(
      this.forwardContextMenuLabel,
    )!.enabled = browserView.webContents.canGoForward();
    this.canvasContextMenu.popup();
  }
}
