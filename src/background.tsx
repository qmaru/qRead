chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "qred-translate",
    title: "qread translate",
    contexts: ["selection"]
  })
})

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "qred-rewrite",
    title: "qread rewrite",
    contexts: ["selection"]
  })
})

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "qred-summary",
    title: "qread summary",
    contexts: ["selection"]
  })
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  const tid = tab?.id
  if (tid) {
    if (info.menuItemId === "qred-translate") {
      chrome.storage.sync.get(["targetLang"], ({ targetLang }) => {
        chrome.tabs.sendMessage(tid, {
          type: "TRANSLATE",
          text: info.selectionText,
          lang: targetLang || "zh"
        })
      })
    } else if (info.menuItemId === "qred-rewrite") {
      chrome.tabs.sendMessage(tid, {
        type: "REWRITE",
        text: info.selectionText,
      })
    } else if (info.menuItemId === "qred-summary") {
      chrome.tabs.sendMessage(tid, {
        type: "SUMMARY",
        text: info.selectionText,
      })
    }
  }
})
