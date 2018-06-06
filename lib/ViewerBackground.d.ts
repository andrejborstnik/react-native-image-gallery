/// <reference types="react" />
import * as React from 'react';
import { Animated } from 'react-native';
export interface ViewerBackgroundProps {
    readonly opacityProgress: Animated.Value;
    readonly inputRange: number[];
    readonly outputRange: number[];
    readonly theme: any;
}
export declare class ViewerBackground extends React.PureComponent<ViewerBackgroundProps> {
    static propTypes: object;
    static defaultProps: object;
    render(): JSX.Element;
}
