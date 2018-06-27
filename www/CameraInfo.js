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
