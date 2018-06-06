/// <reference types="react" />
import * as React from 'react';
import { Animated, ImageURISource } from 'react-native';
import { ImageGalleryMeasurements } from './types/image';
export interface Props {
    readonly source: ImageURISource;
    readonly transitionProgress: Animated.Value;
    readonly dismissScrollProgress: Animated.Value;
    readonly initialImageMeasurements: ImageGalleryMeasurements;
    readonly openImageMeasurements: ImageGalleryMeasurements;
    readonly imageWidth: number;
    readonly imageHeight: number;
    readonly width: number;
    readonly height: number;
}
export declare class ImageTransitionView extends React.PureComponent<Props> {
    static propTypes: object;
    render(): JSX.Element;
}
