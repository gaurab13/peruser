import { BrowserView } from 'electron';
import main from '../app';

const initViewEventHandlers = (view: BrowserView) => {
  view.webContents.on('did-start-loading', () => {
    updateNavigationState(true, view);
  });

  view.webContents.on('did-finish-load', () => {
    updateNavigationState(false, view);
  });

  view.webContents.on('did-fail-load', () => {
    updateNavigationState(false, view);
  });

  view.webContents.on('did-stop-loading', () => {
    updateNavigationState(false, view);
  });

  view.webContents.on('page-title-updated', (event: any, title: string) => {
    const viewId = main.views.indexOf(view);
    main.window!.webContents.send('update-title', {
      viewId,
      title,
    });
  });

  view.webContents.on('page-favicon-updated', (event: any, icons: Array<String>) => {
    const viewId = main.views.indexOf(view);
    const favicon = icons[0];
    main.window!.webContents.send('update-favicon', { viewId, favicon });
  });
};

const updateNavigationState = (isLoading: boolean, view: BrowserView) => {
  const viewId = main.views.indexOf(view);
  const canGoBack = view.webContents.canGoBack();
  const canGoForward = view.webContents.canGoForward();
  const url = view.webContents.getURL();
  main.window!.webContents.send('update-navigation-state', {
    isLoading,
    canGoBack,
    canGoForward,
    url,
    viewId,
  });
}

export default initViewEventHandlers;
