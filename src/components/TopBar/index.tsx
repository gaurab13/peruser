import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './index.scss';

type ActionCreator = (...args: any[]) => void;

interface IProps {
  urls: Array<string>;
  activeTabIndex: number;
}

export const TopBar: React.FunctionComponent<IProps> = props => {
  const {
    urls,
    activeTabIndex,
  } = props;

  const createDefaultTabs = () => {
    urls.map((url: string) => {
      console.log('url')
    });
  };

  const handleTabClick = (tabIndex: number) => {
    console.log(`Clicked tab ${tabIndex}`);
  }

  useEffect(() => {
    createDefaultTabs();
  }, [0]);

  return (
    <div>
      <div className="d-flex flex-row tab-container">
        {urls.map((url, index) => {
          const activeClass = index === activeTabIndex ? 'active' : '';
          return (
            <div
              className={`tab-item ${activeClass}`}
              key={`tab-${index}`}
              onClick={() => handleTabClick(index)}
            >
              Tab
            </div>
          );
        })}
      </div>
      <div className="omni-bar d-flex flex-row">
        <input
          type="text"
          className="form-control"
          value={'url'}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (store: any) => ({
  activeTabIndex: store.activeTabIndex,
  urls: store.urls,
});

export default connect(mapStateToProps)(TopBar);
