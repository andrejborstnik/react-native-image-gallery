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
import { Animated, Dimensions, Easing, Image, TouchableOpacity } from 'react-native';
const windowWidth = Dimensions.get('window').width * 0.5;
export class ImageCell extends React.Component {
    constructor(props) {
        super(props);
        this.readyToMeasure = false;
        this.measurePhoto = () => __awaiter(this, void 0, void 0, function* () {
            const { topMargin } = this.props;
            if (!this.imageRef || !this.readyToMeasure) {
                console.warn('measurePhoto: Trying to measure image without ref or layout');
            }
            return new Promise((resolve, reject) => {
                this.imageRef
                    .getNode()
                    .measure((imgX, imgY, imgWidth, imgHeight, imgPageX, imgPageY) => {
                    resolve({
                        height: imgHeight,
                        width: imgWidth,
                        x: imgPageX,
                        y: imgPageY + topMargin
                    });
                }, reject);
            });
        });
        this.measureImageSize = this.measureImageSize.bind(this);
        this.measurePhoto = this.measurePhoto.bind(this);
        this.onPress = this.onPress.bind(this);
        this.state = {
            imageLoaded: false,
            opacity: new Animated.Value(1)
        };
    }
    componentWillMount() {
        this.context.onSourceContext(this.props.imageId, this.measurePhoto, this.measureImageSize);
    }
    shouldComponentUpdate(nextProps, nextState) {
        const { shouldHideDisplayedImage } = this.props;
        const { imageLoaded } = this.state;
        if (shouldHideDisplayedImage !== nextProps.shouldHideDisplayedImage || imageLoaded !== nextState.imageLoaded) {
            return true;
        }
        return false;
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.imageLoaded === false && this.state.imageLoaded) {
            Animated.timing(this.state.opacity, {
                duration: 300,
                easing: Easing.inOut(Easing.ease),
                toValue: 1
            }).start();
        }
        else {
            const { shouldHideDisplayedImage } = this.props;
            const { opacity } = this.state;
            if (shouldHideDisplayedImage) {
                opacity.setValue(0);
            }
            else {
                opacity.setValue(1);
            }
        }
    }
    measureImageSize() {
        return __awaiter(this, void 0, void 0, function* () {
            const { source } = this.props;
            const { imageLoaded } = this.state;
            if (!imageLoaded) {
                console.warn('measureImageSize: Undefined image size');
            }
            return new Promise((resolve, reject) => {
                Image.getSize(source.uri, (width, height) => {
                    resolve({ width, height });
                }, (error) => {
                    console.warn('measureImageSize: Error trying to get image size', JSON.stringify(error.message));
                    resolve({ width: 0, height: 0 });
                });
            });
        });
    }
    onPress() {
        const { imageId, onPress } = this.props;
        const { imageLoaded } = this.state;
        if (imageLoaded && onPress) {
            onPress(imageId);
        }
    }
    render() {
        const { imageHeight, imageId, imageWidth, source, theme } = this.props;
        const { imageGalleryImageColor = '#f1f1f1' } = theme;
        const imageStyle = {
            backgroundColor: imageGalleryImageColor,
            height: imageHeight,
            opacity: this.state.opacity,
            width: imageWidth
        };
        return (React.createElement(TouchableOpacity, { key: imageId, style: { backgroundColor: imageGalleryImageColor }, onPress: this.onPress },
            React.createElement(Animated.Image, { onLayout: () => this.readyToMeasure = true, onLoad: () => this.setState({ imageLoaded: true }), ref: (r) => this.imageRef = r, source: source, resizeMode: "cover", style: imageStyle })));
    }
}
ImageCell.propTypes = {
    imageHeight: PropTypes.number,
    imageId: PropTypes.string.isRequired,
    imageWidth: PropTypes.number,
    onPress: PropTypes.func.isRequired,
    shouldHideDisplayedImage: PropTypes.bool.isRequired,
    source: PropTypes.any.isRequired,
    theme: PropTypes.object,
    topMargin: PropTypes.number.isRequired
};
ImageCell.defaultProps = {
    imageHeight: windowWidth,
    imageWidth: windowWidth,
    theme: {}
};
ImageCell.contextTypes = {
    onSourceContext: PropTypes.func.isRequired
};
//# sourceMappingURL=ImageCell.js.map