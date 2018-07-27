# Daydream

A chrome extension to record your actions into a [Puppeteer](https://github.com/GoogleChrome/puppeteer) script.

## Developing

1. Run `$ git clone https://github.com/segmentio/daydream.git && cd daydream && make`
2. Navigate to `chrome://extensions`
3. Ensure that 'Developer mode' is checked
4. Click `Load unpacked extension...`
5. Browse to `daydream/build` and click `Select`

## Usage

Just click the black daydream icon (it should turn green to indicate that it is actively recording), run all the tasks you wish to automate, and then click the green icon and open the popup.

## Notes

Daydream currently supports `.goto()`, `.click()`, `.type()`, `.screenshot()`, and `.refresh()`.

If you want daydream to capture typing, press <kbd>tab</kbd> after you finish typing in each `input` element.

## License

MIT
