chrome.runtime.onMessage.addListener((e, r, t) => {
	function s() {
		chrome.runtime.lastError
			? t({success: !1, error: chrome.runtime.lastError.message})
			: t({success: !0});
	}
	return (
		"createBlockRule" === e.type
			? chrome.declarativeNetRequest.updateDynamicRules(
					{
						addRules: [
							{
								id: 2,
								priority: 1,
								action: {type: "block"},
								condition: {
									regexFilter:
										"^https://api\\.tarkov\\.help/build/assets/app.*\\.js$",
									resourceTypes: ["script"],
								},
							},
						],
						removeRuleIds: [],
					},
					s
			  )
			: "removeBlockRule" === e.type &&
			  (chrome.declarativeNetRequest.updateDynamicRules(
					{removeRuleIds: [2]},
					s
			  ),
			  chrome.tabs.query({active: !0, currentWindow: !0}, (e) => {
					e[0] &&
						chrome.tabs.sendMessage(e[0].id, {
							destination: "doc",
							type: "ruleRemoved",
						});
			  })),
		!0
	);
});
