import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import Navigator from '../Navigator';
import { updateUrls, setActiveTab, removeTab } from '../../action';
import { createBrowserView, setActiveView, removeBrowserView } from '../../api';
import { initiateRendererEvents } from '../../events';
import OmniBar from '../OmniBar';

type ActionCreator = (...args: any[]) => void;

interface IProps {
  urls: Array<string>;
  activeTabIndex: number;
  isLoading: Array<boolean>;
  titles: Array<string>;
  favicons: Array<string>;
  canGoBack: boolean;
  dispatch: ActionCreator;
  canGoForward: boolean;
}

export const TopBar: React.FunctionComponent<IProps> = props => {
  const {
    urls,
    activeTabIndex,
    isLoading,
    titles,
    favicons,
    canGoBack,
    canGoForward,
    dispatch,
  } = props;

  const createDefaultTabs = () => {
    urls.map((url: string) => {
      createBrowserView(url);
      setActiveView(0);
    });
  };

  const handleTabClick = (clickedTabIndex: number) => {
    if (clickedTabIndex !== activeTabIndex) {
      props.dispatch(setActiveTab(clickedTabIndex));
      setActiveView(clickedTabIndex);
    }
  };

  const handleCloseTab = (evt: React.MouseEvent, clickedIndex: number) => {
    evt.stopPropagation();
    const totalTabs = urls.length;
    let newActiveTab: number;
    if (totalTabs === 1) {
      return false;
    }
    if ( clickedIndex === activeTabIndex && clickedIndex === totalTabs - 1 ) {
      newActiveTab = clickedIndex - 1;
    } else if( clickedIndex < activeTabIndex ) {
      newActiveTab = activeTabIndex - 1;
    } else {
      newActiveTab = activeTabIndex;
    }
    dispatch(removeTab(clickedIndex, newActiveTab));
    removeBrowserView(clickedIndex, newActiveTab);
  }

  const handleAddTabClick = () => {
    const defaultUrl = 'https://www.google.com';
    const newTabIndex = urls.length;
    dispatch(updateUrls(defaultUrl));
    dispatch(setActiveTab(newTabIndex));
    createBrowserView(defaultUrl);
    setActiveView(newTabIndex);
  }

  useEffect(() => {
    initiateRendererEvents();
    createDefaultTabs(); 
  }, []);

  return (
    <div>
      <div className="d-flex flex-row tab-container">
        <Navigator
          canGoBack={canGoBack}
          canGoForward={canGoForward}
          isLoading={isLoading[activeTabIndex]}
        />
        {urls.map((url, index) => {
          const activeClass = index === activeTabIndex ? 'active' : '';
          return (
            <div
              className={`tab-item ${activeClass}`}
              key={`tab-${index}`}
              onClick={() => handleTabClick(index)}
            >
              <span className="tab-favicons">
                {isLoading[index] ? (
                  <i className="fa fa-circle-o-notch fa-spin"></i>
                ) : (
                  <img src={favicons[index]} alt="" />
                )}
              </span>
              <span className="tab-title">{titles[index]}</span>
              <span className="close-tab" onClick={evt => handleCloseTab(evt, index)}>
                <i className="fa fa-times" />
              </span>
            </div>
          );
        })}
        <div className="add-tab" onClick={handleAddTabClick}>
          <i className="fa fa-plus" />
        </div>
      </div>
      <OmniBar />
    </div>
  );
};

const mapStateToProps = (store: any) => ({
  activeTabIndex: store.activeTabIndex,
  urls: store.urls,
  isLoading: store.isLoading,
  titles: store.titles,
  favicons: store.favicons,
  canGoBack: store.canGoBack,
  canGoForward: store.canGoForward,
});

export default connect(mapStateToProps)(TopBar);
