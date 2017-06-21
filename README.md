# Teak Devevelopment Tools

These tools simplify development and debugging tasks for the Teak SDKs
 * [Android](https://github.com/gocarrot/teak-android)
 * [iOS](https://github.com/gocarrot/teak-ios)
 * [Adobe Air](https://github.com/gocarrot/teak-air)
 * [Unity](https://github.com/gocarrot/teak-unity)

We use this internally for development, as well as automated testing.

## Note

This tool currently only works with the development versions of the Teak SDK.

The first SDK version that will be compatible with these tools is the 0.12.x family.

## Usage

The easiest way to use the tools is to pipe a device log into it

For Android

    $ adb logcat -s *:D | teak log parse

For iOS

    $ idevicesyslog | teak log parse

You can also just feed a logfile to the tool as well

    $ teak log parse < mydevice.log

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/GoCarrot/teak-dev-tools.


## License

The code is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
