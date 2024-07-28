"use strict";
browser.browserAction.onClicked.addListener((tab) => {
    if (!tab.url) {
        notify("Error", "This tab does not have a URL.");
        return;
    }
    const url = tab.url;
    browser.storage.sync.get(["host", "token"]).then((results) => {
        if (typeof results.host != "string" ||
            typeof results.token != "string" ||
            results.host == "" ||
            results.token == "") {
            notify("Feedlynx is not set up", "The Feedlynx extension needs to have the host and token configured in the settings.");
            return;
        }
        const post_url = new URL("/add", results.host);
        const body = new URLSearchParams({
            url: url,
            token: results.token,
        });
        let notification_subject = url;
        if (typeof tab.title == "string" && tab.title != "") {
            body.set("title", tab.title);
            notification_subject = tab.title;
        }
        notification_subject = truncate(notification_subject);
        // Post the URL to the Feedlynx server
        fetch(post_url, {
            method: "POST",
            body: body,
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
            .then((response) => {
            // TODO: Show the response body
            if (response.status != 201) {
                notify(`Unable to add ${notification_subject}`, `The request to add the URL was unsuccessful (${response.status})`);
            }
            return response.text();
        })
            .then((text) => notify("The link was added", `Added ${notification_subject}`))
            .catch((e) => {
            notify(`Unable to add ${notification_subject}`, `The request to add the URL was unsuccessful.`);
        });
    });
});
function notify(title, message) {
    browser.notifications.create(null, {
        type: "basic",
        iconUrl: browser.runtime.getURL("icon-96.png"),
        title: title,
        message: message,
    });
}
const MAX_LEN = 30;
function truncate(text) {
    const a = Array.from(text);
    const substr = a.slice(0, MAX_LEN);
    if (a.length > MAX_LEN) {
        substr.push("…");
    }
    return substr.join("");
}
