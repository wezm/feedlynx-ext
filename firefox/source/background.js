"use strict";
// const FEDIURL_HOST = new URL("http://127.0.0.1:8000/");
const FEDIURL_HOST = new URL("https://fediurl.7bit.org/");
browser.browserAction.onClicked.addListener((tab) => {
    if (!tab.url) {
        return;
    }
    const url = new URL(`/${tab.url}`, FEDIURL_HOST);
    browser.tabs.update(tab.id, { url: url.toString() });
});
