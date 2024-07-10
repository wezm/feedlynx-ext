"use strict";

browser.browserAction.onClicked.addListener((tab) => {
  if (tab.url) {
    const url = tab.url;

    browser.storage.sync.get(["host", "token"]).then((results) => {
      // TODO: Handle empty strings
      if (typeof results.host == "string" && typeof results.token == "string") {
        const post_url = new URL("/add", results.host);

        const body = new URLSearchParams({
          url: url,
          token: results.token,
        });

        if (typeof tab.title == "string" && tab.title !== "") {
          body.set("title", tab.title);
        }

        fetch(post_url, {
          method: "POST",
          body: body,
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
          .then((response) => {
            // TODO: Show the response body
            if (response.status != 201) {
              notify(
                "Unable to add URL",
                `The request to add the URL was unsuccessful (${response.status})`,
              );
            }
            return response.text();
          })
          .then((text) => notify("Added", "The link was added."))
          .catch((e) => {
            notify("Unable to add URL", `The request to add the URL was unsuccessful.`);
          });
      } else {
        notify(
          "Feedlynx not set up",
          "The Feedlynx extension needs to have the host and token configured.",
        );
      }
    });
  } else {
    notify("Error", "This tab does not have a URL.");
  }
});

function notify(title: string, message: string) {
  browser.notifications.create(null, {
    type: "basic",
    iconUrl: browser.runtime.getURL("icon-96.png"),
    title: title,
    message: message,
  });
}
