import { IpcRenderer } from 'electron';
import store from '../store';
import {
  updateNavigationState,
  updateTitle,
  updateUrl,
  updateFavicon,
} from '../action';

const electron = window.require('electron');

let ipcRenderer: IpcRenderer = electron.ipcRenderer;

export const initiateRendererEvents = () => {
  ipcRenderer.on('update-favicon', (event, arg) => {
    const { viewId, favicon } = arg;
    store.dispatch(updateFavicon(viewId, favicon));
  });

  ipcRenderer.on('update-title', (event, arg) => {
    const { viewId, title } = arg;
    store.dispatch(updateTitle(viewId, title));
  });

  ipcRenderer.on('update-navigation-state', (event, arg) => {
    const { isLoading, canGoBack, canGoForward, viewId, url } = arg;
    store.dispatch(updateNavigationState(isLoading, canGoBack, canGoForward, viewId, url));
  });
};

