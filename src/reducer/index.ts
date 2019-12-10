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
    case 'UPDATE_URLS': {
      const { url } = payload;
      newState.urls = [...newState.urls, url];
      newState.titles = [...newState.titles, 'New Tab'];
      newState.favicons = [...newState.favicons, ''];
      newState.isLoading = [...newState.isLoading, true];
      return newState;
    }
    case 'SET_ACTIVE_TAB': {
      newState.activeTabIndex = payload;
      return newState;
    }
    case 'REMOVE_TAB': {
      const { newIndex, clickedIndex } = payload;
      newState.urls.splice(clickedIndex, 1);
      newState.titles.splice(clickedIndex, 1);
      newState.favicons.splice(clickedIndex, 1);
      newState.isLoading.splice(clickedIndex, 1);
      newState.activeTabIndex = newIndex;
      return newState;
    }
    default:
      return state;
  }
}

export default appReducer;
