export const initialState = {
  activeTabIndex: 0,
  urls: ['https://www.google.com'],
  favicons: [''],
  titles: ['New Tab'],
  isLoading: [true],
  canGoBack: false,
  canGoForward: false,
};

const appReducer = (state = initialState, action: any) => {
  const newState = JSON.parse(JSON.stringify(state));
  const payload = action.payload;
  switch (action.type) {
    case 'UPDATE_NAVIGATION_STATE': {
      const { isLoading, canGoBack, canGoForward, viewId, url } = payload;
      newState.isLoading.splice(viewId, 1, isLoading);
      newState.canGoBack = canGoBack;
      newState.canGoForward = canGoForward;
      return newState;
    }
    case 'UPDATE_FAVICON': {
      const { tabIndex, favicon } = payload;
      favicon.length && newState.favicons.splice(tabIndex, 1, favicon);
      return newState;
    }
    case 'UPDATE_TITLE': {
      const { tabIndex, title, url } = payload;
      newState.urls.splice(tabIndex, 1, url);
      title.length && newState.titles.splice(tabIndex, 1, title);
      return newState;
    }
    case 'UPDATE_OMNIBAR_URL': {
      const { url: value, activeViewId } = payload;
      newState.urls.splice(activeViewId, 1, value);
      return newState;
    }
    default:
      return state;
  }
}

export default appReducer;
