// Copyright © 2026 Daniel Lehr. Alle Rechte vorbehalten.
// Sprache wählen: #de/#en in der Adresse, sonst gespeicherte Wahl, sonst Gerätesprache.
(function () {
  var root = document.documentElement;
  function stored() { try { return localStorage.getItem("lang"); } catch (e) { return null; } }
  function remember(l) { try { localStorage.setItem("lang", l); } catch (e) {} }
  function fromHash() {
    var h = location.hash.slice(1);
    if (h === "de" || h === "en") return h;
    var m = h.match(/-(de|en)$/);
    return m ? m[1] : null;
  }
  function fromQuery() { var m = location.search.match(/[?&]lang=(de|en)/); return m ? m[1] : null; }
  function pick() {
    var l = fromHash() || fromQuery() || stored();
    if (l !== "de" && l !== "en") l = (navigator.language || "de").toLowerCase().indexOf("de") === 0 ? "de" : "en";
    return l;
  }
  function apply(l) { root.setAttribute("data-lang", l); root.setAttribute("lang", l); }
  if (root.hasAttribute("data-fixed")) return;
  apply(pick());
  window.addEventListener("hashchange", function () { var l = fromHash(); if (l) { apply(l); remember(l); } });
  document.addEventListener("click", function (ev) {
    var b = ev.target.closest && ev.target.closest("button.lang");
    if (!b) return;
    var l = b.getAttribute("data-to");
    apply(l); remember(l);
    if (fromHash()) history.replaceState(null, "", "#" + l);
  });
})();
