export const updateUrl = (url: string[]) => ({
  type: 'UPDATE_URL',
  payload: url,
});

export const updateNavigationState = (
  isLoading: boolean,
  canGoBack: boolean,
  canGoForward: boolean,
  viewId: number,
  url: string,
) => ({
  type: 'UPDATE_NAVIGATION_STATE',
  payload: { isLoading, canGoBack, canGoForward, url, viewId },
});

export const updateFavicon = (tabIndex: number, favicon: string) => ({
  type: 'UPDATE_FAVICON',
  payload: { tabIndex, favicon },
});

export const updateTitle = (tabIndex: number, title: string) => ({
  type: 'UPDATE_TITLE',
  payload: { tabIndex, title },
});
