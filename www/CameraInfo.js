var exec = require('cordova/exec');

exports.isAvailable = function () {
    return new Promise(function (success, error) {
        exec(success, error, 'CameraInfo', 'isAvailable', []);
    })
}
