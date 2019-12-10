import { ipcMain } from 'electron';
import main from '../app';

const initIpcEventHandlers = () => {
  ipcMain.on('create-browser-view', (event, arg) => {
    main.createBrowserView(arg);
  });

  ipcMain.on('set-active-view', (event, arg) => {
    main.setActiveView(arg);
  });

  ipcMain.on('update-view-url', (event, arg) => {
    main.updateViewUrl(arg)
  });

  ipcMain.on('reload-page-view', () => {
    main.reloadPageView();
  });

  ipcMain.on('stop-page-view-reload', () => {
    main.stopPageViewReload();
  });

  ipcMain.on('go-back-to-previous-page-view', () => {
    main.goBacktoPreviousPageView();
  });

  ipcMain.on('go-forward-to-next-page-view', () => {
    main.goForwardtoNextPageView();
  });
};

export default initIpcEventHandlers;
