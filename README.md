open -a "AndroidStudio"

= ios simulators list
> xcrun simctl list

iPhone SE (1st generation) (com.apple.CoreSimulator.SimDeviceType.iPhone-SE)
iPhone 7 (com.apple.CoreSimulator.SimDeviceType.iPhone-7)
iPhone 7 Plus (com.apple.CoreSimulator.SimDeviceType.iPhone-7-Plus)
iPhone 8 (com.apple.CoreSimulator.SimDeviceType.iPhone-8)
iPhone 8 Plus (com.apple.CoreSimulator.SimDeviceType.iPhone-8-Plus)
iPhone X (com.apple.CoreSimulator.SimDeviceType.iPhone-X)
iPhone Xs (com.apple.CoreSimulator.SimDeviceType.iPhone-XS)
iPhone Xs Max (com.apple.CoreSimulator.SimDeviceType.iPhone-XS-Max)
iPhone Xʀ (com.apple.CoreSimulator.SimDeviceType.iPhone-XR)
iPhone 11 (com.apple.CoreSimulator.SimDeviceType.iPhone-11)
iPhone 11 Pro (com.apple.CoreSimulator.SimDeviceType.iPhone-11-Pro)
iPhone 11 Pro Max (com.apple.CoreSimulator.SimDeviceType.iPhone-11-Pro-Max)
iPhone SE (2nd generation) (com.apple.CoreSimulator.SimDeviceType.iPhone-SE--2nd-generation-)
iPhone 12 mini (com.apple.CoreSimulator.SimDeviceType.iPhone-12-mini)
iPhone 12 (com.apple.CoreSimulator.SimDeviceType.iPhone-12)
iPhone 12 Pro (com.apple.CoreSimulator.SimDeviceType.iPhone-12-Pro)
iPhone 12 Pro Max (com.apple.CoreSimulator.SimDeviceType.iPhone-12-Pro-Max)
iPhone 13 Pro (com.apple.CoreSimulator.SimDeviceType.iPhone-13-Pro)
iPhone 13 Pro Max (com.apple.CoreSimulator.SimDeviceType.iPhone-13-Pro-Max)
iPhone 13 mini (com.apple.CoreSimulator.SimDeviceType.iPhone-13-mini)
iPhone 13 (com.apple.CoreSimulator.SimDeviceType.iPhone-13)
iPhone SE (3rd generation) (com.apple.CoreSimulator.SimDeviceType.iPhone-SE-3rd-generation)
iPhone 14 (com.apple.CoreSimulator.SimDeviceType.iPhone-14)
iPhone 14 Plus (com.apple.CoreSimulator.SimDeviceType.iPhone-14-Plus)
iPhone 14 Pro (com.apple.CoreSimulator.SimDeviceType.iPhone-14-Pro)
iPhone 14 Pro Max (com.apple.CoreSimulator.SimDeviceType.iPhone-14-Pro-Max)
iPhone 15 (com.apple.CoreSimulator.SimDeviceType.iPhone-15)
iPhone 15 Plus (com.apple.CoreSimulator.SimDeviceType.iPhone-15-Plus)
iPhone 15 Pro (com.apple.CoreSimulator.SimDeviceType.iPhone-15-Pro)
iPhone 15 Pro Max (com.apple.CoreSimulator.SimDeviceType.iPhone-15-Pro-Max)
iPhone 16 Pro (com.apple.CoreSimulator.SimDeviceType.iPhone-16-Pro)
iPhone 16 Pro Max (com.apple.CoreSimulator.SimDeviceType.iPhone-16-Pro-Max)
iPhone 16 (com.apple.CoreSimulator.SimDeviceType.iPhone-16)
iPhone 16 Plus (com.apple.CoreSimulator.SimDeviceType.iPhone-16-Plus)

== Runtimes ==
iOS 16.0 (16.0 - 20A360) - com.apple.CoreSimulator.SimRuntime.iOS-16-0
iOS 17.0 (17.0.1 - 21A342) - com.apple.CoreSimulator.SimRuntime.iOS-17-0
iOS 18.1 (18.1 - 22B81) - com.apple.CoreSimulator.SimRuntime.iOS-18-1

xcrun simctl create "iPhone 13" \
com.apple.CoreSimulator.SimDeviceType.iPhone-13 \
com.apple.CoreSimulator.SimRuntime.iOS-18-1
