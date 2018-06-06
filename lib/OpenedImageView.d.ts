/// <reference types="react" />
import * as React from 'react';
export interface OpenedImageViewProps {
    readonly height: number;
    readonly imageHeight: number;
    readonly imageWidth: number;
    readonly onPress: () => void;
    readonly realImageHeight: number;
    readonly realImageWidth: number;
    readonly transitionProgress: any;
    readonly url: string;
    readonly width: number;
}
export interface OpenedImageViewState {
    readonly containerHeight: number;
    readonly containerWidth: number;
}
export declare class OpenedImageView extends React.PureComponent<OpenedImageViewProps, OpenedImageViewState> {
    static propTypes: object;
    constructor(props: OpenedImageViewProps);
    onPressImage(): void;
    render(): JSX.Element;
}
