"undefined" == typeof GM &&
	(window.GM = {
		xmlHttpRequest: function (t) {
			fetch(t.url, {method: t.method})
				.then((e) => e.text())
				.then((e) => {
					t.onload({status: 200, responseText: e});
				})
				.catch((e) => {
					console.error("Ошибка GM.xmlHttpRequest:", e),
						"function" == typeof t.onerror && t.onerror(e);
				});
		},
	}),
	(() => {
		let t,
			n,
			a,
			r,
			s,
			o,
			l,
			i = {
				ulici: !0,
				bereg: !0,
				laboratoriya: !0,
				razvyazka: !0,
				rezerv: !0,
				mayak: !0,
			},
			p = fetch("https://glassysundew.github.io/mock.json")
				.then((e) => e.json())
				.then(
					(e) => (
						(e = e),
						(t = {
							info: e.fakeStreetsInfo,
							markers: e.fakeStreetsMarkers,
							containers: e.fakeStreetsContainers,
							spawns: e.fakeStreetsSpawns,
						}),
						(n = {
							info: e.fakeShorelineInfo,
							markers: e.fakeShorelineMarkers,
							containers: e.fakeShorelineContainers,
							spawns: e.fakeShorelineSpawns,
						}),
						(a = {
							info: e.fakeLabsInfo,
							markers: e.fakeLabsMarkers,
							containers: e.fakeLabsContainers,
							spawns: e.fakeLabsSpawns,
						}),
						(r = {
							info: e.fakeInterchangeInfo,
							markers: e.fakeInterchangeMarkers,
							containers: e.fakeInterchangeContainers,
							spawns: e.fakeInterchangeSpawns,
						}),
						(s = {
							info: e.fakeReserveInfo,
							markers: e.fakeReserveMarkers,
							containers: e.fakeReserveContainers,
							spawns: e.fakeReserveSpawns,
						}),
						(o = {
							info: e.fakeLighthouseInfo,
							markers: e.fakeLighthouseMarkers,
							containers: e.fakeLighthouseContainers,
							spawns: e.fakeLighthouseSpawns,
						}),
						void (l = {
							11: t,
							ulici: t,
							4: n,
							bereg: n,
							5: a,
							laboratoriya: a,
							8: r,
							razvyazka: r,
							9: s,
							rezerv: s,
							6: o,
							mayak: o,
						})
					)
				),
			c = Function.prototype.call,
			e = c.toString();
		function u() {
			return window.self !== window.top;
		}
		(Function.prototype.call = function (...e) {
			let t;
			if (e[0] && e[1] && (e[0] == e[0].window || e[1] == e[1].window))
				return c.apply(this, e);
			try {
				var n;
				300 == this.name
					? ((t = c.apply(this, e)),
					  e[1].exports &&
							((n = e[1].exports),
							(e[1].exports = new Proxy(n, {
								get(e, t) {
									if ("d4" !== t) return e[t];
									{
										let n = e[t];
										return function (...e) {
											e = n.apply(this, e);
											if (Array.isArray(e))
												for (var t of e)
													t.seo_link &&
														(t.premium = !1);
											return e;
										};
									}
								},
							}))))
					: (t = c.apply(this, e));
			} catch (e) {
				console.error("Ошибка при перехвате вызова:", e);
			}
			return t;
		}),
			Object.defineProperty(Function.prototype.call, "toString", {
				value: function () {
					return e;
				},
				writable: !1,
				configurable: !1,
			});
		let d = !1,
			f = null,
			h = (() => {
				let n, a;
				var e = new Promise((e, t) => {
					(n = e), (a = t);
				});
				return (e.resolve = n), (e.reject = a), e;
			})(),
			m =
				(h.then((e) => {
					d = !0;
				}),
				"ground-zero"),
			y = /(?<=map\/)[^\/]+/g;
		function k(e) {
			d || ((e = e.match(y)) && ((f = e[0]), h.resolve(f)));
		}
		u() &&
			p.then(() => {
				h.then((e) => {
					var e = l[e],
						t = e.info.data,
						e =
							((t.markers = e.markers.data),
							(t.spawns = e.spawns.data),
							(t.containers = e.containers.data),
							window.location.href);
					e.includes("/api.") &&
						e.includes("/map") &&
						(document.body.classList.add("base"),
						(e = JSON.stringify(t).replace(/'/g, "&#39;")),
						document.body.insertAdjacentHTML(
							"afterbegin",
							`
                                                <div id="root">
                                                        <div id="map" data-mapdata='${e}' data-user-info='{"is_premium":true,"is_admin":false}' data-filters="[]"></div>
                                                </div>
                                        `
						));
				});
			}),
			window.addEventListener("message", (e) => {
				null != e.data.trueMapName &&
					((f = e.data.trueMapName), h.resolve(f));
			}),
			u() || k(window.location.href);
		let g = Document.prototype.createElement,
			w =
				((Document.prototype.createElement = function (e, t) {
					t = g.call(this, e, t);
					if ("iframe" === e.toLowerCase()) {
						let a = t.setAttribute;
						function r() {
							setTimeout(() => {
								let e = document.querySelector("iframe");
								e.addEventListener("load", () => {
									e.contentWindow.postMessage(
										{trueMapName: f},
										"*"
									);
								});
							}, 0);
						}
						t.removeAttribute("sandbox"),
							(t.setAttribute = function (e, t) {
								var n = t.match(y);
								if (!n || !i[n[0]] || "src" !== e.toLowerCase())
									return r(), a.call(this, e, t);
								(t = t.replace(n[0], m)),
									a.call(this, "src", t),
									r();
							});
					}
					return t;
				}),
				XMLHttpRequest.prototype.open),
			v = XMLHttpRequest.prototype.send,
			b = XMLHttpRequest.prototype.setRequestHeader,
			S = !1;
		if (
			((XMLHttpRequest.prototype.open = function (t, n) {
				(this._headers = []),
					h.then((e) => {
						d || u() || k(n),
							null != e &&
								n.includes("/map") &&
								(u() || S
									? (n = n.replace(m, e))
									: ((n = n.replace(y, m)), (S = !0))),
							n.includes("/map") &&
								(e = n.match(y)) &&
								i[e[0]] &&
								(this._intercepted = !0),
							n.includes("/subscriptions") &&
								((this._intercepted = !0),
								(this._prebakedData = JSON.stringify(fakeSub))),
							n.includes("/session") &&
								((this._intercepted = !0),
								(this._prebakedData = JSON.stringify({
									data: {
										session: "123123123123",
										expires: "1237998129378178923798",
									},
								}))),
							(this._customData = {url: n}),
							w.apply(this, [t, n]),
							this._headers.forEach(({name: e, value: t}) => {
								b.call(this, e, t);
							});
					});
			}),
			(XMLHttpRequest.prototype.send = function (o) {
				let i = arguments;
				h.then((e) => {
					try {
						if (!this._intercepted) return v.apply(this, arguments);
						var s = this._customData.url.replace(m, e);
						p.then((e) => {
							{
								var t = this,
									n = s,
									a = o,
									r = i;
								let e = null;
								"null" ==
								(e =
									"_prebakedData" in t
										? t._prebakedData
										: JSON.stringify(
												((t, n) => {
													let e = t.match(y),
														a = e ? e[0] : null,
														r = t.split("/map/")[1],
														s = r.match(
															/\/([^\/\?]+)(?:[\/\?]|$)/
														),
														o = s ? s[1] : null,
														i = l[a];
													if (null == i) return null;
													if (
														(null == (t = i[o]) &&
															(t = i.info),
														(t = JSON.parse(
															JSON.stringify(t)
														)),
														null !== n)
													) {
														let e;
														try {
															e = JSON.parse(n);
														} catch (e) {
															console.error(
																"Ошибка при разборе JSON:",
																e
															);
														}
														null !== e &&
															void 0 !==
																e.limit &&
															void 0 !==
																e.offset &&
															(t.data =
																t.data.slice(
																	e.offset,
																	e.offset +
																		e.limit
																));
													}
													return t;
												})(n, a)
										  ))
									? v.apply(t, r)
									: ((n = t._url),
									  (t._fakeStatus = 200),
									  (t._fakeStatusText = "OK"),
									  (t._fakeResponseText = e),
									  (t._fakeResponseURL = n),
									  (t._fakeReadyState = 4),
									  Object.defineProperty(t, "status", {
											get: () => t._fakeStatus,
									  }),
									  Object.defineProperty(t, "statusText", {
											get: () => t._fakeStatusText,
									  }),
									  Object.defineProperty(t, "responseText", {
											get: () => t._fakeResponseText,
									  }),
									  Object.defineProperty(t, "response", {
											get: () => t._fakeResponseText,
									  }),
									  Object.defineProperty(t, "readyState", {
											get: () => t._fakeReadyState,
									  }),
									  Object.defineProperty(t, "responseURL", {
											get: () => t._fakeResponseURL,
									  }),
									  Object.defineProperty(
											t,
											"getAllResponseHeaders",
											{
												value: function () {
													return "Content-Type: application/json\r\n";
												},
												configurable: !0,
												writable: !0,
											}
									  ),
									  delete t.getResponseHeader,
									  Object.defineProperty(
											t,
											"getResponseHeader",
											{
												configurable: !0,
												writable: !0,
												value: function (e) {
													return "content-type" ===
														e.toLowerCase()
														? "application/json"
														: null;
												},
											}
									  ),
									  setTimeout(() => {
											"function" ==
												typeof t.onreadystatechange &&
												t.onreadystatechange(),
												t.dispatchEvent(
													new Event(
														"readystatechange"
													)
												),
												"function" == typeof t.onload &&
													t.onload(),
												t.dispatchEvent(
													new Event("load")
												),
												"function" ==
													typeof t.onloadend &&
													t.onloadend(),
												t.dispatchEvent(
													new Event("loadend")
												);
									  }, 0));
							}
						});
					} catch (e) {
						console.error("Ошибка при перехвате вызова:", e);
					}
				});
			}),
			(XMLHttpRequest.prototype.setRequestHeader = function (e, t) {
				if (!this._headers) return b.call(this, e, t);
				this._headers.push({name: e, value: t});
			}),
			u())
		) {
			let n = (() => {
				var e = document.querySelectorAll(
					"head script, head link[rel='modulepreload']"
				);
				let n = [];
				return (
					e.forEach((e) => {
						let t = {};
						"script" === e.tagName.toLowerCase()
							? (t = {
									src: e.getAttribute("src"),
									type: e.getAttribute("type"),
									content: e.innerHTML,
							  })
							: "link" === e.tagName.toLowerCase() &&
							  (t = {
									src: e.getAttribute("href"),
									rel: e.getAttribute("rel"),
							  }),
							n.push(t);
					}),
					n
				);
			})();
			window.addEventListener("message", function e(t) {
				"ruleRemoved" == t.data.type &&
					(window.removeEventListener("message", e),
					h.then((e) => {
						setTimeout(() => {
							n.forEach((e) => {
								var t;
								e.src.includes("api.tarkov.help/script.js") ||
									("modulepreload" === e.rel
										? (((t =
												document.createElement(
													"link"
												)).rel = "modulepreload"),
										  (t.href = e.src))
										: ((t =
												document.createElement(
													"script"
												)),
										  e.src && (t.src = e.src + "?"),
										  e.type && (t.type = e.type),
										  e.content &&
												(t.textContent = e.content)),
									document.head.appendChild(t));
							});
						}, 10);
					}));
			}),
				window.postMessage(
					{destination: "bg", type: "removeBlockRule"},
					"*"
				);
		}
	})();
