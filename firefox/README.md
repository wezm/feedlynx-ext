# Feedlynx Brower Extension

Browser extensions for [Feedlynx], a tool for capturing links to read or watch later
in an RSS feed.

## Install

<!-- [Download from Firefox Add-Ons](https://addons.mozilla.org/en-US/firefox/addon/feedlynx/) -->

## Build from Source

1. Run `npm i`
2. Run `tsc`, output is `source/*.js`.

Versions used (for AMO reviewers):

* **Operating System:** Arch Linux
* **Node.js:** v20.11.1
* **NPM:** 10.2.4
* **TypeScript:** 5.5.3

## Create Test XPI

<https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/#sign-for-self-distribution>

    npx web-ext sign --channel=listed --amo-metadata=source/manifest.json --api-key=$AMO_JWT_ISSUER --api-secret=$AMO_JWT_SECRET

## Acknowledgements

* Icon made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a>
  from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>.
