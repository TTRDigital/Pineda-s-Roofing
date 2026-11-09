/*
 * Phone-number swap for ad landing pages. Swappable by a Twilio (or any)
 * call-tracking script without editing the page.
 *
 * Every phone link/label on the page is marked  data-phone  (href="tel:...").
 * This file replaces them with the tracking number as soon as one is known:
 *
 *   1. window.TTRNumber.set("+13015550123")   <- the tracking script calls this
 *   2. window.TTR_TRACKING_NUMBER = "+1301..." <- or just sets this before/after load
 *   3. ?tn=+13015550123 or ?tn=3015550123      <- campaign URL override (QA)
 *
 * With none of those, the page keeps its default (the real business number).
 * Last non-empty value wins; the original number is kept in data-phone-default
 * so it can be restored with window.TTRNumber.reset().
 */
(function () {
  var digits = function (v) { return String(v || "").replace(/\D/g, ""); };
  var fmt = function (d) {
    if (d.length === 11 && d[0] === "1") d = d.slice(1);
    return d.length === 10 ? "(" + d.slice(0, 3) + ") " + d.slice(3, 6) + "-" + d.slice(6) : null;
  };
  var current = null;

  function apply(raw) {
    var d = digits(raw);
    if (d.length === 10) d = "1" + d;
    var label = fmt(d);
    if (d.length !== 11 || !label) return false;
    document.querySelectorAll("[data-phone]").forEach(function (el) {
      if (!el.hasAttribute("data-phone-default")) {
        el.setAttribute("data-phone-default", el.getAttribute("href") || "");
        el.setAttribute("data-phone-label-default", el.textContent);
      }
      if (el.tagName === "A") el.setAttribute("href", "tel:+" + d);
      var t = el.querySelector("[data-phone-text]");
      (t || el).textContent = label;
    });
    current = "+" + d;
    return true;
  }

  function reset() {
    document.querySelectorAll("[data-phone-default]").forEach(function (el) {
      el.setAttribute("href", el.getAttribute("data-phone-default"));
      var t = el.querySelector("[data-phone-text]");
      (t || el).textContent = el.getAttribute("data-phone-label-default");
    });
    current = null;
  }

  window.TTRNumber = {
    set: apply,
    reset: reset,
    get: function () { return current; }
  };

  function run() {
    var q = new URLSearchParams(location.search).get("tn");
    if (q) apply(q);
    if (window.TTR_TRACKING_NUMBER) apply(window.TTR_TRACKING_NUMBER);
    // Late setters: watch the global for a short while after load.
    var tries = 0, last = window.TTR_TRACKING_NUMBER;
    var iv = setInterval(function () {
      if (window.TTR_TRACKING_NUMBER && window.TTR_TRACKING_NUMBER !== last) {
        last = window.TTR_TRACKING_NUMBER; apply(last);
      }
      if (++tries > 40) clearInterval(iv);
    }, 250);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run); else run();
})();
