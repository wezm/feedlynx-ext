"use strict";
function saveOptions(e) {
    e.preventDefault();
    browser.storage.sync.set({
        host: val("host"),
        token: val("token"),
    });
}
function restoreOptions() {
    function onError(error) {
        browser.notifications.create(null, {
            type: "basic",
            iconUrl: browser.runtime.getURL("icon-96.png"),
            title: "Unable to load Feedlynx settings",
            message: `Error: ${error}`,
        });
    }
    let getting = browser.storage.sync.get(["host", "token"]);
    getting.then((results) => {
        el("host").value = results.host?.toString() || "";
        el("token").value = results.token?.toString() || "";
    }, onError);
}
function el(id) {
    return document.getElementById(id);
}
function val(id) {
    const element = el(id);
    return element.value;
}
document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("form")?.addEventListener("submit", saveOptions);
