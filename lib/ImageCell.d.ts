/// <reference types="react" />
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Animated, ImageURISource } from 'react-native';
export interface ImageCellProps {
    readonly imageHeight: number;
    readonly imageId: string;
    readonly imageWidth: number;
    readonly source: ImageURISource;
    readonly onPress: (imageId: string) => void;
    readonly shouldHideDisplayedImage: boolean;
    readonly theme?: any;
    readonly topMargin: number;
}
export interface ImageCellState {
    readonly opacity: Animated.Value;
    readonly imageLoaded: boolean;
}
export declare class ImageCell extends React.Component<ImageCellProps, ImageCellState> {
    private imageRef;
    private readyToMeasure;
    static propTypes: object;
    static defaultProps: object;
    static contextTypes: {
        onSourceContext: PropTypes.Validator<any>;
    };
    constructor(props: ImageCellProps);
    componentWillMount(): void;
    shouldComponentUpdate(nextProps: ImageCellProps, nextState: ImageCellState): boolean;
    componentDidUpdate(prevProps: ImageCellProps, prevState: ImageCellState): void;
    measurePhoto: () => Promise<{}>;
    measureImageSize(): Promise<object>;
    onPress(): void;
    render(): JSX.Element;
}
