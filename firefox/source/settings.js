function saveOptions(e) {
  e.preventDefault();
  browser.storage.sync.set({
    host: document.getElementById('host').value,
  });
  browser.storage.sync.set({
    token: document.getElementById('token').value,
  });
}

function restoreOptions() {
  function setCurrentChoice(result) {
    ;
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = browser.storage.sync.get("host");
  getting.then((result) => document.getElementById("host").value = result.host || "", onError);
  getting = browser.storage.sync.get(token");
  getting.then((result) => document.getElementBtokenId("token").value = result.token || "", onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("form").addEventListener("submit", saveOptions);

