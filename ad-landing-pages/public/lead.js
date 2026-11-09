(function () {
  var form = document.getElementById("quote");
  if (!form) return;
  var msg = form.querySelector(".msg"), btn = form.querySelector("button[type=submit]");
  var labels = { first_name: "first name", last_name: "last name", phone: "a phone number", email: "an email", address: "your address", postal_code: "a 5-digit zip code", service: "a service", comments: "a comment", consent: "the agreement" };

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    msg.className = "msg"; msg.textContent = "";
    var fd = new FormData(form), body = {};
    fd.forEach(function (v, k) { body[k] = v; });
    body.consent = form.consent.checked;
    var bad = [];
    ["first_name", "last_name", "phone", "email", "address", "postal_code", "service", "comments"].forEach(function (k) { if (!String(body[k] || "").trim()) bad.push(k); });
    if (String(body.phone || "").replace(/\D/g, "").length < 10 && bad.indexOf("phone") < 0) bad.push("phone");
    if (body.postal_code && !/^\d{5}(-\d{4})?$/.test(body.postal_code.trim())) bad.push("postal_code");
    if (!body.consent) bad.push("consent");
    if (bad.length) {
      msg.className = "msg err"; msg.textContent = "Please enter " + labels[bad[0]] + ".";
      var el = form.elements[bad[0]]; if (el) el.focus();
      return;
    }
    var utm = {}, p = new URLSearchParams(location.search);
    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "gbraid", "wbraid", "msclkid", "fbclid"].forEach(function (k) { if (p.get(k)) utm[k] = p.get(k); });
    body.utm = utm; body.page_url = location.href; body.referrer = document.referrer;
    body.tracking_number = window.TTRNumber && window.TTRNumber.get() || "";
    btn.disabled = true; var old = btn.textContent; btn.textContent = "Sending...";
    fetch("/api/lead", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function () {
        msg.className = "msg ok"; msg.textContent = window.TTR_SUCCESS || "Thank you!";
        form.reset();
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: "generate_lead", form_id: "start-landing-page", lead_service: body.service });
      })
      .catch(function () {
        msg.className = "msg err";
        var a = document.querySelector("[data-phone]");
        msg.textContent = "Sorry, something went wrong. Please call us at " + (a ? a.textContent.trim() : "") + ".";
      })
      .then(function () { btn.disabled = false; btn.textContent = old; });
  });
})();
