# Cordova Plugin Camera Info

#### Description
Can be used to check camera availability.

#### Supported platforms:
* Windows

#### How to use:
```
if (device.platform === 'windows') {
    const isCameraAvailable = await cordova.plugins.cameraInfo.isAvailable();
}
```
