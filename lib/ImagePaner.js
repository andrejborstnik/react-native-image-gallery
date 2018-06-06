import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Animated, Dimensions, Platform, StatusBar, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { default as Ionicons } from 'react-native-vector-icons/Ionicons';
export class ImagePaner extends React.PureComponent {
    constructor(props) {
        super(props);
        this.scroll = null;
        this.buttonOpacity = new Animated.Value(0);
        this.x = new Animated.Value(0);
        this.handleRef = this.handleRef.bind(this);
        this.onLoad = this.onLoad.bind(this);
        this.onYawUpdate = this.onYawUpdate.bind(this);
    }
    onLoad() {
        const { zoomedImageMeasurements } = this.props;
        if (Platform.OS === 'android' && this.scroll) {
            this.scroll.scrollTo({
                animated: false,
                x: -zoomedImageMeasurements.x,
                y: 0
            });
        }
        Animated.timing(this.buttonOpacity, {
            duration: 500,
            toValue: 1,
            useNativeDriver: true
        }).start();
    }
    onYawUpdate(motion) {
        this.x.setValue(motion.yaw);
    }
    handleRef(ref) {
        if (ref) {
            this.scroll = ref.getNode();
            if (Platform.OS === 'ios') {
                this.scroll.scrollTo({ animated: false, x: -this.props.zoomedImageMeasurements.x, y: 0 });
            }
        }
    }
    renderInfoView() {
        const { infoDescription, infoDescriptionStyles, infoTitle, infoTitleStyles, infoView, onPress, theme } = this.props;
        if (infoView) {
            return React.createElement(Animated.View, { style: { opacity: this.buttonOpacity } }, infoView);
        }
        const { imageGalleryCloseSize = 50, imageGalleryTextColor = '#fff', imageGalleryTextSize = 11 } = theme;
        const themeIconStyle = [
            viewStyles.closeIcon,
            viewStyles.textShadow,
            { color: imageGalleryTextColor, fontSize: imageGalleryCloseSize }
        ];
        if (infoTitle) {
            const { width } = Dimensions.get('window');
            const textContainerStyle = {
                width: width - imageGalleryCloseSize
            };
            const themeTitleStyle = [
                viewStyles.titleText,
                viewStyles.textShadow,
                { color: imageGalleryTextColor, fontSize: imageGalleryTextSize },
                infoTitleStyles
            ];
            const themeDescStyle = [
                viewStyles.descText,
                viewStyles.textShadow,
                { color: imageGalleryTextColor, fontSize: imageGalleryTextSize },
                infoDescriptionStyles
            ];
            return (React.createElement(Animated.View, { style: [textContainerStyle, { opacity: this.buttonOpacity }] },
                React.createElement(Animated.View, { style: viewStyles.textContainer },
                    React.createElement(Animated.Text, { style: themeTitleStyle, numberOfLines: 1 }, infoTitle.toUpperCase()),
                    React.createElement(Animated.Text, { style: themeDescStyle, numberOfLines: 0 }, infoDescription)),
                React.createElement(TouchableWithoutFeedback, { onPress: onPress },
                    React.createElement(Animated.View, { style: [viewStyles.closeTextContainer, { opacity: this.buttonOpacity }] },
                        React.createElement(Ionicons, { name: "ios-close-circle-outline", style: themeIconStyle })))));
        }
        else {
            return (React.createElement(TouchableWithoutFeedback, { onPress: onPress },
                React.createElement(Animated.View, { style: [viewStyles.closeContainer, { opacity: this.buttonOpacity }] },
                    React.createElement(Ionicons, { name: "ios-close-circle-outline", style: themeIconStyle }))));
        }
    }
    render() {
        const { source, theme, transition, zoomedImageMeasurements } = this.props;
        const { height, width } = Dimensions.get('window');
        const { imageGalleryBgColor = '#000', statusBarTheme = 'light-content' } = theme;
        const containerStyle = {
            backgroundColor: imageGalleryBgColor,
            height,
            opacity: transition.interpolate({ inputRange: [0.998, 1], outputRange: [0, 1] }),
            width
        };
        const imageStyle = {
            height: zoomedImageMeasurements.height,
            position: 'relative',
            transform: [{ translateX: new Animated.Value(0) }],
            width: zoomedImageMeasurements.width
        };
        const scrollStyle = {
            backgroundColor: imageGalleryBgColor
        };
        return (React.createElement(Animated.View, { style: containerStyle },
            React.createElement(StatusBar, { animated: true, hidden: true, barStyle: statusBarTheme }),
            React.createElement(Animated.ScrollView, { ref: this.handleRef, horizontal: true, bounces: true, style: scrollStyle },
                React.createElement(Animated.Image, { source: source, onLoad: this.onLoad, style: imageStyle })),
            this.renderInfoView()));
    }
}
ImagePaner.propTypes = {
    imageHeight: PropTypes.number,
    imageWidth: PropTypes.number,
    infoDescription: PropTypes.string,
    infoDescriptionStyles: PropTypes.object,
    infoTitle: PropTypes.string,
    infoTitleStyles: PropTypes.object,
    infoView: PropTypes.node,
    onPress: PropTypes.func,
    source: PropTypes.object,
    theme: PropTypes.object,
    transition: PropTypes.object,
    zoomedImageMeasurements: PropTypes.object
};
ImagePaner.defaultProps = {
    imageHeight: 750,
    imageWidth: 1129,
    theme: {}
};
const viewStyles = StyleSheet.create({
    closeContainer: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        bottom: 25,
        flexDirection: 'row',
        justifyContent: 'center',
        left: 0,
        position: 'absolute',
        right: 0
    },
    closeIcon: {
        padding: 5,
        textAlign: 'center'
    },
    closeTextContainer: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        flexDirection: 'row'
    },
    descText: {
        backgroundColor: 'transparent'
    },
    infoTextContainer: {
        alignItems: 'center',
        bottom: 25,
        flexDirection: 'row',
        justifyContent: 'center',
        left: 25,
        minHeight: 60,
        position: 'absolute'
    },
    textContainer: {
        flex: 1
    },
    textShadow: {
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3
    },
    titleText: {
        backgroundColor: 'transparent',
        fontWeight: '500'
    }
});
//# sourceMappingURL=ImagePaner.js.map