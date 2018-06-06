import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Animated, StyleSheet } from 'react-native';
const OPACITY_RANGE = [0.01, 0.015, 0.999, 1];
const TRANSITION_RANGE = [0.02, 0.998];
export class ImageTransitionView extends React.PureComponent {
    render() {
        const { width, height, source, imageWidth, imageHeight, transitionProgress, dismissScrollProgress, openImageMeasurements, initialImageMeasurements } = this.props;
        let startScale = 0;
        let startTranslateX = 0;
        let startTranslateY = 0;
        let inlineAspectX = 1;
        let inlineAspectY = 1;
        const aspectRatio = imageWidth / imageHeight;
        const screenAspectRatio = width / height;
        if (aspectRatio - screenAspectRatio > 0) {
            const maxDim = openImageMeasurements.width;
            const srcShortDim = initialImageMeasurements.height;
            const srcMaxDim = srcShortDim * aspectRatio;
            startScale = srcMaxDim / maxDim;
            inlineAspectX = initialImageMeasurements.width / initialImageMeasurements.height / aspectRatio;
            inlineAspectY = aspectRatio;
        }
        else {
            const maxDim = openImageMeasurements.height;
            const srcShortDim = initialImageMeasurements.width;
            const srcMaxDim = srcShortDim / aspectRatio;
            startScale = srcMaxDim / maxDim;
            inlineAspectX = 1 / aspectRatio;
            inlineAspectY = aspectRatio * initialImageMeasurements.height / initialImageMeasurements.width;
        }
        const translateInitY = initialImageMeasurements.y + initialImageMeasurements.height * 0.5;
        const translateDestY = openImageMeasurements.y + openImageMeasurements.height * 0.5;
        startTranslateY = Math.floor(translateInitY - translateDestY);
        const translateInitX = initialImageMeasurements.x + initialImageMeasurements.width * 0.5;
        const translateDestX = openImageMeasurements.x + openImageMeasurements.width * 0.5;
        startTranslateX = Math.floor(translateInitX - translateDestX);
        const translateY = dismissScrollProgress
            ? Animated.add(transitionProgress.interpolate({ inputRange: TRANSITION_RANGE, outputRange: [startTranslateY, 0] }), Animated.multiply(dismissScrollProgress.interpolate({ inputRange: [0, height, height * 2], outputRange: [300, 0, -300] }), dismissScrollProgress.interpolate({
                inputRange: [0, height * 0.5, height, height * 1.5, height * 2],
                outputRange: [0, 1, 1, 1, 0]
            })))
            : transitionProgress.interpolate({ inputRange: TRANSITION_RANGE, outputRange: [startTranslateY, 0] });
        const containerStyle = {
            backgroundColor: 'transparent',
            height: openImageMeasurements.height,
            left: openImageMeasurements.x,
            opacity: transitionProgress.interpolate({ inputRange: OPACITY_RANGE, outputRange: [0, 1, 1, 0] }),
            overflow: 'hidden',
            position: 'absolute',
            top: openImageMeasurements.y,
            transform: [
                { translateX: transitionProgress.interpolate({ inputRange: TRANSITION_RANGE, outputRange: [startTranslateX, 0] }) },
                { translateY },
                { scale: transitionProgress.interpolate({ inputRange: TRANSITION_RANGE, outputRange: [startScale, 1] }) },
                { scaleX: transitionProgress.interpolate({ inputRange: TRANSITION_RANGE, outputRange: [inlineAspectX, 1] }) },
                { scaleY: transitionProgress.interpolate({ inputRange: TRANSITION_RANGE, outputRange: [inlineAspectY, 1] }) }
            ],
            width: openImageMeasurements.width
        };
        const imageStyle = Object.assign({}, StyleSheet.absoluteFillObject, { backgroundColor: 'transparent', transform: [
                { scaleX: transitionProgress.interpolate({ inputRange: TRANSITION_RANGE, outputRange: [1 / inlineAspectX, 1] }) },
                { scaleY: transitionProgress.interpolate({ inputRange: TRANSITION_RANGE, outputRange: [1 / inlineAspectY, 1] }) }
            ] });
        return (React.createElement(Animated.View, { pointerEvents: "none", style: containerStyle },
            React.createElement(Animated.Image, { source: source, style: imageStyle })));
    }
}
ImageTransitionView.propTypes = {
    dismissScrollProgress: PropTypes.instanceOf(Animated.Value).isRequired,
    height: PropTypes.number.isRequired,
    imageHeight: PropTypes.number.isRequired,
    imageWidth: PropTypes.number.isRequired,
    initialImageMeasurements: PropTypes.shape({
        height: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
    }).isRequired,
    openImageMeasurements: PropTypes.shape({
        height: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
    }).isRequired,
    source: PropTypes.any.isRequired,
    transitionProgress: PropTypes.object.isRequired,
    width: PropTypes.number.isRequired
};
//# sourceMappingURL=ImageTransitionView.js.map