export class Utils {
    static getImageMeasurements(sizes) {
        const { containerHeight, containerWidth, imageHeight, imageWidth, mode } = sizes;
        const imageAspectRatio = imageWidth / imageHeight;
        const containerAspectRatio = containerWidth / containerHeight;
        let width;
        let height;
        if (mode === 'fit') {
            width = containerWidth;
            height = containerWidth / imageAspectRatio;
            if (imageAspectRatio - containerAspectRatio < 0) {
                height = containerHeight;
                width = containerHeight * imageAspectRatio;
            }
        }
        else {
            width = containerHeight * imageAspectRatio;
            height = containerHeight;
            if (imageAspectRatio - containerAspectRatio < 0) {
                height = containerWidth;
                width = containerWidth / imageAspectRatio;
            }
        }
        const x = (containerWidth - width) * 0.5;
        const y = (containerHeight - height) * 0.5;
        const scale = width / containerWidth;
        return {
            height,
            scale,
            width,
            x,
            y
        };
    }
}
//# sourceMappingURL=Utils.js.map