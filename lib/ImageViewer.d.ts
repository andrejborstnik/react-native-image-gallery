/// <reference types="react" />
import * as React from 'react';
import { ViewStyle } from 'react-native';
import { ImageGalleryMeasureFunctions, ImageGalleryMeasurements, ImageGalleryScrollProps, ImageGallerySource } from './types/image';
export interface ImageViewerProps {
    readonly getSourceContext: (imageId: string) => ImageGalleryMeasureFunctions;
    readonly imageId: string;
    readonly images: ImageGallerySource[];
    readonly infoDescriptionStyles?: ViewStyle;
    readonly infoTitleStyles?: ViewStyle;
    readonly onChange: (imageId: string) => void;
    readonly onClose: () => void;
    readonly theme?: any;
    readonly closeIcon?: any;
}
export interface ImageViewerState {
    readonly width?: any;
    readonly height?: any;
    readonly openProgress?: any;
    readonly dismissProgress?: any;
    readonly dismissScrollProgress: any;
    readonly initialImageMeasurements?: ImageGalleryMeasurements;
    readonly openImageMeasurements?: ImageGalleryMeasurements;
    readonly zoomedImageMeasurements?: ImageGalleryMeasurements;
    readonly imageWidth: number;
    readonly imageHeight: number;
    readonly zoomTransition: any;
    readonly zoomState: 'closed' | 'opening' | 'opened' | 'closing';
}
export declare class ImageViewer extends React.Component<ImageViewerProps, ImageViewerState> {
    static propTypes: object;
    static defaultProps: object;
    constructor(props: ImageViewerProps);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: ImageViewerProps): void;
    componentDidUpdate(prevProps: ImageViewerProps, prevState: ImageViewerState): void;
    getTransitionProgress: () => any;
    measurePhotoSize(): Promise<any>;
    handleRef(ref: any): void;
    onScroll(e: any): void;
    onPressImage(): void;
    onPressPaner(): void;
    renderZoomTransition(): JSX.Element;
    renderImagePaner(): JSX.Element;
    renderVerticalScrollView(scrollProps: ImageGalleryScrollProps): JSX.Element;
    renderTransitionView(): JSX.Element;
    render(): JSX.Element;
}
