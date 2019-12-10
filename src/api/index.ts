import { IpcRenderer } from 'electron';

const electron = window.require('electron');
let ipcRenderer: IpcRenderer = electron.ipcRenderer;

export const createBrowserView = (url: string) => {
  ipcRenderer.send('create-browser-view', url);
}

export const setActiveView = (index: number) => {
  ipcRenderer.send('set-active-view', index);
}

export const updateViewUrl = (url: string) => {
  ipcRenderer.send('update-view-url', url);
};

export const reloadPageView = () => {
  ipcRenderer.send('reload-page-view');
};

export const stopPageViewReload = () => {
  ipcRenderer.send('stop-page-view-reload');
};

export const goBacktoPreviousPageView = () => {
  ipcRenderer.send('go-back-to-previous-page-view');
};

export const goForwardtoNextPageView = () => {
  ipcRenderer.send('go-forward-to-next-page-view');
};

export const removeBrowserView = (clickedIndex: number, newIndex: number) => {
  ipcRenderer.send('remove-browser-view', {clickedIndex, newIndex});
}