var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Animated, Dimensions, Easing, StyleSheet } from 'react-native';
import { HorizontalContainer } from './HorizontalContainer';
import { ImagePaner } from './ImagePaner';
import { ImageTransitionView } from './ImageTransitionView';
import { ScrollSpacerView } from './ScrollSpacerView';
import { Utils } from './Utils';
import { ViewerBackground } from './ViewerBackground';
export class ImageViewer extends React.Component {
    constructor(props) {
        super(props);
        this.getTransitionProgress = () => {
            const { dismissScrollProgress, height, openProgress } = this.state;
            let gestureDismissProgress;
            if (dismissScrollProgress) {
                gestureDismissProgress = dismissScrollProgress.interpolate({
                    inputRange: [
                        0,
                        height._value,
                        height._value * 2
                    ],
                    outputRange: [0.02, 1, 0.02]
                });
            }
            return openProgress || gestureDismissProgress || new Animated.Value(1);
        };
        this.getTransitionProgress = this.getTransitionProgress.bind(this);
        this.handleRef = this.handleRef.bind(this);
        this.measurePhotoSize = this.measurePhotoSize.bind(this);
        this.onPressImage = this.onPressImage.bind(this);
        this.onPressPaner = this.onPressPaner.bind(this);
        this.onScroll = this.onScroll.bind(this);
        this.state = {
            dismissProgress: null,
            dismissScrollProgress: new Animated.Value(Dimensions.get('window').height),
            height: new Animated.Value(Dimensions.get('window').height),
            imageHeight: 0,
            imageWidth: 0,
            initialImageMeasurements: null,
            openImageMeasurements: null,
            openProgress: new Animated.Value(0),
            width: new Animated.Value(Dimensions.get('window').width),
            zoomState: 'closed',
            zoomTransition: new Animated.Value(0),
            zoomedImageMeasurements: null
        };
    }
    componentDidMount() {
        this.measurePhotoSize();
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.imageId !== nextProps.imageId) {
            this.setState({
                initialImageMeasurements: null,
                openImageMeasurements: null
            }, () => this.measurePhotoSize());
        }
    }
    componentDidUpdate(prevProps, prevState) {
        const { openProgress, zoomState, zoomTransition } = this.state;
        if (openProgress) {
            Animated.timing(openProgress, {
                duration: 300,
                easing: Easing.inOut(Easing.quad),
                toValue: 1,
                useNativeDriver: true
            })
                .start(() => this.setState({ openProgress: null }));
        }
        if (zoomState === 'opening') {
            Animated.timing(zoomTransition, {
                duration: 300,
                toValue: 1,
                useNativeDriver: true
            }).start(() => this.setState({ zoomState: 'opened' }));
        }
        else if (zoomState === 'closing') {
            Animated.timing(zoomTransition, {
                duration: 300,
                toValue: 0,
                useNativeDriver: true
            }).start(() => this.setState({ zoomState: 'closed' }));
        }
    }
    measurePhotoSize() {
        return __awaiter(this, void 0, void 0, function* () {
            const { getSourceContext, imageId, images } = this.props;
            const { measurer, imageSizeMeasurer } = getSourceContext(imageId);
            const image = images.find((img) => img.id === imageId);
            if (!image) {
                throw new Error(`Fatal error, impossible to find image with id: ${imageId}`);
            }
            const imageSize = yield imageSizeMeasurer();
            const imageAspectRatio = imageSize.width / imageSize.height;
            const height = this.state.height._value;
            const width = this.state.width._value;
            const screenAspectRatio = width / height;
            let finalWidth = width;
            let finalHeight = width / imageAspectRatio;
            if (imageAspectRatio - screenAspectRatio < 0) {
                finalHeight = height;
                finalWidth = height * imageAspectRatio;
            }
            const finalX = (width - finalWidth) * 0.5;
            const finalY = (height - finalHeight) * 0.5;
            const openImageMeasurements = {
                height: finalHeight,
                scale: finalWidth / width,
                width: finalWidth,
                x: finalX,
                y: finalY
            };
            const initialImageMeasurements = yield measurer();
            const zoomedImageMeasurements = Utils.getImageMeasurements({
                containerHeight: Dimensions.get('window').height,
                containerWidth: Dimensions.get('window').width,
                imageHeight: imageSize.height,
                imageWidth: imageSize.width,
                mode: 'fill'
            });
            this.setState({
                imageHeight: imageSize.height,
                imageWidth: imageSize.width,
                initialImageMeasurements,
                openImageMeasurements,
                zoomedImageMeasurements
            });
        });
    }
    handleRef(ref) {
        if (ref) {
            setTimeout(() => {
                if (ref) {
                    ref.getNode().scrollResponderScrollTo({ y: this.state.height._value, animated: false });
                }
            }, 0);
        }
    }
    onScroll(e) {
        const yOffset = e.nativeEvent.contentOffset.y;
        const heightValue = this.state.height._value;
        const { onClose } = this.props;
        if ((yOffset <= 0 || yOffset >= 2 * heightValue) && onClose) {
            onClose();
        }
    }
    onPressImage() {
        this.setState({ zoomState: 'opening' });
    }
    onPressPaner() {
        this.setState({ zoomState: 'closing' });
    }
    renderZoomTransition() {
        const { zoomState, zoomTransition, openImageMeasurements, zoomedImageMeasurements } = this.state;
        if (openImageMeasurements &&
            zoomedImageMeasurements &&
            (zoomState === 'opening' || zoomState === 'closing')) {
            const { imageId, images } = this.props;
            const imageSource = images.find((img) => img.id === imageId);
            const imageStyle = {
                height: openImageMeasurements.height,
                left: openImageMeasurements.x,
                opacity: zoomTransition.interpolate({
                    extrapolate: 'clamp',
                    inputRange: [0.01, 0.015, 0.998, 1],
                    outputRange: [0, 1, 1, 0]
                }),
                position: 'absolute',
                top: openImageMeasurements.y,
                transform: [
                    {
                        scale: zoomTransition.interpolate({
                            inputRange: [0.02, 0.998],
                            outputRange: [1, zoomedImageMeasurements.scale]
                        })
                    }
                ],
                width: openImageMeasurements.width
            };
            return (React.createElement(Animated.Image, { pointerEvents: "none", source: { uri: imageSource && imageSource.url }, resizeMode: "contain", style: imageStyle }));
        }
        return null;
    }
    renderImagePaner() {
        const { zoomState, zoomTransition, openImageMeasurements, zoomedImageMeasurements } = this.state;
        if (openImageMeasurements && zoomedImageMeasurements && (zoomState === 'opened' || zoomState === 'closing' ||
            zoomState === 'opening')) {
            const { images, imageId, infoDescriptionStyles, infoTitleStyles, theme } = this.props;
            const imageSource = images.find((img) => img.id === imageId);
            return (React.createElement(ImagePaner, { source: { uri: imageSource && imageSource.url }, imageWidth: openImageMeasurements.width, imageHeight: openImageMeasurements.height, onPress: this.onPressPaner, transition: zoomTransition, zoomedImageMeasurements: zoomedImageMeasurements, infoView: null, infoTitle: imageSource && imageSource.title, infoTitleStyles: infoTitleStyles, infoDescription: imageSource && imageSource.description, infoDescriptionStyles: infoDescriptionStyles, theme: theme }));
        }
        return null;
    }
    renderVerticalScrollView(scrollProps) {
        const { dismissProgress, height, openImageMeasurements, openProgress, transitionProgress, width } = scrollProps;
        const { images, imageId, onChange } = this.props;
        const { dismissScrollProgress, imageHeight, imageWidth } = this.state;
        const onContainerScroll = Animated.event([{ nativeEvent: { contentOffset: { y: dismissScrollProgress } } }], { useNativeDriver: true, listener: this.onScroll });
        return (React.createElement(Animated.ScrollView, { ref: this.handleRef, onScroll: onContainerScroll, scrollEventThrottle: 1, pagingEnabled: true, showsVerticalScrollIndicator: false },
            React.createElement(ScrollSpacerView, { width: width, height: height }),
            React.createElement(HorizontalContainer, { images: images, imageId: imageId, height: height['_value'], imageHeight: openImageMeasurements ? openImageMeasurements.height : 0, imageWidth: openImageMeasurements ? openImageMeasurements.width : 0, realImageHeight: imageHeight, realImageWidth: imageWidth, openProgress: openProgress, dismissProgress: dismissProgress, transitionProgress: transitionProgress, onChange: onChange, onPressImage: this.onPressImage, openImageMeasurements: openImageMeasurements || {}, width: width['_value'] }),
            React.createElement(ScrollSpacerView, { width: width, height: height })));
    }
    renderTransitionView() {
        const { imageId, images } = this.props;
        const { dismissScrollProgress, height, imageHeight, imageWidth, initialImageMeasurements, openImageMeasurements, width } = this.state;
        if (initialImageMeasurements && openImageMeasurements) {
            const imageSource = images.find((img) => img.id === imageId);
            const transitionProgress = this.getTransitionProgress();
            return (React.createElement(ImageTransitionView, { dismissScrollProgress: dismissScrollProgress, transitionProgress: transitionProgress, height: height._value, imageHeight: imageHeight, imageWidth: imageWidth, initialImageMeasurements: initialImageMeasurements, openImageMeasurements: openImageMeasurements, source: { uri: imageSource && imageSource.url }, width: width._value }));
        }
        return null;
    }
    render() {
        const { imageId, images, theme } = this.props;
        const { dismissProgress, dismissScrollProgress, height, openImageMeasurements, openProgress, width } = this.state;
        const imageSource = images.find((img) => img.id === imageId);
        const transitionProgress = this.getTransitionProgress();
        const scrollProps = {
            dismissProgress,
            height,
            imageSource,
            openImageMeasurements,
            openProgress,
            transitionProgress,
            width
        };
        return (React.createElement(Animated.View, { style: viewStyles.topContainer, onLayout: Animated.event([{ nativeEvent: { layout: { width, height } } }]) },
            React.createElement(Animated.View, { style: [viewStyles.topContainer, { opacity: openProgress || 1 }] },
                React.createElement(ViewerBackground, { opacityProgress: dismissScrollProgress, inputRange: [0, height._value, height._value * 2], outputRange: [0.02, 1, 0.02], theme: theme }),
                this.renderVerticalScrollView(scrollProps)),
            this.renderTransitionView(),
            this.renderImagePaner(),
            this.renderZoomTransition()));
    }
}
ImageViewer.propTypes = {
    getSourceContext: PropTypes.func,
    imageId: PropTypes.string,
    images: PropTypes.array,
    infoDescriptionStyles: PropTypes.object,
    infoTitleStyles: PropTypes.object,
    onChange: PropTypes.func,
    onClose: PropTypes.func,
    theme: PropTypes.object
};
ImageViewer.defaultProps = {
    images: [],
    theme: {}
};
const viewStyles = StyleSheet.create({
    topContainer: {
        backgroundColor: 'transparent',
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0
    }
});
//# sourceMappingURL=ImageViewer.js.map