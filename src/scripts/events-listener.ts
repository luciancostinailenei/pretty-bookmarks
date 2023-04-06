async function getTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

function getReferrer() {
  return document.referrer;
}

chrome.bookmarks.onCreated.addListener(async (id, bookmarkData) => {
  console.log("--- PB ---");
  console.log(bookmarkData);
  const currentTab = await getTab();
  const tabId = currentTab.id;

  if (tabId) {
    chrome.scripting
      .executeScript({ target: { tabId }, func: getReferrer })
      .then((injectionResults) => {
        for (const { result } of injectionResults) {
          console.log(`referral:`, result);
        }
      });
  }
});
