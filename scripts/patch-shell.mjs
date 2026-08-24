import fs from "node:fs";
const P = "assets/js/app.js";
let a = fs.readFileSync(P, "utf8");
const swap = (from, to) => {
  if (!a.includes(from)) { console.error("MISS:\n" + from.slice(0, 120)); process.exit(1); }
  a = a.replace(from, to);
};

/* ---------- 1. chartbed reads theme tokens ---------- */
swap(`  const centres = [{ x: 0.14, y: 0.28 }, { x: 0.82, y: 0.7 }];`,
`  const centres = [{ x: 0.14, y: 0.28 }, { x: 0.82, y: 0.7 }];
  const cv2 = () => {
    const s = getComputedStyle(document.documentElement);
    return {
      grid: s.getPropertyValue("--bed").trim(),
      warm: s.getPropertyValue("--bed-warm").trim(),
      cool: s.getPropertyValue("--bed-cool").trim(),
      fade: s.getPropertyValue("--bed-fade").trim() || "255,255,255"
    };
  };
  let C = cv2();
  window.addEventListener("iicp:theme", () => { C = cv2(); draw(); });`);

swap(`    ctx.strokeStyle = "rgba(142,190,226,0.035)"; ctx.lineWidth = 1;
    const step = 92;`,
`    ctx.strokeStyle = C.grid; ctx.lineWidth = 1;
    const step = 92;`);

swap(`      ctx.strokeStyle = i ? "rgba(111,176,220,0.045)" : "rgba(230,179,62,0.04)";`,
`      ctx.strokeStyle = i ? C.cool : C.warm;`);

swap(`    const g = ctx.createRadialGradient(W / 2, H / 2, H * 0.25, W / 2, H / 2, H * 0.95);
    g.addColorStop(0, "rgba(5,12,20,0)"); g.addColorStop(1, "rgba(5,12,20,0.85)");`,
`    const g = ctx.createRadialGradient(W / 2, H / 2, H * 0.25, W / 2, H / 2, H * 0.95);
    g.addColorStop(0, "rgba(" + C.fade + ",0)"); g.addColorStop(1, "rgba(" + C.fade + ",0.86)");`);

/* ---------- 2. hero markup ---------- */
swap(`  <section class="hero">
    <div class="hero-coords">
      <span class="tick">31.78 N / 35.22 E &nbsp;&nbsp;Jerusalem</span>
      <span class="tick">19.08 N / 72.88 E &nbsp;&nbsp;Mumbai</span>
    </div>
    <div class="hero-inner">
      <span class="tick">An independent research and public knowledge project</span>
      <h1>The relationship did not begin in <em>1992</em>.</h1>
      <p class="hero-lede">It began wherever people, goods, letters and memory crossed between India and the Jewish world. Two embassies opened in 1992. The traffic is older than that, and this project exists to document it: dated, sourced, and open to correction.</p>
      <div class="hero-cta">
        <a class="btn btn-gold" href="#/timeline">Enter the timeline</a>
        <a class="btn" href="#/chart">Open the map</a>
        <a class="btn" href="#/synagogues">The synagogue directory</a>
      </div>
    </div>
  </section>`,
`  <section class="hero"><div class="hero-in">
    <div class="hero-coords">
      <span class="tick">31.78 N / 35.22 E &nbsp; Jerusalem</span>
      <span class="tick">19.08 N / 72.88 E &nbsp; Mumbai</span>
    </div>
    <span class="tick">An independent research and public knowledge project</span>
    <h1 style="margin-top:16px">The relationship did not begin in <em>1992</em>.</h1>
    <div class="hero-rule"></div>
    <p class="hero-lede">It began wherever people, goods, letters and memory crossed between India and the Jewish world. Two embassies opened in 1992. The traffic is older than that, and this project exists to document it: dated, sourced, and open to correction.</p>
    <div class="hero-cta">
      <a class="btn btn-gold" href="#/timeline">Enter the timeline</a>
      <a class="btn" href="#/chart">Open the map</a>
      <a class="btn" href="#/synagogues">The synagogue directory</a>
    </div>
  </div></section>`);

/* ---------- 3. routes, grouped ---------- */
swap(`const ROUTES = [
  ["home", "Home", "00"], ["timeline", "The Timeline", "01"], ["chart", "The Map", "02"],
  ["synagogues", "Synagogue Directory", "03"], ["communities", "The Communities", "04"],
  ["relationship", "The Relationship", "05"], ["compare", "Side by Side", "06"],
  ["languages", "Hebrew and Hindi", "07"], ["statements", "Statements Wall", "08"],
  ["library", "The Library", "09"], ["people", "People", "10"], ["archive", "Open Dataset", "11"],
  ["trace", "Trace a Connection", "12"], ["questions", "Open Questions", "13"], ["future", "2047", "14"],
  ["newsroom", "The Newsroom", "15"], ["forum", "The Forum", "16"], ["blog", "Submissions", "17"],
  ["corrections", "Corrections", "18"], ["support", "Support", "19"], ["about", "About", "20"]
];`,
`const GROUPS = [
  { label: "Explore", items: [
    ["timeline", "The Timeline", "01"], ["chart", "The Map", "02"],
    ["synagogues", "Synagogue Directory", "03"], ["communities", "The Communities", "04"],
    ["centres", "Centres of Excellence", "05"]
  ]},
  { label: "Compare", items: [
    ["relationship", "The Relationship", "06"], ["compare", "Side by Side", "07"],
    ["languages", "Hebrew and Hindi", "08"], ["statements", "Statements Wall", "09"]
  ]},
  { label: "Read", items: [
    ["library", "The Library", "10"], ["people", "People", "11"],
    ["archive", "Open Dataset", "12"], ["newsroom", "The Newsroom", "13"]
  ]},
  { label: "Think", items: [
    ["trace", "Trace a Connection", "14"], ["questions", "Open Questions", "15"], ["future", "2047", "16"]
  ]},
  { label: "Take part", items: [
    ["forum", "The Forum", "17"], ["blog", "Submissions", "18"],
    ["corrections", "Corrections", "19"], ["support", "Support", "20"], ["about", "About", "21"]
  ]}
];
const ROUTES = [["home", "Home", "00"], ...GROUPS.flatMap(g => g.items)];`);

/* ---------- 4. footer ---------- */
swap(`function footHTML() {
  const totalWords = D.articles.articles.reduce((n, a) => n + words(a.body.join(" ")), 0);
  return \`<footer class="foot">
    <div><h5>The project</h5><p>An independent research and public knowledge project. Not a government or embassy site.</p></div>
    <div><h5>Evidence</h5><ul><li><a href="#/corrections">Corrections policy</a></li><li><a href="#/about">How claims are graded</a></li><li><a href="#/archive">Open dataset</a></li></ul></div>
    <div><h5>Take part</h5><ul><li><a href="#/forum">The forum</a></li><li><a href="#/blog">Send a submission</a></li><li><a href="#/support">Support the project</a></li></ul></div>
    <div><h5>Record</h5><p class="num">Last reviewed \${esc(D.meta.lastReviewed)}<br>\${D.timeline.length} dated entries<br>\${D.synagogues.sites.length} sites recorded<br>\${Object.keys(D.sources).length} sources on file<br>\${totalWords.toLocaleString()} words in the library</p></div>
  </footer>\`;
}`,
`function footHTML() {
  const totalWords = D.articles.articles.reduce((n, a) => n + words(a.body.join(" ")), 0);
  const col = (h, items) => \`<div><h5>\${h}</h5><ul>\${items.map(i =>
    \`<li><a href="#/\${i[0]}">\${esc(i[1])}</a></li>\`).join("")}</ul></div>\`;
  return \`<footer class="foot"><div class="foot-in">
    <div class="foot-name">INDIA <i>&times;</i> ISRAEL<i>.</i></div>
    <p class="foot-lede">An independent research and public knowledge project documenting the connections between India and Israel. Not a government site, not an embassy, not a registered organisation.</p>
    <div class="foot-cols">
      \${col("Explore", GROUPS[0].items)}
      \${col("Compare", GROUPS[1].items)}
      \${col("Read", GROUPS[2].items)}
      \${col("Take part", GROUPS[4].items.slice(0, 4))}
      <div><h5>The record</h5>
        <p class="num">Last reviewed \${esc(D.meta.lastReviewed)}<br>
        \${D.timeline.length} dated entries<br>
        \${D.synagogues.sites.length} sites recorded<br>
        \${Object.keys(D.sources).length} sources on file<br>
        \${totalWords.toLocaleString()} words in the library</p>
        <h5 style="margin-top:24px">Get the newsletter</h5>
        <form class="foot-sub" id="subform">
          <input type="email" placeholder="you@email.com" aria-label="Your email address" required>
          <button type="submit">Subscribe</button>
        </form>
        <p style="margin-top:9px; font-size:12.5px" id="subnote">No list is running yet. This form tells you so honestly rather than pretending to sign you up.</p>
      </div>
    </div>
    <div class="foot-bar">
      <span>Independent project. Views are the project's own.</span>
      <span>Data is open. Take it, check it, correct it.</span>
    </div>
  </div></footer>\`;
}`);

/* ---------- 5. nav active state ---------- */
swap(`  $$(".nav a").forEach(a => a.classList.toggle("on", a.dataset.route === name));`,
`  $$("[data-route]").forEach(el => el.classList.toggle("on", el.dataset.route === name));
  $$(".navtop").forEach(b => b.classList.toggle("on",
    (GROUPS[+b.dataset.g] || { items: [] }).items.some(i => i[0] === name)));`);

/* ---------- 6. drawer replaces rail ---------- */
swap(`const openRail  = () => { $(".rail").classList.add("open"); $(".scrim").classList.add("on"); };
const closeRail = () => { $(".rail").classList.remove("open"); $(".scrim").classList.remove("on"); };`,
`const openRail = () => {
  $("#drawer").classList.add("open"); $("#scrim").classList.add("on");
  $("#burger").setAttribute("aria-expanded", "true");
};
const closeRail = () => {
  $("#drawer").classList.remove("open"); $("#scrim").classList.remove("on");
  $("#burger").setAttribute("aria-expanded", "false");
};

/* ---------- themes ---------- */
const THEMES = ["institute", "archive", "paper"];
function setTheme(t, save) {
  if (!THEMES.includes(t)) t = "institute";
  document.documentElement.setAttribute("data-site-theme", t);
  $$(".themes button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.theme === t)));
  if (save) { try { localStorage.setItem("iicp.theme", t); } catch (e) {} }
  dispatchEvent(new Event("iicp:theme"));
}`);

/* ---------- 7. boot ---------- */
swap(`  $("#nav").innerHTML = \`
    <div class="nav-group"><div class="nav-head">Explore</div>
      \${ROUTES.slice(0, 9).map(r => \`<a href="#/\${r[0]}" data-route="\${r[0]}"><span>\${r[2]}</span>\${esc(r[1])}</a>\`).join("")}</div>
    <div class="nav-group"><div class="nav-head">Read</div>
      \${ROUTES.slice(9, 15).map(r => \`<a href="#/\${r[0]}" data-route="\${r[0]}"><span>\${r[2]}</span>\${esc(r[1])}</a>\`).join("")}</div>
    <div class="nav-group"><div class="nav-head">Take part</div>
      \${ROUTES.slice(15).map(r => \`<a href="#/\${r[0]}" data-route="\${r[0]}"><span>\${r[2]}</span>\${esc(r[1])}</a>\`).join("")}</div>\`;
  chartbed();
  addEventListener("hashchange", () => go(location.hash));
  $("#menu").addEventListener("click", openRail);
  $(".scrim").addEventListener("click", closeRail);`,
`  const link = r => \`<a href="#/\${r[0]}" data-route="\${r[0]}"><span>\${r[2]}</span>\${esc(r[1])}</a>\`;
  $("#mainnav").innerHTML = "<ul>" + GROUPS.map((g, i) =>
    \`<li><button class="navtop" data-g="\${i}">\${esc(g.label)} <b>&#9660;</b></button>
      <ul class="drop">\${g.items.map(r => \`<li>\${link(r)}</li>\`).join("")}</ul></li>\`).join("") + "</ul>";

  $("#drawernav").innerHTML = GROUPS.map((g, i) =>
    \`<div class="dgroup" data-dg="\${i}">
      <button class="dhead">\${esc(g.label)} <b>&#9660;</b></button>
      <div class="dbody">\${g.items.map(link).join("")}</div>
    </div>\`).join("");

  $$(".dhead").forEach(b => b.addEventListener("click", () => b.parentElement.classList.toggle("open")));
  $$(".navtop").forEach(b => b.addEventListener("click", () => {
    const g = GROUPS[+b.dataset.g];
    if (g && g.items[0]) location.hash = "#/" + g.items[0][0];
  }));
  $$(".themes button").forEach(b => b.addEventListener("click", () => setTheme(b.dataset.theme, true)));
  let saved = "institute";
  try { saved = localStorage.getItem("iicp.theme") || "institute"; } catch (e) {}
  setTheme(saved, false);

  chartbed();
  addEventListener("hashchange", () => go(location.hash));
  $("#burger").addEventListener("click", openRail);
  $("#drawerx").addEventListener("click", closeRail);
  $("#scrim").addEventListener("click", closeRail);`);

/* ---------- 8. subscribe form is honest ---------- */
swap(`  $$("[data-flag]").forEach(b => b.addEventListener("click", () => openFlag(b.dataset.flag)));
  closeRail();
}`,
`  $$("[data-flag]").forEach(b => b.addEventListener("click", () => openFlag(b.dataset.flag)));
  const sf = $("#subform");
  if (sf) sf.addEventListener("submit", e => {
    e.preventDefault();
    $("#subnote").textContent = "There is no mailing list running yet, so nothing was sent and nothing was stored. When one exists this form will connect to it and this line will say so.";
  });
  closeRail();
}`);

fs.writeFileSync(P, a);
console.log("shell patched");
