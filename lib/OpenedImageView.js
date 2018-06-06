import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Animated, TouchableWithoutFeedback } from 'react-native';
export class OpenedImageView extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onPressImage = this.onPressImage.bind(this);
        this.state = {
            containerHeight: props.height,
            containerWidth: props.width
        };
    }
    onPressImage() {
        const { onPress } = this.props;
        if (onPress) {
            onPress();
        }
    }
    render() {
        const { imageWidth, imageHeight, transitionProgress, url } = this.props;
        const { containerWidth, containerHeight } = this.state;
        const containerStyle = {
            alignItems: 'center',
            flexDirection: 'row',
            height: containerHeight,
            opacity: transitionProgress.interpolate({ inputRange: [0.998, 0.999], outputRange: [0, 1] }),
            width: containerWidth
        };
        const imageStyle = {
            height: imageHeight,
            opacity: transitionProgress.interpolate({ inputRange: [0.998, 0.999], outputRange: [0, 1] }),
            width: imageWidth
        };
        return (React.createElement(Animated.View, { style: containerStyle },
            React.createElement(TouchableWithoutFeedback, { onPress: this.onPressImage },
                React.createElement(Animated.Image, { source: { uri: url }, resizeMode: "contain", style: imageStyle }))));
    }
}
OpenedImageView.propTypes = {
    height: PropTypes.number.isRequired,
    imageHeight: PropTypes.number.isRequired,
    imageWidth: PropTypes.number.isRequired,
    onPress: PropTypes.func.isRequired,
    realImageHeight: PropTypes.number.isRequired,
    realImageWidth: PropTypes.number.isRequired,
    transitionProgress: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired,
    url: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired
};
//# sourceMappingURL=OpenedImageView.js.map