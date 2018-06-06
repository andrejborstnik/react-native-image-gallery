import * as PropTypes from 'prop-types';
import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ImageCell } from './ImageCell';
export class ImageListContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
    }
    renderItem(item) {
        const { activeId, imageHeight, imageWidth, onPress, showImageViewer, theme, topMargin } = this.props;
        return (React.createElement(ImageCell, { key: `ImageCellId-${item.item.id}`, imageHeight: imageHeight, imageId: item.item.id, imageWidth: imageWidth, source: { uri: item.item.url }, onPress: onPress, shouldHideDisplayedImage: showImageViewer && activeId === item.item.id, theme: theme, topMargin: topMargin }));
    }
    render() {
        const { activeId, images } = this.props;
        return (React.createElement(FlatList, { style: styles.container, data: images, extraData: activeId, numColumns: 2, keyExtractor: (item) => item.id, renderItem: this.renderItem, horizontal: false }));
    }
}
ImageListContainer.propTypes = {
    activeId: PropTypes.string,
    imageHeight: PropTypes.number,
    imageWidth: PropTypes.number,
    images: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
    })),
    onPress: PropTypes.func.isRequired,
    showImageViewer: PropTypes.bool,
    theme: PropTypes.object,
    topMargin: PropTypes.number
};
ImageListContainer.defaultProps = {
    images: [],
    showImageViewer: false,
    theme: {},
    topMargin: 0
};
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
//# sourceMappingURL=ImageListContainer.js.map