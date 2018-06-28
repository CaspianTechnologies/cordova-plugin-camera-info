const cordova = require('cordova');
const exec = require('cordova/exec');

function isWindows() {
    return cordova.platformId === 'windows';
}

exports.isAvailable = function () {
    return new Promise(function (success, error) {
        if (isWindows()) {
            exec(success, error, 'CameraInfo', 'isAvailable', []);
        }
        else {
            success(true);
        }
    });
};

exports.subscribeToAvailabilityChanges = function (onChangeCallback) {
    return new Promise(function (success, error) {
        if (isWindows()) {
            exec(success, error, 'CameraInfo', 'subscribeToAvailabilityChanges', onChangeCallback);
        }
        else {
            success(0);
            onChangeCallback(true);
        }
    });
};

exports.unsubscribeFromAvailabilityChanges = function (callbackId) {
    return new Promise(function (success, error) {
        if (isWindows()) {
            exec(success, error, 'CameraInfo', 'unsubscribeFromAvailabilityChanges', callbackId);
        }
        else {
            success(callbackId);
        }
    });
};
