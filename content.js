let injectedScript = document.createElement("script");
(injectedScript.type = "module"),
	(injectedScript.src = chrome.runtime.getURL("inject.js")),
	(document.head || document.documentElement).appendChild(injectedScript),
	(injectedScript.onload = function () {
		this.remove();
	}),
	chrome.runtime.onMessage.addListener((e, c, t) => {
		"doc" == e?.destination && window.postMessage(e, "*");
	}),
	window.addEventListener("message", (e) => {
		e.source === window &&
			"bg" == e.data?.destination &&
			chrome.runtime.sendMessage(e.data, (e) => {});
	}),
	window.self == window.top &&
		chrome.runtime.sendMessage({type: "createBlockRule"}, (e) => {});
