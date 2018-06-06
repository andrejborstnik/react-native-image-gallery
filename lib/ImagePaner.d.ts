/// <reference types="react" />
import * as React from 'react';
import { Animated, ImageURISource, ViewStyle } from 'react-native';
import { ImageGalleryMeasurements } from './types/image';
export interface ImagePanerProps {
    readonly imageHeight: number;
    readonly imageWidth: number;
    readonly infoDescription?: string;
    readonly infoDescriptionStyles?: ViewStyle;
    readonly infoTitle?: string;
    readonly infoTitleStyles?: ViewStyle;
    readonly infoView?: React.Component;
    readonly onPress: () => void;
    readonly source: ImageURISource;
    readonly theme: any;
    readonly transition: Animated.Value;
    readonly zoomedImageMeasurements: ImageGalleryMeasurements;
}
export declare class ImagePaner extends React.PureComponent<ImagePanerProps> {
    private scroll;
    private buttonOpacity;
    private x;
    static propTypes: object;
    static defaultProps: object;
    constructor(props: ImagePanerProps);
    onLoad(): void;
    onYawUpdate(motion: {
        yaw: number;
    }): void;
    handleRef(ref: any): void;
    renderInfoView(): JSX.Element;
    render(): JSX.Element;
}
