/// <reference types="react" />
import * as React from 'react';
import { ViewStyle } from 'react-native';
import { ImageGalleryContext, ImageGalleryMeasureFunctions, ImageGallerySource } from './types/image';
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
export declare class ImageGallery extends React.Component<ImageGalleryProps, ImageGalleryState> {
    private componentTheme;
    private imageMeasurers;
    private imageSizeMeasurers;
    static propTypes: object;
    static defaultProps: object;
    static childContextTypes: object;
    constructor(props: ImageGalleryProps);
    getChildContext(): ImageGalleryContext;
    onSourceContext(imageId: string, cellMeasurer: any, imageMeasurer: any): void;
    getSourceContext(imageId: string): ImageGalleryMeasureFunctions;
    openImageViewer(imageId: string): void;
    closeImageViewer(): void;
    onChangePhoto(imageId: string): void;
    renderModal(): JSX.Element;
    render(): JSX.Element;
}
