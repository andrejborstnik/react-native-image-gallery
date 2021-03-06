import * as PropTypes from 'prop-types';
import * as React from 'react';
import {Modal, Platform, SafeAreaView, StyleSheet, ViewStyle} from 'react-native';

import {ImageListContainer} from './ImageListContainer';
import {ImageViewer} from './ImageViewer';
import {
  ImageGalleryContext,
  ImageGalleryMeasureFunctions,
  ImageGalleryMeasurements,
  ImageGallerySource
} from './types/image';
import {uiTheme} from './UITheme';

export interface ImageGalleryProps {
  readonly imageHeight?: number;
  readonly imageWidth?: number;
  readonly images: ImageGallerySource[];
  readonly infoDescriptionStyles?: ViewStyle;
  readonly infoTitleStyles?: ViewStyle;
  readonly onPress?: (imageId: string) => void;
  readonly onClose?: () => void;
  readonly theme?: any;
  readonly topMargin?: number;
  readonly closeIcon?: any;
}

export interface ImageGalleryState {
  readonly imageId?: string;
  readonly showImageViewer: boolean;
}

export class ImageGallery extends React.Component<ImageGalleryProps, ImageGalleryState> {
  private componentTheme: any;
  private imageMeasurers: {[imageId: string]: () => ImageGalleryMeasurements} = {};
  private imageSizeMeasurers: {[imageId: string]: () => ImageGalleryMeasurements} = {};

  static propTypes: object = {
    imageHeight: PropTypes.number,
    imageWidth: PropTypes.number,
    images: PropTypes.array,
    infoDescriptionStyles: PropTypes.object,
    infoTitleStyles: PropTypes.object,
    onPress: PropTypes.func,
    theme: PropTypes.object,
    topMargin: PropTypes.number
  };

  static defaultProps: object = {
    images: [],
    theme: {},
    topMargin: 0
  };

  static childContextTypes: object = {
    onSourceContext: PropTypes.func.isRequired
  };

  constructor(props: ImageGalleryProps) {
    super(props);

    // Methods
    this.closeImageViewer = this.closeImageViewer.bind(this);
    this.getSourceContext = this.getSourceContext.bind(this);
    this.onChangePhoto = this.onChangePhoto.bind(this);
    this.onSourceContext = this.onSourceContext.bind(this);
    this.openImageViewer = this.openImageViewer.bind(this);

    // Get component theme
    this.componentTheme = {...uiTheme, ...props.theme};

    // Initial state
    this.state = {
      imageId: undefined,
      showImageViewer: false
    };
  }

  getChildContext(): ImageGalleryContext {
    return {onSourceContext: this.onSourceContext};
  }

  onSourceContext(imageId: string, cellMeasurer, imageMeasurer): void {
    this.imageMeasurers[imageId] = cellMeasurer;
    this.imageSizeMeasurers[imageId] = imageMeasurer;
  }

  getSourceContext(imageId: string): ImageGalleryMeasureFunctions {
    return {
      imageSizeMeasurer: this.imageSizeMeasurers[imageId],
      measurer: this.imageMeasurers[imageId]
    };
  }

  openImageViewer(imageId: string): void {
    const {onPress} = this.props;

    this.setState({imageId, showImageViewer: true});

    if(onPress) {
      onPress(imageId);
    }
  }

  closeImageViewer(): void {
    const {onClose} = this.props;
    this.setState({imageId: undefined, showImageViewer: false});

    if(onClose) {
      onClose();
    }
  }

  onChangePhoto(imageId: string): void {
    this.setState({imageId});
  }

  renderModal(): JSX.Element {
    const {images, infoDescriptionStyles, infoTitleStyles, closeIcon} = this.props;
    const {imageId, showImageViewer} = this.state;

    if(showImageViewer && imageId) {
      return (
        <Modal
          visible={true}
          transparent={true}
          animationType={Platform.OS === 'ios' ? 'none' : 'fade'}
          onRequestClose={this.closeImageViewer}>
          <ImageViewer
            getSourceContext={this.getSourceContext}
            imageId={imageId}
            images={images}
            infoTitleStyles={infoTitleStyles}
            infoDescriptionStyles={infoDescriptionStyles}
            closeIcon={closeIcon}
            onChange={this.onChangePhoto}
            onClose={this.closeImageViewer}
            theme={this.componentTheme} />
        </Modal>
      );
    }

    return null;
  }

  render(): JSX.Element {
    const {
      imageHeight,
      imageWidth,
      images,
      topMargin = 0
    } = this.props;
    const {imageId, showImageViewer} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <ImageListContainer
          activeId={imageId}
          imageHeight={imageHeight}
          imageWidth={imageWidth}
          images={images}
          onPress={this.openImageViewer}
          showImageViewer={showImageViewer}
          topMargin={topMargin}
          theme={this.componentTheme} />
        {this.renderModal()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
