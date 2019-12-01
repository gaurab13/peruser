import { IpcRenderer } from 'electron';

const electron = window.require('electron');
let ipcRenderer: IpcRenderer = electron.ipcRenderer;

export const createBrowserView = (url: string) => {
  ipcRenderer.send('create-browser-view', url);
}

export const setActiveView = (index: number) => {
  ipcRenderer.send('set-active-view', index);
}