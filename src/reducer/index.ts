export const initialState = {
  activeTabIndex: 0,
  urls: ['https://www.google.com'],
};

const appReducer = (state = initialState, action: any) => {
  const newState = JSON.parse(JSON.stringify(state));
  const payload = action.payload;
  switch(action.type) {
    default:
      return state;
  }
}

export default appReducer;
