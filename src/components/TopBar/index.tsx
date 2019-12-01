import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import Navigator from '../Navigator';
import { createBrowserView, setActiveView } from '../../api';
import { initiateRendererEvents } from '../../events';
import OmniBar from '../OmniBar';

interface IProps {
  urls: Array<string>;
  activeTabIndex: number;
  isLoading: Array<boolean>;
  titles: Array<string>;
  favicons: Array<string>;
  canGoBack: boolean;
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
  } = props;

  const createDefaultTabs = () => {
    urls.map((url: string) => {
      createBrowserView(url);
      setActiveView(0);
    });
  };

  const handleTabClick = (tabIndex: number) => {
    console.log(`Clicked tab ${tabIndex}`);
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
            </div>
          );
        })}
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
