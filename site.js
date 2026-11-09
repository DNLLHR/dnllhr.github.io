// Copyright © 2026 Daniel Lehr. Alle Rechte vorbehalten.
(function () {
  var root = document.documentElement;
  var lang = root.getAttribute("lang");
  var alt = root.getAttribute("data-alt");

  function stored() { try { return localStorage.getItem("lang"); } catch (e) { return null; } }
  function remember(l) { try { localStorage.setItem("lang", l); } catch (e) {} }

  // #de/#en und ?lang= stammen aus Links, die die Apps und App Store Connect schon verwenden.
  function requested() {
    var h = location.hash.slice(1);
    if (h === "de" || h === "en") return h;
    var m = location.search.match(/[?&]lang=(de|en)/);
    return m ? m[1] : null;
  }
  function device() { return (navigator.language || "de").toLowerCase().indexOf("de") === 0 ? "de" : "en"; }

  var wanted = requested();
  if (wanted) remember(wanted);
  else if (root.hasAttribute("data-auto")) wanted = stored() || device();
  if (wanted && wanted !== lang && alt) location.replace(alt);

  document.addEventListener("click", function (ev) {
    var link = ev.target.closest && ev.target.closest("a.lang");
    if (link) remember(link.getAttribute("data-lang"));
  });
})();
