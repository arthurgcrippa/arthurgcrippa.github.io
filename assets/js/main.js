// Theme toggle -------------------------------------------------------------
document.querySelectorAll(".theme-toggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
});

// Mobile menu ---------------------------------------------------------------
const navToggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("site-nav");
if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
}

// List filters (Posts tags/series, Cookbook categories) ---------------------
// Chips are OR within a kind and AND across kinds. The selection is mirrored
// in the URL (?tags=rust&series=ddia) so filtered views can be shared.
document.querySelectorAll(".filters").forEach((filters) => {
  const chips = [...filters.querySelectorAll(".chip")];
  const target = filters.dataset.filterTarget;
  const items = [...document.querySelectorAll(`${target} > *`)];
  const empty = document.querySelector(".filter-empty");
  const params = new URLSearchParams(location.search);

  chips.forEach((chip) => {
    const wanted = (params.get(chip.dataset.kind) || "").split(",");
    chip.setAttribute("aria-pressed", String(wanted.includes(chip.dataset.value)));
    chip.addEventListener("click", () => {
      chip.setAttribute("aria-pressed", String(chip.getAttribute("aria-pressed") !== "true"));
      apply();
    });
  });

  function apply() {
    const selected = {};
    chips.filter((c) => c.getAttribute("aria-pressed") === "true").forEach((c) => {
      (selected[c.dataset.kind] ||= []).push(c.dataset.value);
    });

    let visible = 0;
    items.forEach((item) => {
      const show = Object.entries(selected).every(([kind, values]) => {
        const own = (item.dataset[kind] || "").split(",");
        return values.some((v) => own.includes(v));
      });
      item.hidden = !show;
      if (show) visible++;
    });

    // Hide year headings whose posts are all filtered out.
    document.querySelectorAll(".year-group").forEach((group) => {
      group.hidden = !group.querySelector(`${target} > :not([hidden])`);
    });
    if (empty) empty.hidden = visible > 0;

    const url = new URL(location.href);
    ["tags", "series", "category"].forEach((k) => url.searchParams.delete(k));
    Object.entries(selected).forEach(([k, v]) => url.searchParams.set(k, v.join(",")));
    history.replaceState(null, "", url);
  }

  apply();
});

// Search ---------------------------------------------------------------------
const search = document.querySelector(".search");
if (search) {
  const input = document.getElementById("search-input");
  const status = document.getElementById("search-status");
  const results = document.getElementById("search-results");
  let index = null;

  const normalize = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const escape = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  fetch(search.dataset.index)
    .then((r) => r.json())
    .then((data) => {
      index = data.map((d) => ({ ...d, haystack: normalize([d.title, d.tags.join(" "), d.content].join(" ")) }));
      const q = new URLSearchParams(location.search).get("q");
      if (q) { input.value = q; run(); }
    });

  function run() {
    if (!index) return;
    const terms = normalize(input.value.trim()).split(/\s+/).filter(Boolean);
    if (!terms.length) { results.innerHTML = ""; status.textContent = ""; return; }

    const hits = index
      .filter((d) => terms.every((t) => d.haystack.includes(t)))
      .map((d) => ({ ...d, score: terms.reduce((s, t) => s + (normalize(d.title).includes(t) ? 10 : 1), 0) }))
      .sort((a, b) => b.score - a.score);

    status.textContent = `${hits.length} result${hits.length === 1 ? "" : "s"}`;
    results.innerHTML = hits.map((d) => {
      const pos = d.haystack.indexOf(terms[0]);
      const start = Math.max(0, pos - 60);
      const snippet = (start ? "…" : "") + d.content.slice(start, start + 180) + "…";
      return `<li><span class="meta">${escape(d.section)} · ${escape(d.date)}</span><br>
        <a href="${d.url}">${escape(d.title)}</a><p>${escape(snippet)}</p></li>`;
    }).join("");
  }

  input.addEventListener("input", run);
}
