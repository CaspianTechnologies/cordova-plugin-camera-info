cordova.commandProxy.add('CameraInfo', {

    isAvailable: async function (successCallback, errorCallback, params) {
        try {
            const devices = await Windows.Devices.Enumeration.DeviceInformation.findAllAsync(Windows.Devices.Enumeration.DeviceClass.videoCapture);
            const cameraAvailable = devices.length > 0;
            successCallback(cameraAvailable);
        }
        catch (error) {
            errorCallback(e);
        }
    }
});
