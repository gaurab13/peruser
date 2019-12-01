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
};

export default initIpcEventHandlers;
