async function getTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

function getReferrer() {
  return document.referrer;
}

chrome.bookmarks.onCreated.addListener(async (id, bookmarkData) => {
  const { id: bookmarkId, title: bookmarkTitle } = bookmarkData;
  const currentTab = await getTab();
  const tabId = currentTab.id;

  if (tabId) {
    chrome.scripting
      .executeScript({ target: { tabId }, func: getReferrer })
      .then((injectionResults) => {
        for (const { result: referral } of injectionResults) {
          chrome.storage.local.set({
            [`${bookmarkId}-${bookmarkTitle}`]: referral,
          });
        }
      });
  }
});
