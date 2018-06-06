import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Modal, Platform, SafeAreaView, StyleSheet } from 'react-native';
import { ImageListContainer } from './ImageListContainer';
import { ImageViewer } from './ImageViewer';
import { uiTheme } from './UITheme';
export class ImageGallery extends React.Component {
    constructor(props) {
        super(props);
        this.imageMeasurers = {};
        this.imageSizeMeasurers = {};
        this.closeImageViewer = this.closeImageViewer.bind(this);
        this.getSourceContext = this.getSourceContext.bind(this);
        this.onChangePhoto = this.onChangePhoto.bind(this);
        this.onSourceContext = this.onSourceContext.bind(this);
        this.openImageViewer = this.openImageViewer.bind(this);
        this.componentTheme = Object.assign({}, uiTheme, props.theme);
        this.state = {
            imageId: undefined,
            showImageViewer: false
        };
    }
    getChildContext() {
        return { onSourceContext: this.onSourceContext };
    }
    onSourceContext(imageId, cellMeasurer, imageMeasurer) {
        this.imageMeasurers[imageId] = cellMeasurer;
        this.imageSizeMeasurers[imageId] = imageMeasurer;
    }
    getSourceContext(imageId) {
        return {
            imageSizeMeasurer: this.imageSizeMeasurers[imageId],
            measurer: this.imageMeasurers[imageId]
        };
    }
    openImageViewer(imageId) {
        const { onPress } = this.props;
        this.setState({ imageId, showImageViewer: true });
        if (onPress) {
            onPress(imageId);
        }
    }
    closeImageViewer() {
        const { onClose } = this.props;
        this.setState({ imageId: undefined, showImageViewer: false });
        if (onClose) {
            onClose();
        }
    }
    onChangePhoto(imageId) {
        this.setState({ imageId });
    }
    renderModal() {
        const { images, infoDescriptionStyles, infoTitleStyles } = this.props;
        const { imageId, showImageViewer } = this.state;
        if (showImageViewer && imageId) {
            return (React.createElement(Modal, { visible: true, transparent: true, animationType: Platform.OS === 'ios' ? 'none' : 'fade', onRequestClose: this.closeImageViewer },
                React.createElement(ImageViewer, { getSourceContext: this.getSourceContext, imageId: imageId, images: images, infoTitleStyles: infoTitleStyles, infoDescriptionStyles: infoDescriptionStyles, onChange: this.onChangePhoto, onClose: this.closeImageViewer, theme: this.componentTheme })));
        }
        return null;
    }
    render() {
        const { imageHeight, imageWidth, images, topMargin = 0 } = this.props;
        const { imageId, showImageViewer } = this.state;
        return (React.createElement(SafeAreaView, { style: styles.container },
            React.createElement(ImageListContainer, { activeId: imageId, imageHeight: imageHeight, imageWidth: imageWidth, images: images, onPress: this.openImageViewer, showImageViewer: showImageViewer, topMargin: topMargin, theme: this.componentTheme }),
            this.renderModal()));
    }
}
ImageGallery.propTypes = {
    imageHeight: PropTypes.number,
    imageWidth: PropTypes.number,
    images: PropTypes.array,
    infoDescriptionStyles: PropTypes.object,
    infoTitleStyles: PropTypes.object,
    onPress: PropTypes.func,
    theme: PropTypes.object,
    topMargin: PropTypes.number
};
ImageGallery.defaultProps = {
    images: [],
    theme: {},
    topMargin: 0
};
ImageGallery.childContextTypes = {
    onSourceContext: PropTypes.func.isRequired
};
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
//# sourceMappingURL=ImageGallery.js.map