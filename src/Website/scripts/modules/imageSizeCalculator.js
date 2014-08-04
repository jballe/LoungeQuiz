module.exports = {
    calcNewSize: function (oldWidth, oldHeight, targetWidth, targetHeight) {
        if (!oldWidth)
            throw 'oldWidth must be specified';
        if (!oldHeight)
            throw 'oldHeight must be specified';
        if (!targetWidth)
            throw 'targetWidth must be specified';
        if (!targetHeight)
            throw 'targetHeight must be specified';

        var ratio = oldWidth / oldHeight;
        var testH = targetWidth / ratio;
        var testW = targetHeight * ratio;
        if (testH > targetHeight) targetWidth = testW;
        if (testW > targetWidth) targetHeight = testH;

        return { width: targetWidth, height: targetHeight };
    }
}