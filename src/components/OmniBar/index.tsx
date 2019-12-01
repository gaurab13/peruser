import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import { updateViewUrl } from '../../api';
import { updateOmniBarURL } from '../../action';
type ActionCreator = (...args: any[]) => void;

interface IProps {
  urls: Array<string>;
  activeTabIndex: number;
  dispatch: ActionCreator;
}

const OmniBar: React.FunctionComponent<IProps> = props => {
  const {
    urls,
    activeTabIndex,
  } = props;

  const handleOmniBarChange = (evt: React.FormEvent) => {
    const target = evt.target as HTMLInputElement;
    const { value } = target;
    props.dispatch(updateOmniBarURL(value, activeTabIndex));
  };

  const handleOmniBarClick = (event: React.FormEvent) => {
    const target = event.target as HTMLInputElement;
    target.select();
  };

  const handleOmniBarEnter = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    const target = evt.target as HTMLInputElement;
    let { value } = target;
    if (evt.which === 13) {
      if (value.indexOf('.com') > 0 || value.indexOf('.app') > 0) {
        const https = value.slice(0, 8).toLowerCase();
        if (https !== 'https://') {
          value = `http://${value}`;
        }
        updateViewUrl(value);
      } else if (value.indexOf('127.0.0.1') > -1 || value.indexOf('localhost') > -1) {
        const url = value.indexOf('http://') > -1 ? value : `http://${value}`;
        updateViewUrl(url);
      } else {
        updateViewUrl(`https://www.google.com.np/search?q=${value}`);
      }
    }
  };

  return (
    <div className="omni-bar d-flex flex-row">
      <input
        type="text"
        className="form-control"
        value={urls[activeTabIndex]}
        onChange={handleOmniBarChange}
        onKeyPress={handleOmniBarEnter}
        onClick={handleOmniBarClick}
      />
    </div>
  );
};

const mapStateToProps = (store: any) => ({
  activeTabIndex: store.activeTabIndex,
  urls: store.urls,
});

export default connect(mapStateToProps)(OmniBar);
