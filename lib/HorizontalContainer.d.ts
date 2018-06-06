/// <reference types="react" />
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { ImageGallerySource } from './types/image';
export interface HorizontalContainerProps {
    readonly dismissProgress?: any;
    readonly height: number;
    readonly images: ImageGallerySource[];
    readonly imageHeight: number;
    readonly imageId: string;
    readonly imageWidth: number;
    readonly openProgress?: any;
    readonly onChange: (id: string) => void;
    readonly onPressImage: (imageId: string) => void;
    readonly openImageMeasurements: object;
    readonly realImageHeight: number;
    readonly realImageWidth: number;
    readonly transitionProgress: any;
    readonly width: number;
}
export interface HorizontalContainerState {
    readonly imageHeight: number;
    readonly imageWidth: number;
}
export declare class HorizontalContainer extends React.PureComponent<HorizontalContainerProps, HorizontalContainerState> {
    static propTypes: {
        dismissProgress: PropTypes.Requireable<any>;
        height: PropTypes.Validator<any>;
        imageHeight: PropTypes.Validator<any>;
        imageId: PropTypes.Validator<any>;
        imageWidth: PropTypes.Validator<any>;
        images: PropTypes.Validator<any>;
        onChange: PropTypes.Requireable<any>;
        onPressImage: PropTypes.Validator<any>;
        openProgress: PropTypes.Requireable<any>;
        realImageHeight: PropTypes.Validator<any>;
        realImageWidth: PropTypes.Validator<any>;
        transitionProgress: PropTypes.Validator<any>;
        width: PropTypes.Validator<any>;
    };
    constructor(props: HorizontalContainerProps);
    componentWillReceiveProps(nextProps: HorizontalContainerProps): void;
    onPressImage(): void;
    onViewableItemsChanged(params: {
        viewableItems: any[];
        changed: any[];
    }): void;
    getItemLayout(items: any, index: number): any;
    renderItem(listItem: {
        item: ImageGallerySource;
        index: number;
    }): JSX.Element;
    render(): JSX.Element;
}
