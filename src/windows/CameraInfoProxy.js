let watcher = null;
let subscribers = [];
let subscriberIdCounter = 1;
let cameraAvailable = null;

async function isVideoCameraAvailable() {
    const devices = await Windows.Devices.Enumeration.DeviceInformation.findAllAsync(Windows.Devices.Enumeration.DeviceClass.videoCapture);
    return devices.length > 0;
}

async function onUpdate() {
    const availableNow = await isVideoCameraAvailable();
    if (cameraAvailable !== availableNow) {
        cameraAvailable = availableNow;
        subscribers.forEach(subscriber => subscriber.callback(cameraAvailable));
    }
}

cordova.commandProxy.add('CameraInfo', {

    isAvailable: async function (successCallback, errorCallback, params) {
        try {
            successCallback(await isVideoCameraAvailable());
        }
        catch (error) {
            errorCallback(error);
        }
    },

    subscribeToAvailabilityChanges: async function (successCallback, errorCallback, availabilityChangeCallback) {
        try {
            const subscriberId = subscriberIdCounter++;
            subscribers.push({
                callback: availabilityChangeCallback,
                id: subscriberId,
            });
            successCallback(subscriberId);

            if (!watcher) {
                watcher = Windows.Devices.Enumeration.DeviceInformation.createWatcher();
                watcher.addEventListener('enumerationcompleted', onUpdate);
                watcher.addEventListener('updated', onUpdate);
                watcher.start();
            } else {
                availabilityChangeCallback(await isVideoCameraAvailable());
            }
        }
        catch (error) {
            errorCallback(error);
        }
    },

    unsubscribeFromAvailabilityChanges: async function (successCallback, errorCallback, callbackId) {
        try {
            const subscriberIndex = subscribers.findIndex(subscriber => subscriber.id === callbackId);
            if (subscriberIndex === -1) {
                throw new Error(`Failed to find callback with id=${callbackId}`);
            }
            subscribers.splice(subscriberIndex, 1);
            successCallback(callbackId);
        }
        catch (error) {
            errorCallback(error);
        }
    },

});
