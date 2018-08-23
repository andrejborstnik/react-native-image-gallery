import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';
export class ViewerBackground extends React.PureComponent {
    render() {
        const { inputRange, opacityProgress, outputRange, theme, onClose, closeIcon } = this.props;
        const { imageGalleryBgColor = '#000' } = theme;
        const viewStyle = {
            backgroundColor: imageGalleryBgColor,
            opacity: opacityProgress.interpolate({ inputRange, outputRange })
        };
        return (React.createElement(Animated.View, { style: [StyleSheet.absoluteFill, viewStyle] },
            React.createElement(TouchableOpacity, { onPress: onClose, style: { position: 'absolute', top: 40, left: 20 } }, closeIcon)));
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