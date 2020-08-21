import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Settings from '/imports/ui/services/settings';
import WebcamDraggable from './webcam-draggable-overlay/component';

import { styles } from './styles';
import {GlobalContext} from "../context/GlobalContext";

const propTypes = {
  children: PropTypes.element.isRequired,
  usersVideo: PropTypes.arrayOf(Array),
  singleWebcam: PropTypes.bool.isRequired,
  hideOverlay: PropTypes.bool,
  swapLayout: PropTypes.bool,
  disableVideo: PropTypes.bool,
  audioModalIsOpen: PropTypes.bool,
  webcamPlacement: PropTypes.string,
};

const defaultProps = {
  usersVideo: [],
  hideOverlay: true,
  swapLayout: false,
  disableVideo: false,
  audioModalIsOpen: false,
  webcamPlacement: 'top',
};


export default class Media extends Component {
  static contextType = GlobalContext;
  constructor(props) {
    super(props);
    this.refContainer = React.createRef();
  }

  componentWillUpdate() {
    window.dispatchEvent(new Event('resize'));
  }

  render() {
    const {
      swapLayout,
      singleWebcam,
      hideOverlay,
      disableVideo,
      children,
      audioModalIsOpen,
      usersVideo,
      webcamPlacement,
    } = this.props;

    const contentClassName = cx({
      [styles.content]: true,
    });

    const overlayClassName = cx({
      [styles.overlay]: true,
      [styles.hideOverlay]: hideOverlay,
      [styles.floatingOverlay]: (webcamPlacement === 'floating'),
    });

    const { viewParticipantsWebcams } = Settings.dataSaving;
    const fullHeight = usersVideo.length < 1 || (webcamPlacement === 'floating') || !viewParticipantsWebcams;

    return (
      <div
        id="container"
        className={cx(styles.container)}
        ref={this.refContainer}
      >
        {
          !this.context.isHideVideo &&
          (<div
              className={!swapLayout ? contentClassName : overlayClassName}
              style={{
                maxHeight: fullHeight ? '100%' : '80%',
                minHeight: '20%',
              }}
           >
            {children}
          </div>
          )
        }
        {usersVideo.length > 0 ? (
          <WebcamDraggable
            refMediaContainer={this.refContainer}
            swapLayout={swapLayout}
            singleWebcam={singleWebcam}
            usersVideoLenght={usersVideo.length}
            hideOverlay={hideOverlay}
            disableVideo={disableVideo}
            audioModalIsOpen={audioModalIsOpen}
            usersVideo={usersVideo}
          />
        ) : null}
      </div>
    );
  }
}

Media.propTypes = propTypes;
Media.defaultProps = defaultProps;
