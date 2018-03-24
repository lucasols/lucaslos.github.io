import React from 'react'; import PropTypes from 'prop-types'; 
import PropTypes from 'prop-types';

class AnimateMount extends React.Component {
  componentWillMount() {
    this.setState({
      show: this.props.mounted,
      useClass: this.props.from,
    });
  }

  componentDidMount() {
    // call the into animiation
    setTimeout(this.mountStyle, 10);
  }

  componentWillReceiveProps(newProps) { // check for the mounted props
    if (newProps.mounted && !this.props.mounted) {
      // remount the node when the mounted prop is true
      this.setState({
        useClass: newProps.from,
        show: true,
        // invert: this.props.invert,
      });

      // call the into animiation
      setTimeout(this.mountStyle, 10);

    // call out animation when mounted prop is false
    } else if (!newProps.mounted && this.props.mounted) {
      this.unMountStyle(newProps);
    }
  }

  unMountStyle = (newProps) => {
    if (this.container) this.setState({
      useClass: newProps.to,
    });
  }

  mountStyle = () => {
    this.setState({
      useClass: this.props.normal,
    });
  }

  transitionEnd = () => {
    // remove the node on transition end when the mounted prop is false
    if (!this.props.mounted) {
      if (this.container) this.setState({
        show: false,
      });
    }
  }

  render() {
    const { containerClass, children } = this.props;

    return (
      this.state.show &&
        <div
          ref={(c) => { this.container = c; }}
          className={`${containerClass} ${this.state.useClass} ${this.state.show ? 'show' : ''}`}
          onTransitionEnd={this.transitionEnd}
        >
          {children}
        </div>
    );
  }
}

AnimateMount.propTypes = {
  mounted: PropTypes.bool.isRequired,
  from: PropTypes.string,
  to: PropTypes.string,
  containerClass: PropTypes.string,
  normal: PropTypes.string,
};

AnimateMount.defaultProps = {
  from: 'anim-from',
  normal: 'normal',
  to: 'anim-from',
  containerClass: '',
};

export default AnimateMount;
