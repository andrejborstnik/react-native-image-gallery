import * as PropTypes from 'prop-types';
import * as React from 'react';
import {Animated, StyleSheet, TouchableOpacity} from 'react-native';

export interface ViewerBackgroundProps {
  readonly opacityProgress: Animated.Value;
  readonly inputRange: number[];
  readonly outputRange: number[];
  readonly theme: any;
  readonly onClose: () => void;
  readonly closeIcon?: any;
}

export class ViewerBackground extends React.PureComponent<ViewerBackgroundProps> {
  static propTypes: object = {
    inputRange: PropTypes.arrayOf(PropTypes.number).isRequired,
    opacityProgress: PropTypes.instanceOf(Animated.Value).isRequired,
    outputRange: PropTypes.arrayOf(PropTypes.number).isRequired,
    theme: PropTypes.object
  };

  static defaultProps: object = {
    theme: {}
  };

  render(): JSX.Element {
    const {
      inputRange,
      opacityProgress,
      outputRange,
      theme,
      onClose,
      closeIcon
    } = this.props;
    const {imageGalleryBgColor = '#000'} = theme;
    const viewStyle = {
      backgroundColor: imageGalleryBgColor,
      opacity: opacityProgress.interpolate({inputRange, outputRange})
    };
    return (
      <Animated.View style={[StyleSheet.absoluteFill, viewStyle]}>
        <TouchableOpacity
          onPress={onClose}
          style={{position: 'absolute', top: 40, left: 20}}
        >
          { closeIcon }
        </TouchableOpacity>
      </Animated.View>
    );
  }
}
