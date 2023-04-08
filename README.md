# pretty-bookmarks

A pretty Google Chrome bookmark manager created with productivity with mind.

## Why use it

- Avoid bookmarks bar mess and limitations by having quick access to all your bookmarks in the same place
- Avoid too many open tabs and don't loose your research while surfing the web
- Easily categorize and manage items via folders
- It's generally useful no matter the field

## Features

- Main bookmark folders (Bookmarks bar, Mobile bookmarks, Other bookmarks) are split in tabs for easy access
- Allows quick creation of level one subfolders in each of the above mentioned global folders to serve as categories (deeper levels are not purposely not allowed to avoid mess)
- Subfolders are presented on top
- Bookmarks are ordered by date
- Presents bookmark's saved date
- Presents bookmark referral if available (the link that brought you there is of type do-follow)
- Allows moving and deleting bookmarks
- Allows deleting subfolders if they are empty
- Allows toggling dark/light mode (initial is set by browser's current theme)

## Features WIP

- Quick search

## Installing

- [Download Google Chrome extension](https://www.google.com) - WIP, extension is in pending approval

## Contribute

### Local development

1. Make sure you have `node` and `yarn` ready
2. Clone the repo
3. `cd` into the repo and run `yarn`
4. Run `yarn build` - this will generate the `build` folder that we're going to use to source the development version of the extension
5. Access `chrome://extensions/` in Google Chrome browser
6. Make sure `Developer mode` is toggled (up-right corner)
7. Press 'Load unpacked' button and select the above generated `build` folder
8. Press the`Extensions` button, search for Pretty Bookmarks and pin it in the browser's top bar for quick access
9. Back into the repo, run `yarn watch` to start the local development script that will automatically generate the `build` folder everythime you make changes
10. Have fun !
