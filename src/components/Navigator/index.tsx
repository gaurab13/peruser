import React, { useEffect } from 'react';
import {reloadPageView, stopPageViewReload, goBacktoPreviousPageView, goForwardtoNextPageView} from '../../api';
import './index.scss';

interface IProps {
  isLoading: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
}

export const Navigator: React.FunctionComponent<IProps> = props => {
  const handlePageviewReload = () => {
    reloadPageView();
  };

  const handleStopPageviewReload = () => {
    stopPageViewReload();
  };

  const handleOnBackClick = () => {
    goBacktoPreviousPageView();
  };

  const handleOnForwardClick = () => {
    goForwardtoNextPageView();
  };

  return (
    <div className="browser-navigator px-1">
      <button
        className={`go-backward ${props.canGoBack ? '' : 'disabled-btn'}`}
        onClick={() => handleOnBackClick()}
        disabled={!props.canGoBack}
      >
        <i className="fa fa-arrow-left" />
      </button>

      <button
        className={`go-forward ${props.canGoForward ? '' : 'disabled-btn'}`}
        onClick={() => handleOnForwardClick()}
        disabled={!props.canGoForward}
      >
        <i className="fa fa-arrow-right" />
      </button>
      {props.isLoading ? (
        <button className="stop-page-reload" onClick={() => handleStopPageviewReload()}>
          <i className="fa fa-times" />
        </button>
      ) : (
        <button className="reload-page" onClick={() => handlePageviewReload()}>
          <i className="fa fa-repeat" />
        </button>
      )}
    </div>
  );
};

export default Navigator;
