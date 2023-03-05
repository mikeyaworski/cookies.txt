# cookies.txt

This is a heavily modified version of https://github.com/hrdl-github/cookies-txt.

I've added support for Chrome and migrated to manifest V3.

## Why Isn't This On The Chrome Webstore or Firefox Add-ons Store?

The recent "get cookies.txt" Chrome extension turned into malware (started sending your cookies to a remote server). This is a common trend for browser extensions:

1. Start out useful and benign.
1. Introduce malware. Either the OP sells the extension to scammers, or becomes a scammer himself.
1. Google does not catch the malware in their review process.
1. Browser auto-updates your extensions and serves you the malware.

Installing browser extensions from some random guy on the internet makes you extremely vulnerable to powerful malware, so an extension that exports your cookies should never be something you install and allow to be auto-updated. Cookies are especially sensitive information, more than your password. Installing extensions from large, trusted companies on the webstore is fine, but it's too big of a risk for an extension made by some guy, and it's usually not even necessary.

I am just some guy, so you should install this extension manually and not trust me with your cookies. The code is short. Read it and install it, knowing that it can't be auto-updated into malware.

## Installation Instructions

### Chrome
1. [Download a ZIP of the repo](https://github.com/mikeyaworski/cookies.txt/archive/refs/heads/master.zip)
1. Extract the ZIP
1. Open Chrome and go to URL `chrome://extensions`
1. Enable `Developer Mode` in the top right corner of the page
1. Click `Load unpacked` in the top left corner of the page
1. Navigate to the extracted folder from the ZIP and select `src`

### Firefox

Not currently supported due to `background.service_worker` being disabled 
1. [Download a ZIP of the repo](https://github.com/mikeyaworski/cookies.txt/archive/refs/heads/master.zip)
1. Extract the ZIP
1. Navigate to the extracted files and delete `src/manifest.json`. Rename `manifest.firefox.json` to `manifest.json`
1. Open Firefox and go to URL `about:debugging#/runtime/this-firefox`
1. Click `Load Temporary Adon-on...`
1. Navigate to the extracted folder from the ZIP, navigate to `src` and select `manifest.json`
