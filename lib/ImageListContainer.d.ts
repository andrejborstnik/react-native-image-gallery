/// <reference types="react" />
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { ImageGallerySource } from './types/image';
export interface ImageListContainerProps {
    readonly activeId?: string;
    readonly imageHeight?: number;
    readonly imageWidth?: number;
    readonly images?: ImageGallerySource[];
    readonly onPress?: (imageId: string) => void;
    readonly showImageViewer?: boolean;
    readonly theme?: object;
    readonly topMargin?: number;
}
export declare class ImageListContainer extends React.PureComponent<ImageListContainerProps> {
    static propTypes: {
        activeId: PropTypes.Requireable<any>;
        imageHeight: PropTypes.Requireable<any>;
        imageWidth: PropTypes.Requireable<any>;
        images: PropTypes.Requireable<any>;
        onPress: PropTypes.Validator<any>;
        showImageViewer: PropTypes.Requireable<any>;
        theme: PropTypes.Requireable<any>;
        topMargin: PropTypes.Requireable<any>;
    };
    static defaultProps: object;
    constructor(props: ImageListContainerProps);
    renderItem(item: {
        item: ImageGallerySource;
        index: number;
    }): JSX.Element;
    render(): JSX.Element;
}
