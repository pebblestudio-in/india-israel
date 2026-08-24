/* ============================================================
   THE INDIA-ISRAEL CIVILISATIONS PROJECT
   Application layer. Vanilla JS, no dependencies, no CDN.
   ============================================================ */

const CONFIG = window.SITE_CONFIG || {
  githubRepo: "YOUR-USERNAME/india-israel-civilisations-project",
  communityInvite: "",
  supportLink: ""
};

let D = {};
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

const esc = (s) => String(s == null ? "" : s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;")
  .replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const STATUS_LABEL = {
  "verified": "Verified",
  "verified-general": "Established fact",
  "community-claim": "Community claim",
  "figures-differ": "Sources differ",
  "unchecked": "Link not yet checked"
};
const STATUS_CLASS = {
  "verified": "badge-verified",
  "verified-general": "badge-verified",
  "community-claim": "badge-community",
  "figures-differ": "badge-figures",
  "unchecked": "badge-community"
};

const badge = (s) => s ? `<span class="badge ${STATUS_CLASS[s] || "badge-verified"}">${esc(STATUS_LABEL[s] || s)}</span>` : "";

function srcline(ids, factId) {
  const chips = (ids || []).map(id => {
    const s = D.sources[id];
    if (!s) return "";
    return `<a class="src-chip" href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.publisher)}</a>`;
  }).join("");
  return `<div class="srcline"><span class="tick">Sources</span>${chips || `<span class="tick" style="color:var(--contest)">None on file</span>`}
    <button class="flagbtn" data-flag="${esc(factId || "")}">Flag this</button></div>`;
}

const words = (s) => String(s || "").trim().split(/\s+/).filter(Boolean).length;

/* ============================================================
   CHART BED
   ============================================================ */
function chartbed() {
  const cv = $("#chartbed");
  if (!cv) return;
  const ctx = cv.getContext("2d");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let t = 0;
  function size() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    cv.width = innerWidth * dpr; cv.height = innerHeight * dpr;
    cv.style.width = innerWidth + "px"; cv.style.height = innerHeight + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  const centres = [{ x: 0.14, y: 0.28 }, { x: 0.82, y: 0.7 }];
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
  window.addEventListener("iicp:theme", () => { C = cv2(); draw(); });
  function draw() {
    const W = innerWidth, H = innerHeight;
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = C.grid; ctx.lineWidth = 1;
    const step = 92;
    for (let x = (t * 0.12) % step; x < W; x += step) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
    for (let y = 0; y < H; y += step) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
    centres.forEach((c, i) => {
      const cx = c.x * W, cy = c.y * H, R = Math.max(W, H) * 0.9, spin = t * 0.00022 * (i ? -1 : 1);
      ctx.strokeStyle = i ? C.cool : C.warm;
      for (let k = 0; k < 16; k++) {
        const a = spin + (k * Math.PI * 2) / 16;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R); ctx.stroke();
      }
      ctx.beginPath(); ctx.arc(cx, cy, 118, 0, Math.PI * 2); ctx.stroke();
    });
    const g = ctx.createRadialGradient(W / 2, H / 2, H * 0.25, W / 2, H / 2, H * 0.95);
    g.addColorStop(0, "rgba(" + C.fade + ",0)"); g.addColorStop(1, "rgba(" + C.fade + ",0.86)");
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  }
  function loop() { t += 1; draw(); requestAnimationFrame(loop); }
  size(); draw();
  if (!reduce) loop();
  addEventListener("resize", () => { size(); draw(); }, { passive: true });
}

/* ============================================================
   REAL MAPS
   ============================================================ */
function mapProj(g) {
  return {
    x: (lon) => (lon - g.lon0) * g.kx + g.xoff,
    y: (lat) => (g.lat1 - lat) * g.ky,
    w: g.width, h: g.height
  };
}

function graticule(g, P, stepLon, stepLat) {
  let out = "";
  for (let lon = Math.ceil(g.lon0 / stepLon) * stepLon; lon <= g.lon1; lon += stepLon) {
    out += `<line class="mp-grat" x1="${P.x(lon).toFixed(1)}" y1="0" x2="${P.x(lon).toFixed(1)}" y2="${P.h}"></line>`;
    out += `<text class="mp-tick" x="${(P.x(lon) + 3).toFixed(1)}" y="${(P.h - 6).toFixed(1)}">${lon}E</text>`;
  }
  for (let lat = Math.ceil(g.lat0 / stepLat) * stepLat; lat <= g.lat1; lat += stepLat) {
    out += `<line class="mp-grat" x1="0" y1="${P.y(lat).toFixed(1)}" x2="${P.w}" y2="${P.y(lat).toFixed(1)}"></line>`;
    out += `<text class="mp-tick" x="5" y="${(P.y(lat) - 4).toFixed(1)}">${lat}N</text>`;
  }
  return out;
}

function landLayer(g) {
  const c = g.countries || {};
  return `<g class="mp-land">
    <path class="mp-other" d="${g.others}"></path>
    ${c.palestine ? `<path class="mp-other" d="${c.palestine}"></path>` : ""}
    ${c.india  ? `<path class="mp-in" d="${c.india}"></path>`  : ""}
    ${g.stateLines ? `<path class="mp-state" d="${g.stateLines}"></path>` : ""}
    ${c.israel ? `<path class="mp-il" d="${c.israel}"></path>` : ""}
  </g>`;
}

/* the map credit. The amCharts licence requires this to stay visible. */
function mapCredit(extra) {
  const s = D.geo.source;
  return `<div class="mapcredit">
    <span>Map data: <a href="${esc(s.url)}" target="_blank" rel="noopener">amCharts</a>, India point of view.
    India is shown as the Government of India depicts it, including Jammu and Kashmir, Ladakh and Aksai Chin.
    Several of these boundaries are disputed internationally and other governments publish different depictions.
    This project does not draw or adjust any boundary itself: it selects a published dataset and names it.${extra ? " " + esc(extra) : ""}</span>
  </div>`;
}

const LABEL_OFFSET = {
  telaviv: [-9, -20, "end"], haifa: [-9, -34, "end"], jerusalem: [9, -6, "start"],
  ramla: [-9, -6, "end"], petahtikva: [9, -20, "start"], ashkelon: [-9, 12, "end"],
  kiryatgat: [9, 8, "start"], yeruham: [9, 22, "start"], beersheba: [-9, 24, "end"],
  mumbai: [9, 5, "start"], thane: [9, -10, "start"], alibag: [-9, 12, "end"],
  pune: [9, 15, "start"], ahmedabad: [9, -5, "start"], kochi: [9, 5, "start"],
  kolkata: [9, -5, "start"], delhi: [9, -5, "start"], bengaluru: [9, 13, "start"],
  aizawl: [9, 7, "start"], imphal: [9, -8, "start"]
};

function buildCorridorMap() {
  const g = D.geo.corridor, P = mapProj(g);
  const commColour = {}; D.communities.forEach(c => commColour[c.id] = c.colour);
  const commOf = {}; D.communities.forEach(c => (c.places || []).forEach(p => { if (!commOf[p]) commOf[p] = c.id; }));

  const routes = D.routes.map((r, i) => {
    const a = D.places[r.from], b = D.places[r.to];
    if (!a || !b) return "";
    const x1 = P.x(a.lon), y1 = P.y(a.lat), x2 = P.x(b.lon), y2 = P.y(b.lat);
    const dx = x2 - x1, dy = y2 - y1;
    const dist = Math.hypot(dx, dy);
    // bow the arc perpendicular to the line, always towards the top of the chart
    const bow = dist * 0.17 + i * 9;
    let nx = -dy / dist, ny = dx / dist;
    if (ny > 0) { nx = -nx; ny = -ny; }
    const mx = (x1 + x2) / 2 + nx * bow, my = (y1 + y2) / 2 + ny * bow;
    const len = dist * 1.35;
    return `<path class="mp-route" data-comm="${esc(r.community)}" d="M ${x1.toFixed(1)} ${y1.toFixed(1)} Q ${mx.toFixed(1)} ${my.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}"
      stroke="${esc(commColour[r.community] || "#6fb0dc")}" stroke-dasharray="${len.toFixed(0)}" stroke-dashoffset="${len.toFixed(0)}">
      <animate attributeName="stroke-dashoffset" from="${len.toFixed(0)}" to="0" dur="${(2.4 + i * 0.3).toFixed(1)}s" fill="freeze" begin="${(0.4 + i * 0.2).toFixed(1)}s"></animate></path>`;
  }).join("");

  const nodes = Object.entries(D.places).map(([id, p]) => {
    const x = P.x(p.lon), y = P.y(p.lat);
    const off = LABEL_OFFSET[id] || [9, 5, "start"];
    const col = p.country === "IL" ? "#6fb0dc" : (commColour[commOf[id]] || "#e6b33e");
    const leader = (Math.abs(off[1]) > 12) ? `<line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${(x + off[0]).toFixed(1)}" y2="${(y + off[1] - 3).toFixed(1)}" stroke="${col}" stroke-width="0.5" opacity="0.45"></line>` : "";
    return `<g class="mp-node" data-place="${esc(id)}" data-comm="${esc(commOf[id] || "")}" tabindex="0" role="button" aria-label="${esc(p.name)}">
      <circle class="hit" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="14" fill="${col}" fill-opacity="0"></circle>${leader}
      <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.4" fill="${col}"></circle>
      <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="7" fill="none" stroke="${col}" stroke-width="0.7" opacity="0.5"></circle>
      <text class="mp-label" x="${(x + off[0]).toFixed(1)}" y="${(y + off[1]).toFixed(1)}" text-anchor="${off[2]}">${esc(p.name.toUpperCase())}</text></g>`;
  }).join("");

  return `<svg id="mapsvg" viewBox="0 0 ${g.width} ${g.height}" role="img" aria-label="Map of the corridor between India and Israel showing community centres and migration routes">
    ${graticule(g, P, 10, 5)}${landLayer(g)}${routes}${nodes}</svg>`;
}

function buildSynagogueMap() {
  const g = D.geo.india, P = mapProj(g);
  const commColour = {}; D.communities.forEach(c => commColour[c.id] = c.colour);
  const dots = D.synagogues.sites.filter(s => s.lat && s.lon).map(s => {
    const x = P.x(s.lon), y = P.y(s.lat);
    const col = commColour[s.community] || "#e6b33e";
    const solid = s.status === "active";
    return `<g class="mp-node" data-syn="${esc(s.id)}" tabindex="0" role="button" aria-label="${esc(s.name)}, ${esc(s.city)}">
      <circle class="hit" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="13" fill="${col}" fill-opacity="0"></circle>
      <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" fill="${solid ? col : "none"}" stroke="${col}" stroke-width="1.2"></circle></g>`;
  }).join("");
  return `<svg id="synmap" viewBox="0 0 ${g.width} ${g.height}" role="img" aria-label="Map of Jewish sites recorded in India">
    ${graticule(g, P, 5, 5)}${landLayer(g)}${dots}</svg>`;
}

function buildIsraelInset() {
  const g = D.geo.israel, P = mapProj(g);
  const dots = Object.entries(D.places).filter(([, p]) => p.country === "IL").map(([id, p]) => {
    const x = P.x(p.lon), y = P.y(p.lat);
    return `<g class="mp-node" data-place="${esc(id)}" tabindex="0" role="button" aria-label="${esc(p.name)}">
      <circle class="hit" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="12" fill="#6fb0dc" fill-opacity="0"></circle>
      <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.2" fill="#6fb0dc"></circle>
      <text class="mp-label" x="${(x + 7).toFixed(1)}" y="${(y + 3.5).toFixed(1)}">${esc(p.name.toUpperCase())}</text></g>`;
  }).join("");
  return `<svg viewBox="0 0 ${g.width} ${g.height}" role="img" aria-label="Detail map of Israel showing cities recorded in this project">
    ${graticule(g, P, 1, 1)}${landLayer(g)}${dots}</svg>`;
}

function wireMap(root) {
  const info = $("#mapinfo", root);
  $$(".mp-node[data-place]", root).forEach(n => {
    const show = () => {
      const p = D.places[n.dataset.place]; if (!p || !info) return;
      const comm = D.communities.find(c => c.id === n.dataset.comm);
      info.innerHTML = `<div><h5>${esc(p.name)}</h5><p>${esc(p.note || "No note recorded yet.")}</p></div>
        <div><h5>${comm ? esc(comm.name) : (p.country === "IL" ? "Israel" : "India")}</h5><p>${comm ? esc(comm.summary) : (p.country === "IL" ? "Destination city in Israel." : "Location in India.")}</p></div>
        <div><h5>Position</h5><p class="num">${p.lat.toFixed(2)} N, ${p.lon.toFixed(2)} E</p></div>`;
    };
    n.addEventListener("mouseenter", show); n.addEventListener("focus", show); n.addEventListener("click", show);
  });
  $$(".mp-node[data-syn]", root).forEach(n => {
    const show = () => {
      const s = D.synagogues.sites.find(x => x.id === n.dataset.syn); if (!s || !info) return;
      info.innerHTML = `<div><h5>${esc(s.name)}</h5><p>${esc(s.city)}, ${esc(s.state)}${s.founded ? ". Founded " + esc(s.founded) : ""}</p></div>
        <div><h5>Status</h5><p>${esc(s.statusNote)}</p></div>
        <div><h5>Community</h5><p>${esc((D.communities.find(c => c.id === s.community) || {}).name || "Not recorded")}</p></div>`;
    };
    n.addEventListener("mouseenter", show); n.addEventListener("focus", show); n.addEventListener("click", show);
  });
  $$("[data-legend]", root).forEach(b => b.addEventListener("click", () => {
    const id = b.dataset.legend, already = b.classList.contains("on");
    $$("[data-legend]", root).forEach(x => x.classList.remove("on"));
    $$(".mp-route", root).forEach(r => r.classList.remove("hi"));
    if (already) return;
    b.classList.add("on");
    $$(`.mp-route[data-comm="${id}"]`, root).forEach(r => r.classList.add("hi"));
  }));
}

/* ============================================================
   VIEWS
   ============================================================ */
const V = {};

V.home = () => {
  const pivots = D.timeline.filter(t => t.pivotal);
  return `
  <section class="hero"><div class="hero-in">
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
  </div></section>

  <div class="beat-strip">
    <div class="beat"><b class="num">1568</b><p>The Paradesi Synagogue is built in Kochi. India's oldest.</p></div>
    <div class="beat"><b class="num">1950</b><p>India recognises the State of Israel, on 17 September.</p></div>
    <div class="beat"><b class="num">1992</b><p>Full diplomatic relations, forty-two years later.</p></div>
    <div class="beat q"><b>2026</b><p>Terms of reference for a free trade agreement. Where next?</p></div>
  </div>

  <section class="sec">
    <div class="sec-head"><span class="tick">01 / The record in numbers</span>
      <h2>What the official documents actually say</h2>
      <p>Every figure below comes from a named government source and links to it. Where two official sources disagree, this site shows the disagreement rather than choosing a side.</p></div>
    <div class="stat-grid">${D.figures.slice(0, 6).map(f => `<div class="stat">
      <span class="card-k">${badge(f.status)}</span><span class="stat-v">${esc(f.value)}</span>
      <span class="stat-l">${esc(f.label)}</span>${f.note ? `<span class="stat-n">${esc(f.note)}</span>` : ""}</div>`).join("")}</div>
    <div style="margin-top:22px"><a class="btn" href="#/relationship">All figures and sectors</a></div>
  </section>

  <section class="sec">
    <div class="sec-head"><span class="tick">02 / Turning points</span><h2>Dates that changed the shape of it</h2></div>
    <div class="grid">${pivots.map(t => `<div class="card">
      <span class="card-k">${badge(t.status)}<span class="tl-sector">${esc(t.dateLabel)}</span></span>
      <h4>${esc(t.title)}</h4><p>${esc(t.body)}</p>${srcline(t.sources, t.id)}</div>`).join("")}</div>
  </section>

  <section class="sec">
    <div class="sec-head"><span class="tick">03 / What remains standing</span>
      <h2>${D.synagogues.sites.length} Jewish sites recorded in India</h2>
      <p>The congregations are largely gone. The buildings are the part that stayed, and there is no clean sourced list of them anywhere. Building one is the most useful thing this project can do.</p></div>
    <div class="grid">${D.synagogues.sites.filter(s => s.founded).slice(0, 4).map(s => `<a class="card" href="#/synagogues">
      <span class="tick">${esc(s.city)}, ${esc(s.state)}</span><h4>${esc(s.name)}</h4>
      <span class="card-k"><span class="badge ${s.status === "active" ? "badge-verified" : s.status === "closed" ? "badge-figures" : "badge-community"}">${esc(s.status)}</span><span class="tl-sector">${esc(s.founded)}</span></span></a>`).join("")}</div>
    <div style="margin-top:22px"><a class="btn" href="#/synagogues">Open the directory</a></div>
  </section>

  <section class="sec">
    <div class="sec-head"><span class="tick">04 / Communities</span><h2>Four communities, not one category</h2>
      <p>India's Jewish communities are routinely flattened into a single label. They have different languages, different arrival stories, different centuries and different reasons for leaving.</p></div>
    <div class="grid">${D.communities.map(c => `<a class="card comm-card" style="border-top-color:${esc(c.colour)}" href="#/communities">
      <span class="tick">${esc(c.region)}</span><h4>${esc(c.name)}</h4><p>${esc(c.summary)}</p></a>`).join("")}</div>
  </section>

  <section class="sec">
    <div class="sec-head"><span class="tick">05 / Reading</span><h2>From the archive</h2></div>
    <div class="grid">${D.articles.articles.slice(0, 4).map(a => `<a class="card" href="#/article/${esc(a.id)}">
      <span class="tick">${esc(a.kind)}</span><h4>${esc(a.title)}</h4><p>${esc(a.standfirst)}</p>
      <span class="tick num">${words(a.body.join(" "))} words</span></a>`).join("")}</div>
    <div style="margin-top:22px"><a class="btn" href="#/library">The whole library</a></div>
  </section>

  <section class="sec">
    <div class="sec-head"><span class="tick">06 / Standing questions</span><h2>What this project does not know yet</h2>
      <p>A research site that lists only what it has settled is a brochure. These are open.</p></div>
    <div class="grid">${D.questions.slice(0, 4).map(q => `<div class="card"><h4>${esc(q.q)}</h4><p>${esc(q.note)}</p></div>`).join("")}</div>
    <div style="margin-top:22px"><a class="btn" href="#/questions">All open questions</a></div>
  </section>`;
};

V.timeline = () => {
  const sectors = D.sectors.filter(s => D.timeline.some(t => t.sector === s.id));
  return `<div class="page-head"><span class="tick">Section 01</span><h1>The Timeline</h1>
    <p class="lede">From community tradition to last month's joint declaration. Filter by sector. Every entry carries its source and a control to flag it if you believe it is wrong.</p></div>
  <div class="filters" id="tlfilters"><button class="chip on" data-sector="all">All</button>
    ${sectors.map(s => `<button class="chip" data-sector="${esc(s.id)}">${esc(s.label)}</button>`).join("")}</div>
  <div class="tl" id="tlbody"></div>`;
};

function renderTimeline(filter) {
  const body = $("#tlbody"); if (!body) return;
  const items = D.timeline.filter(t => filter === "all" || t.sector === filter).sort((a, b) => a.sortKey - b.sortKey);
  if (!items.length) { body.innerHTML = `<div class="empty">Nothing recorded under this filter yet.</div>`; return; }
  let out = "", era = null;
  items.forEach(t => {
    if (t.era !== era) { era = t.era; out += `<div class="tl-era"><h3>${esc(era)}</h3><i></i></div>`; }
    const sec = D.sectors.find(s => s.id === t.sector);
    out += `<article class="tl-item${t.pivotal ? " pivot" : ""}"><div class="tl-date">${esc(t.dateLabel)}</div>
      <div class="tl-body"><div class="tl-meta"><span class="tl-sector">${esc(sec ? sec.label : t.sector)}</span>${badge(t.status)}</div>
      <h4>${esc(t.title)}</h4><p>${esc(t.body)}</p>${srcline(t.sources, t.id)}</div></article>`;
  });
  body.innerHTML = out;
  $$("[data-flag]", body).forEach(b => b.addEventListener("click", () => openFlag(b.dataset.flag)));
}

V.chart = () => `<div class="page-head"><span class="tick">Section 02</span><h1>The Map</h1>
  <p class="lede">Community centres in India, destination cities in Israel, and the corridor between them. India is drawn from the India point of view dataset, so Jammu and Kashmir, Ladakh and Aksai Chin appear as the Government of India depicts them. The credit line under each map says exactly whose depiction this is.</p></div>
  <div class="legend"><span class="tick" style="align-self:center">Trace a community</span>
    ${D.communities.map(c => `<button data-legend="${esc(c.id)}"><i style="background:${esc(c.colour)}"></i>${esc(c.name)}</button>`).join("")}</div>
  <div class="chartbox">${buildCorridorMap()}
    <div class="mapinfo" id="mapinfo">
      <div><h5>Hover any point</h5><p>Each node carries its community, its note and its coordinates.</p></div>
      <div><h5>The arcs</h5><p>Community origin to destination pairs, not individual journeys or flight paths.</p></div>
      <div><h5>A limit worth stating</h5><p>Migration was never a single line from one city to one city. Read the community pages for what actually happened.</p></div>
    </div>${mapCredit()}</div>
  <section class="sec"><div class="sec-head"><span class="tick">Detail</span><h2>Israel, at closer range</h2>
    <p>The cities in this project's record, including the towns that have hosted the National Convention of Indian Jews.</p></div>
    <div class="chartbox" style="margin:0; max-width:640px">${buildIsraelInset()}${mapCredit()}</div>
    ${srcline(["eoi-telaviv", "amcharts-india"], "map-israel")}</section>`;

V.synagogues = () => {
  const S = D.synagogues;
  return `<div class="page-head"><span class="tick">Section 03</span><h1>The Synagogue Directory</h1>
    <p class="lede">${esc(S.note)}</p></div>
  <div class="wrap"><div class="synsplit">
    <div class="chartbox" style="margin:0">${buildSynagogueMap()}${mapCredit("State and union territory boundaries are the 2023 set.")}</div>
    <div class="mapinfo synside" id="mapinfo">
      <div><h5>${S.sites.length} sites recorded</h5><p>A filled dot is an active congregation. A hollow dot is a building whose congregation has gone, or whose status is not yet recorded. Hover any dot.</p></div>
      <div><h5>Source</h5><p>${esc(S.sourceNote)}</p></div>
      <div><h5>Incomplete on purpose</h5><p>Entries with no date carry no date, rather than a guess. That is what the gaps in this directory mean.</p></div>
    </div></div></div>
  <div class="wrap">
    <input class="field" id="synq" type="search" placeholder="Search by name, city or community" aria-label="Search the directory" style="margin-bottom:22px">
    <div id="synbody" style="display:flex; flex-direction:column; gap:1px; background:var(--rule); border:1px solid var(--rule)"></div>
    <div class="sec" style="padding-left:0; padding-right:0"><div class="sec-head"><span class="tick">Wanted</span><h2>What this directory still needs</h2></div>
      <ul style="padding-left:20px; color:var(--text-2); display:flex; flex-direction:column; gap:8px">
        ${S.wanted.map(w => `<li>${esc(w)}</li>`).join("")}</ul></div>
  </div>`;
};

function renderSyn(q) {
  const body = $("#synbody"); if (!body) return;
  const n = (q || "").toLowerCase().trim();
  const rows = D.synagogues.sites.filter(s => !n || (s.name + " " + s.city + " " + s.state + " " + s.tradition + " " + (s.alsoKnown || "")).toLowerCase().includes(n));
  if (!rows.length) { body.innerHTML = `<div class="card"><p>No site matches that search.</p></div>`; return; }
  body.innerHTML = rows.map(s => {
    const c = D.communities.find(x => x.id === s.community);
    return `<article class="card" style="border-left:3px solid ${esc(c ? c.colour : "#6fb0dc")}">
      <div class="card-k"><span class="tick">${esc(s.city)}, ${esc(s.state)}</span>
        <span class="badge ${s.status === "active" ? "badge-verified" : s.status === "closed" ? "badge-figures" : "badge-community"}">${esc(s.status)}</span>
        ${s.founded ? `<span class="tl-sector">${esc(s.founded)}</span>` : `<span class="tick" style="color:var(--contest)">date not recorded</span>`}</div>
      <h4>${esc(s.name)}${s.alsoKnown ? ` <span style="color:var(--muted); font-size:0.7em">${esc(s.alsoKnown)}</span>` : ""}</h4>
      ${s.founder ? `<p class="tick">Founded by ${esc(s.founder)}</p>` : ""}
      <p style="color:var(--text-2)">${esc(s.statusNote)}</p>
      ${s.detail.map(d => `<p>${esc(d)}</p>`).join("")}
      ${srcline(s.sources, s.id)}</article>`;
  }).join("");
  $$("[data-flag]", body).forEach(b => b.addEventListener("click", () => openFlag(b.dataset.flag)));
}

V.communities = () => `<div class="page-head"><span class="tick">Section 04</span><h1>The Communities</h1>
  <p class="lede">Four histories usually compressed into one sentence. Each claim below is labelled by what kind of claim it is. Community tradition is recorded as community tradition, not upgraded into documented fact.</p></div>
  <div class="wrap" style="display:flex; flex-direction:column; gap:34px">
    ${D.communities.map(c => `<article class="paper" style="border-top:3px solid ${esc(c.colour)}">
      <span class="tick">${esc(c.region)} &nbsp;/&nbsp; ${esc(c.language)}</span>
      <h3 style="font-size:32px; margin:10px 0 4px">${esc(c.name)}</h3>
      <p class="tick">${esc(c.meaning)}</p>
      <div class="prose" style="margin-top:20px">${c.detail.map(p => `<p>${esc(p)}</p>`).join("")}</div>
      <div style="margin-top:22px; border-top:1px solid rgba(28,32,40,0.18); padding-top:18px">
        <span class="tick">Claim register</span>
        <div style="display:flex; flex-direction:column; gap:10px; margin-top:12px">
          ${c.claims.map(cl => `<div style="display:flex; gap:12px; align-items:flex-start; flex-wrap:wrap">${badge(cl.status)}
            <span style="flex:1; min-width:220px; font-size:14.5px; color:#33383f">${esc(cl.text)}</span></div>`).join("")}</div></div>
      ${srcline([...new Set(c.claims.flatMap(cl => cl.sources))], c.id)}</article>`).join("")}</div>`;

V.relationship = () => {
  const bySector = {};
  D.timeline.forEach(t => (bySector[t.sector] = bySector[t.sector] || []).push(t));
  const max = Math.max(...D.sectors.map(x => (bySector[x.id] || []).length), 1);
  return `<div class="page-head"><span class="tick">Section 05</span><h1>The Relationship</h1>
    <p class="lede">Ten strands, sized by how much documented activity sits behind each one in the record this project holds. That is a measure of what has been documented here, not a measure of importance.</p></div>
  <div class="wrap"><div class="grid">${D.sectors.map(s => {
    const n = (bySector[s.id] || []).length;
    return `<a class="card" href="#/timeline"><span class="tick">${esc(s.glyph)}</span><h4>${esc(s.label)}</h4>
      <div class="scen-bar"><i style="width:${Math.round((n / max) * 100)}%"></i></div>
      <p class="num">${n} entr${n === 1 ? "y" : "ies"} on record</p></a>`;
  }).join("")}</div></div>
  <section class="sec"><div class="sec-head"><span class="tick">Every figure held</span><h2>The full numeric record</h2></div>
    <div class="grid">${D.figures.map(f => `<div class="card"><span class="card-k">${badge(f.status)}</span>
      <span class="stat-v">${esc(f.value)}</span><span class="stat-l">${esc(f.label)}</span>
      ${f.note ? `<p class="stat-n">${esc(f.note)}</p>` : ""}${srcline(f.sources, f.id)}</div>`).join("")}</div></section>`;
};

V.compare = () => {
  const C = D.cities;
  return `<div class="page-head"><span class="tick">Section 06</span><h1>Side by Side</h1>
    <p class="lede">${esc(C.note)}</p></div>
  <div class="wrap">
    <div class="sec-head" style="margin-bottom:20px"><span class="tick">Two states</span><h2>Structural comparison</h2></div>
    <div style="display:flex; flex-direction:column; gap:1px; background:var(--rule); border:1px solid var(--rule)">
      ${C.countryPairs.map(p => `<div class="cmp">
        <div class="cmp-h"><span class="tick">${esc(p.point)}</span>${badge(p.status)}</div>
        <div class="cmp-b">
          <div class="cmp-side cmp-in"><span class="tick">India</span><p>${esc(p.india)}</p></div>
          <div class="cmp-side cmp-il"><span class="tick">Israel</span><p>${esc(p.israel)}</p></div>
        </div>
        <p class="cmp-o">${esc(p.observation)}</p>
        ${p.sources ? srcline(p.sources, "cmp-" + p.point.slice(0, 20)) : ""}
      </div>`).join("")}
    </div>
    <div class="sec-head" style="margin:52px 0 20px"><span class="tick">Two coasts</span><h2>City pairs</h2>
      <p>Not comparisons of size. Pairings by the role each city plays in this specific history.</p></div>
    <div class="grid">${C.cityPairs.map(p => `<div class="card">
      <div class="card-k"><span class="tl-sector">${esc(p.a)}</span><span style="color:var(--muted)">to</span><span class="tl-sector" style="color:var(--chart)">${esc(p.b)}</span></div>
      <p><strong style="color:var(--text); font-weight:500">${esc(p.a)}</strong> ${esc(p.aRole)}</p>
      <p><strong style="color:var(--text); font-weight:500">${esc(p.b)}</strong> ${esc(p.bRole)}</p>
      <p style="border-top:1px dashed var(--rule); padding-top:12px">${esc(p.link)}</p>
      ${srcline(p.sources, "citypair-" + p.a)}</div>`).join("")}</div>
    <div class="sec" style="padding-left:0; padding-right:0"><div class="sec-head"><span class="tick">Wanted</span><h2>Figures this page refuses to print without a source</h2></div>
      <ul style="padding-left:20px; color:var(--text-2); display:flex; flex-direction:column; gap:8px">${C.wanted.map(w => `<li>${esc(w)}</li>`).join("")}</ul></div>
  </div>`;
};

V.languages = () => {
  const L = D.languages;
  return `<div class="page-head"><span class="tick">Section 07</span><h1>Hebrew and Hindi</h1>
    <p class="lede">${esc(L.intro.lede)}</p></div>
  <div class="wrap">
    <p class="note-prose" style="margin-bottom:34px">${esc(L.intro.note)}</p>

    <div class="sec-head" style="margin-bottom:20px"><span class="tick">How the two systems work</span><h2>Not harder, differently shaped</h2></div>
    <div style="display:flex; flex-direction:column; gap:1px; background:var(--rule); border:1px solid var(--rule)">
      ${L.structure.map(s => `<div class="cmp"><div class="cmp-h"><span class="tick">${esc(s.point)}</span></div>
        <div class="cmp-b">
          <div class="cmp-side cmp-il"><span class="tick">Hebrew</span><p>${esc(s.hebrew)}</p></div>
          <div class="cmp-side cmp-in"><span class="tick">Hindi and Devanagari</span><p>${esc(s.hindi)}</p></div>
        </div></div>`).join("")}
    </div>

    <div class="sec-head" style="margin:52px 0 20px"><span class="tick">The Hebrew alphabet</span><h2>Twenty-two letters</h2>
      <p>Read right to left. The number beside each letter is its value, which is what makes gematria possible.</p></div>
    <div class="glyphgrid">${L.hebrewLetters.map(l => `<div class="glyphcell">
      <span class="glyph he">${l.glyph}</span><span class="gname">${esc(l.name)}</span>
      <span class="gtrans">${esc(l.translit)}</span><span class="gval num">${l.value}</span>
      ${l.note ? `<span class="gnote">${esc(l.note)}</span>` : ""}</div>`).join("")}</div>
    <p class="tick" style="margin-top:16px">Five letters take a final form at the end of a word:
      ${L.hebrewFinals.map(f => `<span class="he" style="font-size:20px; margin:0 6px">${f.glyph}</span>${esc(f.from)}`).join(" &nbsp; ")}</p>

    <div class="sec-head" style="margin:52px 0 20px"><span class="tick">Devanagari vowels</span><h2>The vowel and its mark</h2>
      <p>Each vowel has a standalone letter and an attached mark. The mark is what you actually write most of the time.</p></div>
    <div class="glyphgrid">${L.devanagariVowels.map(v => `<div class="glyphcell">
      <span class="glyph dv">${v.glyph}</span><span class="gname">${v.matra ? "क" + v.matra : "क"}</span>
      <span class="gtrans">${esc(v.translit)}</span>${v.note ? `<span class="gnote">${esc(v.note)}</span>` : ""}</div>`).join("")}</div>

    <div class="sec-head" style="margin:52px 0 20px"><span class="tick">Devanagari consonants</span><h2>A map of the mouth</h2></div>
    <div style="display:flex; flex-direction:column; gap:14px">
      ${L.devanagariConsonants.map(r => `<div><span class="tick">${esc(r.row)}</span>
        <div class="glyphrow">${r.letters.map(([g, t]) => `<div class="glyphcell sm"><span class="glyph dv">${g}</span><span class="gtrans">${esc(t)}</span></div>`).join("")}</div></div>`).join("")}
    </div>
    <p style="color:var(--text-2); max-width:68ch; margin-top:20px">${esc(L.devanagariNote)}</p>

    <div class="sec-head" style="margin:52px 0 20px"><span class="tick">Side by side</span><h2>The same idea in both</h2></div>
    <div class="tablewrap"><table><thead><tr><th>Meaning</th><th>Hebrew</th><th>Hindi</th><th>Note</th></tr></thead>
      <tbody>${L.phrases.map(p => `<tr><td>${esc(p.meaning)}</td>
        <td><span class="he" style="font-size:21px">${p.hebrew}</span><br><span class="tick">${esc(p.hebrewT)}</span></td>
        <td><span class="dv" style="font-size:21px">${p.hindi}</span><br><span class="tick">${esc(p.hindiT)}</span></td>
        <td style="color:var(--text-2)">${esc(p.note)}</td></tr>`).join("")}</tbody></table></div>

    <div class="sec-head" style="margin:52px 0 20px"><span class="tick">Where to learn</span><h2>Resources, with their status shown</h2>
      <p>${esc(L.resources.note)}</p></div>
    <div class="grid">
      <div class="card"><span class="tick">Hebrew</span>
        ${L.resources.hebrew.map(r => `<div style="padding:10px 0; border-bottom:1px solid var(--rule-soft)">
          <a href="${esc(r.url)}" target="_blank" rel="noopener" style="font-size:16px">${esc(r.name)}</a>
          <div class="card-k" style="margin-top:6px">${badge(r.status)}<span class="tick">${esc(r.kind)}</span></div>
          <p style="font-size:13.5px; margin-top:6px">${esc(r.note)}</p></div>`).join("")}</div>
      <div class="card"><span class="tick">Hindi</span>
        ${L.resources.hindi.map(r => `<div style="padding:10px 0; border-bottom:1px solid var(--rule-soft)">
          <a href="${esc(r.url)}" target="_blank" rel="noopener" style="font-size:16px">${esc(r.name)}</a>
          <div class="card-k" style="margin-top:6px">${badge(r.status)}<span class="tick">${esc(r.kind)}</span></div>
          <p style="font-size:13.5px; margin-top:6px">${esc(r.note)}</p></div>`).join("")}</div>
      <div class="card"><span class="tick">Still wanted</span>
        <ul style="padding-left:18px; color:var(--text-2); display:flex; flex-direction:column; gap:8px; font-size:14px">
          ${L.resources.wanted.map(w => `<li>${esc(w)}</li>`).join("")}</ul></div>
    </div>
  </div>`;
};

V.statements = () => {
  const S = D.statements;
  return `<div class="page-head"><span class="tick">Section 08</span><h1>The Statements Wall</h1>
    <p class="lede">${esc(S.note)}</p></div>
  <div class="wrap">
    <div class="empty" style="margin-bottom:32px"><span class="tick">On social media</span>
      <p style="margin-top:10px">${esc(S.socialNote)}</p></div>

    <div class="sec-head" style="margin-bottom:20px"><span class="tick">Layer one</span><h2>The official record of contact</h2>
      <p>Every logged interaction between the two governments that this project has found in a primary source, newest first.</p></div>
    <div style="display:flex; flex-direction:column; gap:1px; background:var(--rule); border:1px solid var(--rule)">
      ${S.interactions.map(i => `<article class="card" style="border-left:3px solid ${i.type === "Telephone call" ? "#6fb0dc" : "#e6b33e"}">
        <div class="card-k"><span class="tl-sector">${esc(i.dateLabel)}</span><span class="badge badge-primary">${esc(i.type)}</span>${badge(i.status)}</div>
        <h4 style="font-size:18px">${esc(i.parties)}</h4><p>${esc(i.summary)}</p>${srcline(i.sources, "interaction-" + i.date)}</article>`).join("")}
    </div>

    <div class="sec-head" style="margin:52px 0 20px"><span class="tick">Layer three</span><h2>Accounts tracked</h2></div>
    <div class="grid">${S.accounts.map(a => `<div class="card">
      <span class="tick">${a.country === "IN" ? "India" : "Israel"}</span><h4 style="font-size:17px">${esc(a.handle)}</h4>
      <p class="tick">${esc(a.kind)}</p>${a.note ? `<p style="font-size:13.5px">${esc(a.note)}</p>` : ""}</div>`).join("")}</div>
    ${S.posts.length ? "" : `<div class="empty" style="margin-top:24px">No posts added yet. Posts are added one at a time through the manager, by pasting the link.</div>`}
  </div>`;
};

V.library = () => {
  const A = D.articles;
  const total = A.articles.reduce((n, a) => n + words(a.body.join(" ")), 0);
  return `<div class="page-head"><span class="tick">Section 09</span><h1>The Library</h1>
    <p class="lede">Long form pieces written by this project. Each one states what kind of writing it is: a record of fact, an explainer, or an argument. Word counts are shown because a research site should be honest about its own size.</p></div>
  <div class="wrap">
    <p class="tick" style="margin-bottom:22px">${A.articles.length} pieces &nbsp;/&nbsp; ${total.toLocaleString()} words in the library</p>
    ${A.categories.map(c => {
      const rows = A.articles.filter(a => a.category === c.id);
      if (!rows.length) return "";
      return `<div style="margin-bottom:38px"><div class="tl-era"><h3>${esc(c.label)}</h3><i></i></div>
        <div class="grid">${rows.map(a => `<a class="card" href="#/article/${esc(a.id)}">
          <div class="card-k"><span class="tick">${esc(a.kind)}</span>${badge(a.status)}</div>
          <h4>${esc(a.title)}</h4><p>${esc(a.standfirst)}</p>
          <span class="tick num">${words(a.body.join(" "))} words</span></a>`).join("")}</div></div>`;
    }).join("")}
  </div>`;
};

V.article = (id) => {
  const a = D.articles.articles.find(x => x.id === id);
  if (!a) return `<div class="page-head"><h1>Not found</h1><p class="lede">No piece with that name. <a href="#/library">Back to the library</a>.</p></div>`;
  return `<div class="wrap" style="padding-top:clamp(38px,6vw,74px); max-width:900px">
    <a class="tick" href="#/library">Back to the library</a>
    <article class="paper" style="margin-top:20px">
      <div class="card-k"><span class="tick">${esc(a.kind)}</span>${badge(a.status)}<span class="tick num">${words(a.body.join(" "))} words</span></div>
      <h1 style="font-size:clamp(30px,4.4vw,46px); margin:16px 0 14px; color:#14181f">${esc(a.title)}</h1>
      <p style="font-size:19px; line-height:1.55; color:#3a3f47">${esc(a.standfirst)}</p>
      <div class="prose" style="margin-top:28px; font-size:16.5px; line-height:1.72">${a.body.map(p => `<p>${esc(p)}</p>`).join("")}</div>
      ${srcline(a.sources, a.id)}
    </article></div>`;
};

V.people = () => `<div class="page-head"><span class="tick">Section 10</span><h1>People</h1>
  <p class="lede">A register, not a hall of fame. Each entry records only what a named source states. Where this project knows little, it says little rather than filling the gap.</p></div>
  <div class="wrap"><input class="field" id="ppq" type="search" placeholder="Search people" aria-label="Search people" style="margin-bottom:22px">
  <div class="grid" id="ppbody"></div></div>`;

function renderPeople(q) {
  const body = $("#ppbody"); if (!body) return;
  const n = (q || "").toLowerCase().trim();
  const rows = D.people.filter(p => !n || (p.name + " " + p.field + " " + p.note).toLowerCase().includes(n));
  if (!rows.length) { body.innerHTML = `<div class="card"><p>No entry matches that search.</p></div>`; return; }
  body.innerHTML = rows.map(p => {
    const c = D.communities.find(x => x.id === p.community);
    return `<div class="card"><span class="tick">${esc(p.field)}</span><h4>${esc(p.name)}</h4>
      ${c ? `<span class="badge" style="color:${esc(c.colour)}; border-color:${esc(c.colour)}66">${esc(c.name)}</span>` : ""}
      <p>${esc(p.note)}</p>${srcline(p.sources, p.id)}</div>`;
  }).join("");
  $$("[data-flag]", body).forEach(b => b.addEventListener("click", () => openFlag(b.dataset.flag)));
}

V.archive = () => `<div class="page-head"><span class="tick">Section 11</span><h1>The Open Dataset</h1>
  <p class="lede">Every dated entry this project holds, with its source. This is the data the rest of the site is built on. It is open, and it is meant to be reused.</p></div>
  <div class="wrap">
    <input class="field" id="arcq" type="search" placeholder="Search the record: water, defence, 2025, trade" aria-label="Search the record">
    <div style="display:flex; gap:10px; margin:16px 0 22px; flex-wrap:wrap">
      <button class="btn" id="arccsv">Show as CSV</button><button class="btn" id="arcjson">Show as JSON</button>
      <span class="tick" style="align-self:center">On the live site the raw files are in /content/</span></div>
    <div id="arcraw"></div>
    <div class="tablewrap"><table><thead><tr><th>Date</th><th>Entry</th><th>Sector</th><th>Status</th><th>Source</th></tr></thead>
      <tbody id="arcbody"></tbody></table></div></div>`;

function renderArchive(q) {
  const body = $("#arcbody"); if (!body) return;
  const n = (q || "").toLowerCase().trim();
  const rows = D.timeline.slice().sort((a, b) => b.sortKey - a.sortKey)
    .filter(t => !n || (t.title + " " + t.body + " " + t.sector + " " + t.dateLabel).toLowerCase().includes(n));
  if (!rows.length) { body.innerHTML = `<tr><td colspan="5">No entry matches that search.</td></tr>`; return; }
  body.innerHTML = rows.map(t => {
    const sec = D.sectors.find(s => s.id === t.sector);
    const src = (t.sources || []).map(id => { const s = D.sources[id]; return s ? `<a class="src-chip" href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.publisher.split(",")[0])}</a>` : ""; }).join(" ");
    return `<tr><td class="y num">${esc(t.dateLabel)}</td><td><strong style="font-weight:500">${esc(t.title)}</strong></td>
      <td>${esc(sec ? sec.label : t.sector)}</td><td>${badge(t.status)}</td><td>${src}</td></tr>`;
  }).join("");
}

function archiveExport(kind) {
  const rows = D.timeline.slice().sort((a, b) => a.sortKey - b.sortKey);
  let text;
  if (kind === "csv") {
    const q = (s) => `"${String(s == null ? "" : s).replace(/"/g, '""')}"`;
    text = "date,title,sector,status,source_publisher,source_url\n" + rows.map(t => {
      const s = D.sources[(t.sources || [])[0]] || {};
      return [t.dateLabel, t.title, t.sector, t.status, s.publisher, s.url].map(q).join(",");
    }).join("\n");
  } else {
    text = JSON.stringify(rows.map(t => ({ date: t.dateLabel, title: t.title, sector: t.sector, status: t.status,
      sources: (t.sources || []).map(id => D.sources[id]).filter(Boolean) })), null, 2);
  }
  $("#arcraw").innerHTML = `<div style="border:1px solid var(--rule); background:var(--sea-900); padding:16px; margin-bottom:22px">
    <div style="display:flex; justify-content:space-between; align-items:center; gap:12px; margin-bottom:10px">
      <span class="tick">${kind.toUpperCase()} export, ${rows.length} rows</span><button class="btn" id="arccopy">Copy to clipboard</button></div>
    <pre style="max-height:320px; overflow:auto; margin:0; font-family:var(--mono); font-size:11.5px; color:var(--text-2); white-space:pre">${esc(text)}</pre></div>`;
  $("#arccopy").addEventListener("click", async (e) => {
    try { await navigator.clipboard.writeText(text); e.target.textContent = "Copied"; }
    catch { e.target.textContent = "Select the text above to copy"; }
  });
}

V.trace = () => {
  const opts = Object.entries(D.places).map(([id, p]) => `<option value="${esc(id)}">${esc(p.name)}</option>`).join("");
  return `<div class="page-head"><span class="tick">Section 12</span><h1>Trace a Connection</h1>
    <p class="lede">Pick a place in India and a place in Israel. The site assembles the chain it can actually evidence between them, and tells you plainly where the chain runs out.</p></div>
  <div class="wrap"><div style="display:flex; gap:12px; flex-wrap:wrap; margin-bottom:22px">
    <select class="field" id="trA" style="max-width:250px" aria-label="From">${opts}</select>
    <select class="field" id="trB" style="max-width:250px" aria-label="To">${opts}</select>
    <button class="btn btn-gold" id="trGo">Trace</button></div>
  <div class="trace-out" id="trOut"><p style="color:var(--muted)">Choose two points and press trace.</p></div></div>`;
};

function runTrace() {
  const a = $("#trA").value, b = $("#trB").value;
  const pa = D.places[a], pb = D.places[b], out = $("#trOut");
  if (!pa || !pb) return;
  const route = D.routes.find(r => (r.from === a && r.to === b) || (r.from === b && r.to === a));
  const comm = route ? D.communities.find(c => c.id === route.community) : null;
  const syn = D.synagogues.sites.filter(s => s.city.toLowerCase() === pa.name.toLowerCase() || s.city.toLowerCase() === pb.name.toLowerCase());
  const steps = [{ t: pa.name, d: pa.note || "No note recorded for this place yet." }];
  if (syn.length) steps.push({ t: `${syn.length} recorded site${syn.length === 1 ? "" : "s"}`, d: syn.map(s => s.name + (s.founded ? ", " + s.founded : "")).join(". ") });
  if (comm) {
    steps.push({ t: comm.name, d: comm.summary });
    steps.push({ t: "Migration", d: "The Embassy of India in Tel Aviv records the primary waves of migration from India as taking place in the 1950s and 1960s." });
  } else {
    steps.push({ t: "No documented route on file", d: "This project holds no evidenced community route between these two points. That is a gap in the record, not a statement that no connection existed. If you know of one with a source, flag it and it will be added." });
  }
  steps.push({ t: pb.name, d: pb.note || "No note recorded for this place yet." });
  out.innerHTML = steps.map((s, i) => `<div class="trace-step" style="animation-delay:${i * 0.13}s"><i></i><div><b>${esc(s.t)}</b><p>${esc(s.d)}</p></div></div>`).join("")
    + srcline(["eoi-telaviv"], "trace");
  $$("[data-flag]", out).forEach(x => x.addEventListener("click", () => openFlag(x.dataset.flag)));
}

V.questions = () => `<div class="page-head"><span class="tick">Section 13</span><h1>Open Questions</h1>
  <p class="lede">Research questions, not slogans. Each one is unsettled in the material this project has read so far. If you can close one with a source, the forum is the place.</p></div>
  <div class="wrap"><div class="grid">${D.questions.map((q, i) => `<div class="card">
    <span class="tick">Q${String(i + 1).padStart(2, "0")}</span><h4>${esc(q.q)}</h4><p>${esc(q.note)}</p></div>`).join("")}</div></div>`;

V.future = () => `<div class="page-head"><span class="tick">Section 14</span><h1>2047</h1>
  <p class="lede">India marks a hundred years of independence in 2047. Six ways the relationship could look by then. Pick the one you think is likeliest. Your choice is stored only in your own browser, so this is a thinking exercise, not a survey.</p></div>
  <div class="wrap"><div class="grid">${D.scenarios.map(s => `<button class="card scen" data-scen="${esc(s.id)}">
    <h4>${esc(s.title)}</h4><p>${esc(s.body)}</p><div class="scen-bar"><i data-bar="${esc(s.id)}"></i></div>
    <span class="tick" data-cnt="${esc(s.id)}"></span></button>`).join("")}</div>
  <p class="tick" style="margin-top:20px">Counts shown are from this browser only. A shared public tally needs a backend, which this project does not run.</p></div>`;

function wireFuture() {
  const KEY = "iicp.future.v1";
  let tally = {};
  try { tally = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch { tally = {}; }
  function paint() {
    const total = Object.values(tally).reduce((a, b) => a + b, 0) || 1;
    D.scenarios.forEach(s => {
      const n = tally[s.id] || 0;
      const bar = $(`[data-bar="${s.id}"]`), cnt = $(`[data-cnt="${s.id}"]`);
      if (bar) bar.style.width = Math.round((n / total) * 100) + "%";
      if (cnt) cnt.textContent = n ? `${n} pick${n === 1 ? "" : "s"} in this browser` : "Not picked yet";
    });
  }
  $$(".scen").forEach(b => b.addEventListener("click", () => {
    tally[b.dataset.scen] = (tally[b.dataset.scen] || 0) + 1;
    try { localStorage.setItem(KEY, JSON.stringify(tally)); } catch {}
    $$(".scen").forEach(x => x.classList.remove("picked"));
    b.classList.add("picked"); paint();
  }));
  paint();
}

V.newsroom = () => {
  const N = window.NEWS_DATA, items = (N && N.items) || [];
  return `<div class="page-head"><span class="tick">Section 15</span><h1>The Newsroom</h1>
    <p class="lede">Headlines and links only. This project does not reproduce anyone's article text. Every item goes to the publisher's own page, and every item is machine gathered, which means it is unverified until a person checks it.</p></div>
  <div class="wrap">${items.length ? `
    <p class="tick" style="margin-bottom:20px">Last gathered ${esc(N.generated || "unknown")} / ${items.length} items / ${esc((N.feedsOk || []).length)} of ${esc((N.feedsTried || []).length)} feeds responded</p>
    ${items.map(n => `<article class="news-item"><span class="tick">${esc(n.date || "")}</span>
      <div><span class="badge badge-press">${esc(n.source || "Unknown source")}</span>
      <h4 style="margin:8px 0 6px"><a href="${esc(n.link)}" target="_blank" rel="noopener">${esc(n.title)}</a></h4>
      <span class="tick">Machine gathered, not yet verified by an editor</span></div></article>`).join("")}
  ` : `<div class="empty"><strong style="font-weight:500; color:var(--text)">No headlines gathered yet.</strong>
    <p style="margin-top:10px">The gathering job runs on a schedule once the site is deployed and writes into <code>assets/js/news.js</code>. It tests every feed on every run and records which ones responded, so a dead feed shows up as dead rather than silently disappearing.</p></div>`}</div>`;
};

V.forum = () => `<div class="page-head"><span class="tick">Section 16</span><h1>The Forum</h1>
  <p class="lede">Discussion happens in a moderated community space rather than in an anonymous comment box. The rule that matters: bring a source or bring a question, and treat disagreement as normal.</p></div>
  <div class="wrap prose">
    ${CONFIG.communityInvite ? `<a class="btn btn-gold" href="${esc(CONFIG.communityInvite)}" target="_blank" rel="noopener">Join the community</a>`
      : `<div class="empty"><strong style="font-weight:500; color:var(--text)">Not connected yet.</strong><p style="margin-top:10px">Paste the community invite link into the manager and this becomes a live join button.</p></div>`}
    <h3 style="font-size:26px; margin:44px 0 16px">House rules</h3>
    <ol style="padding-left:20px; color:var(--text-2); display:flex; flex-direction:column; gap:12px; font-size:15px">
      <li><b>Sources before conclusions.</b> A claim without a source is an opinion, which is fine, but say so.</li>
      <li><b>No antisemitism, no Hinduphobia, no Islamophobia, no racism.</b> Attack arguments, not the people or communities holding them.</li>
      <li><b>No harassment and no doxxing.</b> Do not post anyone's private information, including your own.</li>
      <li><b>No fabricated sources.</b> Inventing a citation, a quote or a document is the one offence with no second chance here.</li>
      <li><b>No calls for violence</b> against anyone, anywhere, in any framing.</li>
      <li><b>Disagreement stays.</b> Nobody is removed for reaching a different conclusion from this site's. People are removed for the five rules above.</li>
      <li><b>Minors.</b> The community is for people aged sixteen and over.</li>
      <li><b>No private data in public channels.</b> Phone numbers, addresses, identity documents and travel details stay out, including your own.</li>
    </ol>
    <h3 style="font-size:26px; margin:44px 0 16px">How moderation works</h3>
    <p>Reports go to the moderation team, who are named in the community space. A first breach is a warning with the rule quoted. A second is a temporary removal. Fabricated sources and calls for violence are immediate and permanent. Moderation actions are logged so patterns are visible rather than deniable.</p>
    <h3 style="font-size:26px; margin:44px 0 16px">Safety, plainly</h3>
    <p>This subject attracts hostile attention from more than one direction. Three things reduce the risk for everyone taking part. Use a name you are comfortable having attached to this in public, which for many people will not be their legal name. Keep personal details out of public channels entirely. Report rather than argue with anything that looks like coordinated abuse, and let the moderators handle it.</p>
    <p>Direct messages between members are outside this project's control and cannot be moderated by it. Nobody here will ever ask you for money, identity documents, or a login. Treat any message that does as hostile, and report it.</p>
  </div>`;

V.blog = () => `<div class="page-head"><span class="tick">Section 17</span><h1>Submissions</h1>
  <p class="lede">This project publishes work by other people. Essays, community histories, translations, document finds, photo essays, and corrections to the record itself.</p></div>
  <div class="wrap prose">
    <h3 style="font-size:24px; margin-bottom:14px">What gets published</h3>
    <p style="color:var(--text-2)">Anything between 600 and 3,000 words carrying at least three sources a reader can check. Personal and family history counts, and is labelled as testimony rather than as documented history, which describes the evidence and is not a judgement on its worth.</p>
    <h3 style="font-size:24px; margin:34px 0 14px">What does not</h3>
    <p style="color:var(--text-2)">Anything with invented citations. Anything attacking a community rather than an argument. Anything that could identify a private individual without their consent. Anything already published elsewhere without the right to republish it.</p>
    <h3 style="font-size:24px; margin:34px 0 14px">The process</h3>
    <ol style="padding-left:20px; color:var(--text-2); display:flex; flex-direction:column; gap:10px">
      <li>Send the piece with its sources.</li><li>An editor checks that every source exists and says what the piece claims it says.</li>
      <li>You see the edited version before it goes up.</li><li>It publishes with your byline, the date, and a note that the views are the author's.</li></ol>
    <div style="margin-top:30px"><a class="btn btn-gold" id="submitbtn" href="#">Send a submission</a></div>
  </div>`;

V.corrections = () => {
  const C = D.corrections;
  return `<div class="page-head"><span class="tick">Section 18</span><h1>Corrections</h1>
    <p class="lede">Every flag raised on this site becomes a public record, and so does what happened to it. A project that hides its corrections is asking to be trusted rather than earning it.</p></div>
  <div class="wrap prose">
    <h3 style="font-size:24px; margin-bottom:14px">How to flag something</h3>
    <p style="color:var(--text-2)">Every factual block on this site carries a <em>Flag this</em> control. Press it and you get a pre-filled report with the exact item and page already recorded. Add what you think is wrong, and a source if you have one.</p>
    <h3 style="font-size:24px; margin:34px 0 14px">What happens next</h3>
    <ol style="padding-left:20px; color:var(--text-2); display:flex; flex-direction:column; gap:10px">
      <li>The flag appears publicly in the corrections queue.</li>
      <li>The claim is checked against its source.</li>
      <li>If the site is wrong, the page is fixed and the correction is listed here with the date and what changed.</li>
      <li>If the site is right, the flag stays visible with the reasoning, so the question does not have to be argued twice.</li>
      <li>If the sources genuinely conflict, the page is changed to show the conflict instead of picking a winner.</li></ol>
    <h3 style="font-size:24px; margin:34px 0 14px">Corrections made so far</h3>
    ${C.log && C.log.length ? C.log.map(l => `<div class="card"><span class="tick">${esc(l.date)}</span><p>${esc(l.text)}</p></div>`).join("")
      : `<div class="empty">None yet. When the first correction is made it will be listed here with its date, not quietly edited into the page.</div>`}
    <h3 style="font-size:24px; margin:34px 0 14px">Standing caveats</h3>
    ${(C.caveats || []).map(c => `<p style="color:var(--text-2)">${esc(c)}</p>`).join("")}
  </div>`;
};

V.support = () => `<div class="page-head"><span class="tick">Section 19</span><h1>Support the Project</h1>
  <p class="lede">This site costs nothing to run. Hosting is free, the code is free, and there are no advertisements and no trackers. What money helps with is documents.</p></div>
  <div class="wrap prose">
    <p style="color:var(--text-2)">Archive access, scanning, translation of Marathi, Malayalam and Hebrew material, travel to photograph buildings that are not yet recorded, and eventually a domain name. That is the whole list.</p>
    <div style="margin:30px 0">${CONFIG.supportLink
      ? `<a class="btn btn-gold" href="${esc(CONFIG.supportLink)}" target="_blank" rel="noopener">Buy the project a coffee</a>`
      : `<div class="empty"><strong style="font-weight:500; color:var(--text)">Not connected yet.</strong><p style="margin-top:10px">Paste the Ko-fi or Buy Me a Coffee link into the manager and this becomes a live button.</p></div>`}</div>
    <h3 style="font-size:24px; margin:34px 0 14px">What support does not buy</h3>
    <p style="color:var(--text-2)">It does not buy a mention, a page, a framing, or a place in the record. If that ever changes it will be said on this page before it happens, not after.</p>
    <h3 style="font-size:24px; margin:34px 0 14px">Other ways to help, which are worth more</h3>
    <ul style="padding-left:20px; color:var(--text-2); display:flex; flex-direction:column; gap:9px">
      <li>Flag anything on this site you believe is wrong.</li>
      <li>Photograph a synagogue or a cemetery that this directory has not recorded, and send it with permission to publish.</li>
      <li>Send a document or a family record with permission to publish it.</li>
      <li>Translate one page into Hindi, Marathi, Malayalam or Hebrew.</li>
      <li>Tell someone who works on this material that the site exists.</li></ul>
  </div>`;

V.about = () => `<div class="page-head"><span class="tick">Section 20</span><h1>About</h1></div>
  <div class="wrap"><div class="paper prose">
    <p style="font-size:19px; line-height:1.6">The India-Israel Civilisations Project is an independent digital research and public knowledge initiative documenting the historical, social, cultural, intellectual, economic and strategic connections between India and Israel.</p>
    <h3 style="font-size:22px; margin:32px 0 12px">What it is</h3>
    <p>An independent project that documents the India-Israel relationship and supports its deepening. It is not neutral about whether that relationship is worth having, and it does not pretend otherwise. What it is strict about is evidence: the case for something is only as good as the sources under it.</p>
    <h3 style="font-size:22px; margin:32px 0 12px">What it is not</h3>
    <p>Not a government website. Not an embassy. Not a political party, a registered organisation, a news agency, or a lobbying firm. Nobody pays for anything on it.</p>
    <h3 style="font-size:22px; margin:32px 0 12px">How claims are handled</h3>
    <p>Every factual record in this site carries at least one source, and the build refuses to publish a record that does not. Claims are labelled by the kind of evidence behind them: a government document is not the same as an encyclopaedia entry, and neither is the same as a community tradition. All three appear here, each under its own label.</p>
    <p>Where two official sources disagree, both are shown. Where the record has a gap, the gap is stated rather than smoothed over.</p>
    <h3 style="font-size:22px; margin:32px 0 12px">On the parts that are contested</h3>
    <p>This project is about India and Israel, and readers will already know that the wider region is the subject of serious and ongoing dispute. Pages here do not present that dispute as settled, and the forum does not require anyone to agree with the project's own view in order to take part.</p>
    <h3 style="font-size:22px; margin:32px 0 12px">Maps</h3>
    <p>The maps use the India point of view geodata published by amCharts. India is drawn as the Government of India depicts it, including Jammu and Kashmir, Ladakh and Aksai Chin, with the 2023 state and union territory boundaries.</p>
    <p>Several of those boundaries are disputed internationally, and other governments publish different depictions of the same ground. This project does not draw or adjust any boundary itself. It selects a published dataset, names it on every map, and leaves the reader able to check what they are looking at.</p>
    <p>The most widely used free datasets draw India stopping short of Aksai Chin and Gilgit-Baltistan. A site about India, published from India, using one of those would be showing its readers a map their own government does not recognise, so it does not.</p>
    <h3 style="font-size:22px; margin:32px 0 12px">Corrections</h3>
    <p>Everything on this site can be flagged, and corrections are published rather than quietly applied. See the corrections page.</p>
    <h3 style="font-size:22px; margin:32px 0 12px">Reuse</h3>
    <p>The data is open. Take it, check it, and use it. If it is wrong, say so and it gets fixed.</p>
    <p class="tick" style="margin-top:30px">Record last reviewed ${esc(D.meta.lastReviewed)}</p>
  </div></div>`;


V.centres = () => {
  const C = D.centres;
  const total = C.states.reduce((n, s) => n + s.n, 0);
  const max = Math.max(...C.states.map(s => s.n));
  return `<div class="page-head"><span class="tick">Section 05</span><h1>Centres of Excellence</h1>
    <p class="lede">${esc(C.note)}</p></div>
  <div class="wrap">
    <div class="sec-head" style="margin-bottom:20px"><span class="tick">How many exist</span>
      <h2>Five official counts, five different numbers</h2>
      <p>This is not carelessness by anyone. Centres open, are approved before they open, and are counted differently depending on whether a source counts approvals or operations. The dates are what make the list readable.</p></div>
    <div class="tablewrap"><table><thead><tr><th>As of</th><th>What the source says</th><th>Source</th></tr></thead><tbody>
      ${C.counts.map(c => `<tr><td class="y">${esc(c.asOf)}</td><td>${esc(c.text)}</td>
        <td>${(c.sources || []).map(id => { const s = D.sources[id];
          return s ? `<a class="src-chip" href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.publisher.split(",")[0])}</a>` : ""; }).join(" ")}</td></tr>`).join("")}
    </tbody></table></div>

    <div class="sec-head" style="margin:52px 0 20px"><span class="tick">${total} centres in ${C.states.length} states</span>
      <h2>Where they actually are</h2>
      <p>As listed by the Embassy of Israel in New Delhi. Not one of these is in a capital city. They sit in district agricultural stations, which is where an abstraction about cooperation turns into a particular crop in a particular place.</p></div>
    <div style="display:flex; flex-direction:column; gap:1px; background:var(--line); border:1px solid var(--line)">
      ${C.states.map(s => `<div class="cmp" style="padding:18px 22px">
        <div style="display:flex; align-items:baseline; gap:14px; flex-wrap:wrap; margin-bottom:8px">
          <h4 style="font-size:19px">${esc(s.state)}</h4>
          <span class="tick num">${s.n} centre${s.n === 1 ? "" : "s"}</span>
          <span style="flex:1; min-width:80px"><span class="scen-bar" style="display:block"><i style="width:${Math.round(s.n / max * 100)}%; display:block; height:100%; background:var(--accent-2)"></i></span></span>
        </div>
        <p style="font-size:14.5px; color:var(--ink-2); margin:0">${esc(s.centres)}</p>
      </div>`).join("")}
    </div>

    <div class="sec-head" style="margin:52px 0 20px"><span class="tick">Outward</span><h2>Villages of Excellence</h2></div>
    <p class="note-prose">${esc(C.villages)}</p>

    <div class="sec-head" style="margin:52px 0 20px"><span class="tick">The water track</span><h2>Named projects, by place</h2>
      <p>Water cooperation is easier to state precisely than most of this relationship, because it lands as plant and paperwork in identifiable towns.</p></div>
    <div class="grid">${C.water.map(w => `<div class="card">
      <span class="tick">${esc(w.place)}</span><p>${esc(w.text)}</p></div>`).join("")}</div>

    ${srcline(C.sources, "centres")}
  </div>`;
};

/* ============================================================
   ROUTER
   ============================================================ */
const GROUPS = [
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
const ROUTES = [["home", "Home", "00"], ...GROUPS.flatMap(g => g.items)];

function go(hash) {
  const parts = (hash || "").replace(/^#\//, "").split("/");
  let name = parts[0] || "home";
  const arg = parts[1];
  if (!V[name]) name = "home";
  const main = $("#main");
  main.innerHTML = `<div class="view on">${name === "article" ? V.article(arg) : V[name]()}</div>` + footHTML();
  scrollTo(0, 0);
  $$("[data-route]").forEach(el => el.classList.toggle("on", el.dataset.route === name));
  $$(".navtop").forEach(b => b.classList.toggle("on",
    (GROUPS[+b.dataset.g] || { items: [] }).items.some(i => i[0] === name)));
  const r = ROUTES.find(x => x[0] === name);
  document.title = (name === "home" ? "" : ((r ? r[1] : "Reading") + " / ")) + "The India-Israel Civilisations Project";

  if (name === "timeline") {
    renderTimeline("all");
    $$("#tlfilters .chip").forEach(c => c.addEventListener("click", () => {
      $$("#tlfilters .chip").forEach(x => x.classList.remove("on"));
      c.classList.add("on"); renderTimeline(c.dataset.sector);
    }));
  }
  if (name === "chart" || name === "synagogues") wireMap(main);
  if (name === "synagogues") { renderSyn(""); $("#synq").addEventListener("input", e => renderSyn(e.target.value)); }
  if (name === "archive") {
    renderArchive(""); $("#arcq").addEventListener("input", e => renderArchive(e.target.value));
    $("#arccsv").addEventListener("click", () => archiveExport("csv"));
    $("#arcjson").addEventListener("click", () => archiveExport("json"));
  }
  if (name === "people") { renderPeople(""); $("#ppq").addEventListener("input", e => renderPeople(e.target.value)); }
  if (name === "trace") $("#trGo").addEventListener("click", runTrace);
  if (name === "future") wireFuture();
  if (name === "blog") { const b = $("#submitbtn"); if (b) b.addEventListener("click", e => { e.preventDefault(); openFlag("submission", true); }); }
  $$("[data-flag]").forEach(b => b.addEventListener("click", () => openFlag(b.dataset.flag)));
  const sf = $("#subform");
  if (sf) sf.addEventListener("submit", e => {
    e.preventDefault();
    $("#subnote").textContent = "There is no mailing list running yet, so nothing was sent and nothing was stored. When one exists this form will connect to it and this line will say so.";
  });
  closeRail();
}

function footHTML() {
  const totalWords = D.articles.articles.reduce((n, a) => n + words(a.body.join(" ")), 0);
  const col = (h, items) => `<div><h5>${h}</h5><ul>${items.map(i =>
    `<li><a href="#/${i[0]}">${esc(i[1])}</a></li>`).join("")}</ul></div>`;
  return `<footer class="foot"><div class="foot-in">
    <div class="foot-name">INDIA <i>&times;</i> ISRAEL<i>.</i></div>
    <p class="foot-lede">An independent research and public knowledge project documenting the connections between India and Israel. Not a government site, not an embassy, not a registered organisation.</p>
    <div class="foot-cols">
      ${col("Explore", GROUPS[0].items)}
      ${col("Compare", GROUPS[1].items)}
      ${col("Read", GROUPS[2].items)}
      ${col("Take part", GROUPS[4].items.slice(0, 4))}
      <div><h5>The record</h5>
        <p class="num">Last reviewed ${esc(D.meta.lastReviewed)}<br>
        ${D.timeline.length} dated entries<br>
        ${D.synagogues.sites.length} sites recorded<br>
        ${Object.keys(D.sources).length} sources on file<br>
        ${totalWords.toLocaleString()} words in the library</p>
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
  </div></footer>`;
}

function openFlag(factId, isSubmission) {
  const repoSet = CONFIG.githubRepo && !CONFIG.githubRepo.startsWith("YOUR-USERNAME");
  const title = isSubmission ? "Submission: " : `Correction: ${factId || "unspecified item"}`;
  const bodyText = isSubmission
    ? "Title:\n\nWord count:\n\nSources (at least three, with links):\n1.\n2.\n3.\n\nYour name as it should appear:\n\nThe piece (paste or link):\n"
    : `Item flagged: ${factId || "unspecified"}\nPage: ${location.href}\n\nWhat is wrong:\n\n\nSource showing the correct information (a link is ideal):\n\n\nAnything else:\n`;
  const url = repoSet ? `https://github.com/${CONFIG.githubRepo}/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(bodyText)}&labels=${isSubmission ? "submission" : "correction"}` : null;
  $("#modal-body").innerHTML = `<span class="tick">${isSubmission ? "Send a submission" : "Flag an error"}</span>
    <h3 style="font-size:27px; margin:12px 0 14px">${isSubmission ? "Send this project a piece" : "Tell this project it is wrong"}</h3>
    <p style="color:var(--text-2); font-size:15px">${isSubmission
      ? "Submissions open as a public post so the editorial process is visible. If you would rather send it privately, use the community space instead."
      : "Flags open as a public record so that corrections cannot be quietly made or quietly ignored. Nothing about you is collected by this site."}</p>
    ${url ? `<div style="margin-top:22px"><a class="btn btn-gold" href="${esc(url)}" target="_blank" rel="noopener">Open the pre-filled form</a></div>`
      : `<div class="empty" style="margin-top:22px"><strong style="font-weight:500; color:var(--text)">Not connected yet.</strong>
        <p style="margin-top:10px">Set the repository in the manager and this button opens a pre-filled public report. Until then, here is what would be sent:</p>
        <pre style="margin-top:14px; white-space:pre-wrap; font-family:var(--mono); font-size:11.5px; color:var(--text-2)">${esc(bodyText)}</pre></div>`}`;
  $("#modal").classList.add("on");
  $(".modal-x").focus();
}

const openRail = () => {
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
}

/* ============================================================
   BOOT
   ============================================================ */
const FILES = ["core", "timeline", "communities", "people", "articles", "cities", "languages", "statements", "synagogues", "centres", "corrections", "geo"];

async function loadContent() {
  if (window.SITE_DATA_INLINE) return window.SITE_DATA_INLINE;
  const out = {};
  await Promise.all(FILES.map(async f => {
    try {
      const r = await fetch(`content/${f}.json`, { cache: "no-cache" });
      if (!r.ok) throw new Error(r.status);
      const j = await r.json();
      if (f === "geo") out.geo = j;
      else if (f === "articles") out.articles = j;
      else if (f === "cities") out.cities = j;
      else if (f === "languages") out.languages = j;
      else if (f === "statements") out.statements = j;
      else if (f === "synagogues") out.synagogues = j;
      else if (f === "centres") out.centres = j;
      else if (f === "corrections") out.corrections = j;
      else Object.assign(out, j);
    } catch (e) { console.error("Could not load content/" + f + ".json", e); }
  }));
  return out;
}

async function boot() {
  D = await loadContent();
  if (!D.timeline) {
    $("#main").innerHTML = `<div class="wrap"><div class="empty"><strong style="color:var(--text)">Content did not load.</strong>
      <p style="margin-top:10px">The site reads its content from the files in /content/. If you are opening index.html directly from disk, a browser will block that for security reasons. Use a local server, or view the deployed site.</p></div></div>`;
    return;
  }
  const link = r => `<a href="#/${r[0]}" data-route="${r[0]}"><span>${r[2]}</span>${esc(r[1])}</a>`;
  $("#mainnav").innerHTML = "<ul>" + GROUPS.map((g, i) =>
    `<li><button class="navtop" data-g="${i}">${esc(g.label)} <b>&#9660;</b></button>
      <ul class="drop">${g.items.map(r => `<li>${link(r)}</li>`).join("")}</ul></li>`).join("") + "</ul>";

  $("#drawernav").innerHTML = GROUPS.map((g, i) =>
    `<div class="dgroup" data-dg="${i}">
      <button class="dhead">${esc(g.label)} <b>&#9660;</b></button>
      <div class="dbody">${g.items.map(link).join("")}</div>
    </div>`).join("");

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
  $("#scrim").addEventListener("click", closeRail);
  $(".modal-x").addEventListener("click", () => $("#modal").classList.remove("on"));
  $("#modal").addEventListener("click", e => { if (e.target.id === "modal") $("#modal").classList.remove("on"); });
  addEventListener("keydown", e => { if (e.key === "Escape") { $("#modal").classList.remove("on"); closeRail(); } });
  go(location.hash);
}

document.addEventListener("DOMContentLoaded", boot);
