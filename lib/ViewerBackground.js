import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Animated, StyleSheet } from 'react-native';
export class ViewerBackground extends React.PureComponent {
    render() {
        const { inputRange, opacityProgress, outputRange, theme } = this.props;
        const { imageGalleryBgColor = '#000' } = theme;
        const viewStyle = {
            backgroundColor: imageGalleryBgColor,
            opacity: opacityProgress.interpolate({ inputRange, outputRange })
        };
        return React.createElement(Animated.View, { style: [StyleSheet.absoluteFill, viewStyle] });
    }
}
ViewerBackground.propTypes = {
    inputRange: PropTypes.arrayOf(PropTypes.number).isRequired,
    opacityProgress: PropTypes.instanceOf(Animated.Value).isRequired,
    outputRange: PropTypes.arrayOf(PropTypes.number).isRequired,
    theme: PropTypes.object
};
ViewerBackground.defaultProps = {
    theme: {}
};
//# sourceMappingURL=ViewerBackground.js.map