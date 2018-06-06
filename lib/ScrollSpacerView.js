import * as React from 'react';
import { Animated } from 'react-native';
export const ScrollSpacerView = (props) => {
    const { height, width } = props;
    const dynamicStyle = {
        height: height._value,
        width: width._value
    };
    return React.createElement(Animated.View, { style: dynamicStyle });
};
//# sourceMappingURL=ScrollSpacerView.js.map