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
      newState.urls.splice(viewId, 1, url);
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
      const { tabIndex, title } = payload;
      title.length && newState.titles.splice(tabIndex, 1, title);
      return newState;
    }
    default:
      return state;
  }
}

export default appReducer;
