export const updateNavigationState = (
  isLoading: boolean,
  canGoBack: boolean,
  canGoForward: boolean,
  viewId: number,
) => ({
  type: 'UPDATE_NAVIGATION_STATE',
  payload: { isLoading, canGoBack, canGoForward, viewId },
});

export const updateFavicon = (tabIndex: number, favicon: string) => ({
  type: 'UPDATE_FAVICON',
  payload: { tabIndex, favicon },
});

export const updateTitle = (tabIndex: number, title: string, url: string) => ({
  type: 'UPDATE_TITLE',
  payload: { tabIndex, title, url },
});

export const updateOmniBarURL = (url: string, activeViewId: number) => ({
  type: 'UPDATE_OMNIBAR_URL',
  payload: { url, activeViewId },
});

export const updateUrls = (url: string) => ({
  type: 'UPDATE_URLS',
  payload: url
});

export const setActiveTab = (tabIndex: number) => ({
  type: 'SET_ACTIVE_TAB',
  payload: tabIndex
});

export const removeTab = (clickedIndex: number, newIndex: number) => ({
  type: 'REMOVE_TAB',
  payload: {clickedIndex, newIndex}
});
