/* =========================================================================
   mppl.style — анкета-бриф
   ========================================================================= */

/* ▼▼▼ CONFIG — єдине місце, яке потрібно змінити ▼▼▼ */
const CONFIG = {
  // URL для надсилання відповідей. Наприклад, Formspree: "https://formspree.io/f/abcdwxyz"
  // Порожній рядок = демо-режим: відповіді лише зберігаються локально й завантажуються файлом.
  SUBMIT_ENDPOINT: "https://formspree.io/f/xljbrbek",
  // true — надсилати фото як файли (multipart). Formspree приймає файли лише на платних тарифах.
  // false — фото не надсилаються; клієнтку просять надіслати завантажений HTML-файл.
  SEND_PHOTOS: false,
  // Куди клієнтці надіслати файл з фото/відповідями (показується на екрані подяки).
  STYLIST_CONTACT: "hello@mppl.style",
  STYLIST_NAME: "Маша"
};
/* ▲▲▲ CONFIG ▲▲▲ */

(() => {
  "use strict";
  const B = window.BRIEF;
  const STEPS = B.steps;
  const LS_KEY = "mppl-brief-v1";
  const HOURS_COLORS = ["#8C4A32", "#C98A6B", "#E3C3A8", "#6B6E3A", "#A9B38A", "#1F2C4C"];
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- State ---------- */
  let state = { answers: {}, step: 0, maxStep: 0, started: false, submitted: false, updated: null };
  try { const s = JSON.parse(localStorage.getItem(LS_KEY)); if (s && s.answers) state = Object.assign(state, s); } catch (e) {}
  const A = () => state.answers;
  let photos = {}; // fieldId -> [{name, dataUrl}]

  let saveTimer;
  function save(now) {
    clearTimeout(saveTimer);
    const run = () => {
      state.updated = new Date().toISOString();
      try { localStorage.setItem(LS_KEY, JSON.stringify(state)); setSaved(); } catch (e) {}
    };
    now ? run() : (saveTimer = setTimeout(run, 300));
  }
  function setSaved() {
    const el = $("#savestate");
    el.textContent = "Збережено";
    clearTimeout(setSaved.t);
    setSaved.t = setTimeout(() => (el.textContent = ""), 2200);
  }

  /* ---------- IndexedDB for photos ---------- */
  const idb = (() => {
    let dbp;
    const open = () => dbp || (dbp = new Promise((res, rej) => {
      const r = indexedDB.open("mppl-brief", 1);
      r.onupgradeneeded = () => r.result.createObjectStore("photos");
      r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error);
    }));
    const tx = (mode, fn) => open().then((db) => new Promise((res, rej) => {
      const t = db.transaction("photos", mode); const st = t.objectStore("photos");
      const out = fn(st); t.oncomplete = () => res(out && out.result); t.onerror = () => rej(t.error);
    }));
    return {
      set: (k, v) => tx("readwrite", (s) => s.put(v, k)).catch(() => {}),
      all: () => open().then((db) => new Promise((res) => {
        const o = {}; const c = db.transaction("photos").objectStore("photos").openCursor();
        c.onsuccess = () => { const cur = c.result; if (cur) { o[cur.key] = cur.value; cur.continue(); } else res(o); };
        c.onerror = () => res(o);
      })).catch(() => ({})),
      clear: () => tx("readwrite", (s) => s.clear()).catch(() => {})
    };
  })();

  /* ---------- Rendering ---------- */
  const optTag = (f) => f.required ? '<span class="req" aria-hidden="true">*</span>' : (f.optional ? '<span class="opt">необов’язково</span>' : "");
  const hint = (f) => f.hint ? `<p class="field__hint" id="${f.id}-hint">${esc(f.hint)}</p>` : "";
  const err = (f) => `<p class="field__error" id="${f.id}-err" role="alert"></p>`;
  const describedBy = (f) => [f.hint ? `${f.id}-hint` : "", `${f.id}-err`].filter(Boolean).join(" ");

  function rangeText(f, v) {
    v = Number(v);
    if (f.unit) return `${v}${f.plusAtMax && v >= f.max ? "+" : ""} ${f.unit}`;
    return `${v} / ${f.max}`;
  }

  function renderField(f) {
    const a = A(); const v = a[f.id];
    switch (f.type) {
      case "text": case "email": case "tel": case "url":
        return `<div class="field" data-id="${f.id}"><label class="field__label" for="${f.id}">${esc(f.label)}${optTag(f)}</label>${hint(f)}
          <input class="input" id="${f.id}" name="${f.id}" type="${f.type}" ${f.autocomplete ? `autocomplete="${f.autocomplete}"` : ""} placeholder="${esc(f.placeholder || "")}" value="${esc(v || "")}" aria-describedby="${describedBy(f)}" ${f.required ? 'aria-required="true"' : ""}>${err(f)}</div>`;
      case "textarea":
        return `<div class="field" data-id="${f.id}"><label class="field__label" for="${f.id}">${esc(f.label)}${optTag(f)}</label>${hint(f)}
          <textarea class="textarea" id="${f.id}" name="${f.id}" rows="${f.rows || 3}" placeholder="${esc(f.placeholder || "")}" aria-describedby="${describedBy(f)}" ${f.required ? 'aria-required="true"' : ""}>${esc(v || "")}</textarea>${err(f)}</div>`;
      case "chips": case "radio": {
        const multi = f.type === "chips"; const vals = multi ? (v || []) : [v];
        const opts = f.options.map((o, i) => `<label class="chip"><input type="${multi ? "checkbox" : "radio"}" name="${f.id}" value="${esc(o)}" ${vals.includes(o) ? "checked" : ""}><span>${esc(o)}</span></label>`).join("");
        const other = f.other ? `<div class="other"><label class="sr" for="${f.id}__other">Інше (свій варіант)</label><input class="input" id="${f.id}__other" name="${f.id}__other" placeholder="Інше — допиши своє" value="${esc(a[f.id + "__other"] || "")}"></div>` : "";
        return `<fieldset class="field" data-id="${f.id}" aria-describedby="${describedBy(f)}"><legend>${esc(f.label)}${optTag(f)}</legend>${hint(f)}<div class="chips" ${f.max ? `data-max="${f.max}"` : ""}>${opts}</div>${other}${err(f)}</fieldset>`;
      }
      case "swatches": {
        const vals = v || [];
        const sw = B.palette.map(([n, c]) => `<label class="sw"><input type="checkbox" name="${f.id}" value="${esc(n)}" ${vals.includes(n) ? "checked" : ""}><span class="dot" style="--c:${c}" aria-hidden="true"></span><span class="nm">${esc(n)}</span></label>`).join("");
        return `<fieldset class="field" data-id="${f.id}"><legend>${esc(f.label)}${optTag(f)}</legend>${hint(f)}<div class="swatches">${sw}</div>${err(f)}</fieldset>`;
      }
      case "range": {
        const val = v ?? f.value;
        return `<div class="field" data-id="${f.id}"><label class="field__label" for="${f.id}">${esc(f.label)}${optTag(f)}</label>${hint(f)}
          <div class="range"><output class="range__value" for="${f.id}" id="${f.id}-out">${esc(rangeText(f, val))}</output>
          <input type="range" id="${f.id}" name="${f.id}" min="${f.min}" max="${f.max}" step="${f.step}" value="${val}" aria-valuetext="${esc(rangeText(f, val) + " — " + f.left + " ↔ " + f.right)}" data-touched="${v != null}">
          <div class="range__ends" aria-hidden="true"><span>${esc(f.left)}</span><span>${esc(f.right)}</span></div></div>${err(f)}</div>`;
      }
      case "scale": {
        let o = "";
        for (let i = f.min; i <= f.max; i++) o += `<label class="chip"><input type="radio" name="${f.id}" value="${i}" ${String(v) === String(i) ? "checked" : ""} aria-label="${i}${i === f.min ? " — " + f.left : i === f.max ? " — " + f.right : ""}"><span>${i}</span></label>`;
        return `<fieldset class="field" data-id="${f.id}"><legend>${esc(f.label)}${optTag(f)}</legend>${hint(f)}<div class="scale">${o}</div><div class="scale__ends" aria-hidden="true"><span>${esc(f.left)}</span><span>${esc(f.right)}</span></div>${err(f)}</fieldset>`;
      }
      case "number":
        return `<div><label for="${f.id}">${esc(f.label)}</label><div class="unitwrap"><input class="input" type="number" inputmode="decimal" id="${f.id}" name="${f.id}" min="${f.min}" max="${f.max}" step="${f.step || 1}" placeholder="${esc(f.placeholder || "")}" value="${esc(v ?? "")}"><span class="unit" aria-hidden="true">${esc(f.unit || "")}</span></div></div>`;
      case "group": {
        const measure = f.id === "measure" || f.id === "feet";
        const h = f.hint ? (measure ? `<p class="measure-hint" id="${f.id}-hint"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="2" y="8" width="20" height="8" rx="2"/><path d="M6 8v3M10 8v4M14 8v3M18 8v4"/></svg><span>${esc(f.hint)}</span></p>` : hint(f)) : "";
        return `<fieldset class="field" data-id="${f.id}"><legend>${esc(f.label)}${optTag(f)}</legend>${h}<div class="group">${f.fields.map((sf) => sf.type === "number" ? renderField(sf) :
          `<div><label for="${sf.id}">${esc(sf.label)}</label><input class="input" id="${sf.id}" name="${sf.id}" placeholder="${esc(sf.placeholder || "")}" value="${esc(a[sf.id] || "")}"></div>`).join("")}</div>${err(f)}</fieldset>`;
      }
      case "hours": {
        const hv = v || {};
        const rows = f.rows.map((r, i) => `<div class="hours__row"><span class="hours__key" style="--k:${HOURS_COLORS[i]}" aria-hidden="true"></span><label for="h-${r.id}">${esc(r.label)}</label><div class="unitwrap"><input class="input" type="number" inputmode="numeric" min="0" max="112" id="h-${r.id}" data-hours="${r.id}" placeholder="0" value="${esc(hv[r.id] ?? "")}"><span class="unit" aria-hidden="true">год</span></div></div>`).join("");
        return `<fieldset class="field" data-id="${f.id}"><legend>${esc(f.label)}${optTag(f)}</legend>${hint(f)}<div class="hours">${rows}
          <div class="hours__bar" aria-hidden="true">${f.rows.map((r, i) => `<span data-bar="${r.id}" style="--k:${HOURS_COLORS[i]};width:0"></span>`).join("")}</div>
          <div class="hours__total" aria-live="polite"><span>Разом: <b data-total>0</b> з ~112 год</span><span data-left></span></div>
          <p class="hours__summary" data-summary></p></div>${err(f)}</fieldset>`;
      }
      case "file": {
        return `<div class="field" data-id="${f.id}"><span class="field__label" id="${f.id}-lbl">${esc(f.label)}${optTag(f)}</span>${hint(f)}
          <label class="drop"><input type="file" accept="image/*" ${f.multiple ? "multiple" : ""} id="${f.id}" data-file="${f.id}" aria-labelledby="${f.id}-lbl" aria-describedby="${describedBy(f)}">
          <span class="drop__icon" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 16V4m0 0l-4 4m4-4l4 4"/><path d="M4 16v3a1 1 0 001 1h14a1 1 0 001-1v-3"/></svg></span>
          <span class="drop__text"><b>Обрати фото</b> або перетягнути сюди<br>JPG, PNG, HEIC</span></label>
          <div class="thumbs" data-thumbs="${f.id}"></div>${err(f)}</div>`;
      }
      case "consent":
        return `<div class="field" data-id="${f.id}"><label class="consent"><input type="checkbox" id="${f.id}" name="${f.id}" ${v ? "checked" : ""} aria-describedby="${f.id}-err" aria-required="true"><span>${esc(f.label)}</span></label>${err(f)}</div>`;
    }
    return "";
  }

  function renderStep() {
    const s = STEPS[state.step];
    const isPhotos = s.id === "photos";
    const fieldsHtml = s.fields.map(renderField).join("");
    $("#step").innerHTML = `<header class="step__head"><span class="step__kicker">${s.kicker} / ${String(STEPS.length).padStart(2, "0")}</span>
      <h2 class="step__title" id="step-title" tabindex="-1">${esc(s.title)}</h2><p class="step__intro">${esc(s.intro)}</p></header>
      <div class="form-error" id="form-error" role="alert" hidden></div>
      ${isPhotos ? fieldsHtml.replace(/^/, "") : fieldsHtml}`;
    const st = $("#step"); st.classList.remove("enter"); void st.offsetWidth; st.classList.add("enter");
    $("#prev").style.visibility = state.step === 0 ? "hidden" : "visible";
    const last = state.step === STEPS.length - 1;
    $("#next").textContent = last ? "Надіслати бриф" : "Далі →";
    $("#navhint").textContent = last ? "" : `Далі: ${STEPS[state.step + 1].title}`;
    $("#counter").textContent = `${String(state.step + 1).padStart(2, "0")} / ${String(STEPS.length).padStart(2, "0")}`;
    const pct = Math.round((state.step / STEPS.length) * 100);
    $("#progress span").style.width = pct + "%";
    $("#progress").setAttribute("aria-valuenow", pct);
    $("#progress").setAttribute("aria-valuetext", `Розділ ${state.step + 1} з ${STEPS.length}: ${s.title}`);
    renderNav();
    s.fields.forEach((f) => { if (f.type === "hours") updateHours(f); if (f.type === "file") renderThumbs(f.id); if (f.max) enforceMax(f.id, f.max); });
    document.title = `${s.title} · Анкета-бриф · mppl.style`;
  }

  function renderNav() {
    $("#stepnav").innerHTML = STEPS.map((s, i) => {
      const cls = i === state.step ? "is-current" : i < state.maxStep || (i <= state.maxStep && i !== state.step) ? "is-done" : "";
      const dis = i > state.maxStep;
      return `<li class="${cls}" ${dis ? 'aria-disabled="true"' : ""}><button type="button" data-goto="${i}" ${i === state.step ? 'aria-current="step"' : ""} ${dis ? "tabindex=-1" : ""}><span class="n">${s.kicker}</span>${esc(s.title)}</button></li>`;
    }).join("");
  }

  /* ---------- Hours ---------- */
  function updateHours(f) {
    const hv = A()[f.id] || {};
    const total = f.rows.reduce((t, r) => t + (Number(hv[r.id]) || 0), 0);
    const box = $(`[data-id="${f.id}"]`); if (!box) return;
    f.rows.forEach((r) => { const b = box.querySelector(`[data-bar="${r.id}"]`); b.style.width = total ? ((Number(hv[r.id]) || 0) / Math.max(total, 112)) * 100 + "%" : "0"; });
    box.querySelector("[data-total]").textContent = total;
    const tw = box.querySelector(".hours__total"); tw.classList.toggle("warn", total > 112);
    box.querySelector("[data-left]").textContent = total > 112 ? "Більше, ніж є у тижні 🙂" : total ? `ще ~${112 - total} год` : "";
    const home = (Number(hv.remote) || 0) + (Number(hv.home) || 0);
    box.querySelector("[data-summary]").textContent = total ? `≈ ${Math.round((home / total) * 100)}% часу вдома, ${Math.round(((total - home) / total) * 100)}% — поза домом.` : "";
  }

  /* ---------- Photos ---------- */
  function compress(file) {
    return new Promise((res) => {
      const rd = new FileReader();
      rd.onload = () => {
        const img = new Image();
        img.onload = () => {
          const max = 1400; let { width: w, height: h } = img;
          if (w > max || h > max) { const k = max / Math.max(w, h); w = Math.round(w * k); h = Math.round(h * k); }
          const c = document.createElement("canvas"); c.width = w; c.height = h;
          c.getContext("2d").drawImage(img, 0, 0, w, h);
          res({ name: file.name, dataUrl: c.toDataURL("image/jpeg", 0.82) });
        };
        img.onerror = () => res(null);
        img.src = rd.result;
      };
      rd.onerror = () => res(null);
      rd.readAsDataURL(file);
    });
  }
  async function addPhotos(id, files, multiple) {
    const list = (await Promise.all([...files].filter((f) => /^image\//.test(f.type) || /\.(heic|heif)$/i.test(f.name)).map(compress))).filter(Boolean);
    const errEl = $(`#${id}-err`);
    if (!list.length) { if (errEl) errEl.textContent = "Не вдалося прочитати фото. Спробуй JPG або PNG."; return; }
    if (errEl) errEl.textContent = "";
    photos[id] = multiple ? [...(photos[id] || []), ...list].slice(0, 6) : [list[0]];
    await idb.set(id, photos[id]);
    A()[id] = photos[id].map((p) => p.name); save();
    renderThumbs(id);
  }
  function renderThumbs(id) {
    const el = $(`[data-thumbs="${id}"]`); if (!el) return;
    el.innerHTML = (photos[id] || []).map((p, i) => `<div class="thumb"><img src="${p.dataUrl}" alt="${esc(p.name)}"><button type="button" data-rm="${id}" data-i="${i}" aria-label="Видалити фото ${esc(p.name)}">×</button></div>`).join("");
  }

  /* ---------- Events ---------- */
  function enforceMax(id, max) {
    const boxes = [...document.querySelectorAll(`input[name="${id}"]`)];
    const n = boxes.filter((b) => b.checked).length;
    boxes.forEach((b) => (b.disabled = !b.checked && n >= max));
  }
  function findField(id) {
    for (const s of STEPS) for (const f of s.fields) { if (f.id === id) return f; if (f.fields) for (const sf of f.fields) if (sf.id === id) return sf; }
  }

  document.addEventListener("input", (e) => {
    const t = e.target; if (!t.closest("#brief")) return;
    const a = A();
    if (t.dataset.hours) {
      const fid = t.closest("[data-id]").dataset.id;
      a[fid] = Object.assign({}, a[fid], { [t.dataset.hours]: t.value === "" ? "" : Number(t.value) });
      updateHours(findField(fid)); save(); return;
    }
    if (t.type === "file") return;
    const name = t.name; if (!name) return;
    const f = findField(name);
    if (t.type === "checkbox" && f && (f.type === "chips" || f.type === "swatches")) {
      a[name] = [...document.querySelectorAll(`input[name="${name}"]:checked`)].map((x) => x.value);
      if (f.max) enforceMax(name, f.max);
    } else if (t.type === "checkbox") a[name] = t.checked;
    else if (t.type === "radio") a[name] = t.value;
    else if (t.type === "range") {
      a[name] = Number(t.value);
      const txt = rangeText(f, t.value); $(`#${name}-out`).textContent = txt;
      t.setAttribute("aria-valuetext", `${txt} — ${f.left} ↔ ${f.right}`);
    } else if (t.type === "number") a[name] = t.value === "" ? "" : Number(t.value);
    else a[name] = t.value;
    const box = t.closest("[data-id]");
    if (box) { const er = box.querySelector(".field__error"); if (er && er.textContent) { er.textContent = ""; box.querySelectorAll("[aria-invalid]").forEach((x) => x.removeAttribute("aria-invalid")); } }
    const fe = $("#form-error"); if (fe && !fe.hidden && ![...document.querySelectorAll("#step .field__error")].some((x) => x.textContent)) fe.hidden = true;
    save();
  });
  // radios: allow unselecting by clicking again
  document.addEventListener("click", (e) => {
    const t = e.target;
    if (t.matches && t.matches('#brief input[type=radio]')) {
      if (t.dataset.was === "1") { t.checked = false; t.dataset.was = "0"; delete A()[t.name]; save(); }
      else { document.querySelectorAll(`input[name="${t.name}"]`).forEach((x) => (x.dataset.was = "0")); t.dataset.was = "1"; }
    }
    const rm = t.closest && t.closest("[data-rm]");
    if (rm) {
      const id = rm.dataset.rm; photos[id].splice(Number(rm.dataset.i), 1);
      idb.set(id, photos[id]); A()[id] = photos[id].map((p) => p.name); save(); renderThumbs(id);
    }
    const go = t.closest && t.closest("[data-goto]");
    if (go) { const i = Number(go.dataset.goto); if (i <= state.maxStep && i !== state.step) goTo(i); }
  });
  document.addEventListener("pointerdown", (e) => { const l = e.target.closest && e.target.closest(".chip"); if (l) { const r = l.querySelector("input[type=radio]"); if (r) r.dataset.was = r.checked ? "1" : "0"; } });
  document.addEventListener("change", (e) => {
    const t = e.target; if (t.dataset.file) { const f = findField(t.dataset.file); addPhotos(f.id, t.files, f.multiple); t.value = ""; }
  });
  document.addEventListener("dragover", (e) => { const d = e.target.closest && e.target.closest(".drop"); if (d) { e.preventDefault(); d.classList.add("is-over"); } });
  document.addEventListener("dragleave", (e) => { const d = e.target.closest && e.target.closest(".drop"); if (d) d.classList.remove("is-over"); });
  document.addEventListener("drop", (e) => { const d = e.target.closest && e.target.closest(".drop"); if (d) { e.preventDefault(); d.classList.remove("is-over"); const inp = d.querySelector("input"); const f = findField(inp.dataset.file); addPhotos(f.id, e.dataTransfer.files, f.multiple); } });

  /* ---------- Validation & navigation ---------- */
  function validate() {
    const s = STEPS[state.step]; const a = A(); const bad = [];
    s.fields.forEach((f) => {
      const er = $(`#${f.id}-err`); let msg = "";
      const v = a[f.id];
      if (f.required) {
        if (f.type === "consent" && !v) msg = "Потрібна Твоя згода, щоб я могла працювати з відповідями.";
        else if (f.type !== "consent" && (!v || !String(v).trim())) msg = "Заповни, будь ласка, це поле.";
      }
      if (!msg && f.type === "url" && v && !/^https?:\/\/\S+\.\S+/.test(v.trim())) msg = "Схоже, посилання неповне — воно має починатися з https://";
      if (!msg && f.type === "group") {
        f.fields.forEach((sf) => { const x = a[sf.id]; if (sf.type === "number" && x !== "" && x != null && (x < sf.min || x > sf.max)) msg = `Перевір «${sf.label}»: значення між ${sf.min} і ${sf.max} ${sf.unit}.`; });
      }
      if (er) er.textContent = msg;
      const inp = document.getElementById(f.id);
      if (inp && inp.tagName !== "FIELDSET") msg ? inp.setAttribute("aria-invalid", "true") : inp.removeAttribute("aria-invalid");
      if (msg) bad.push(f);
    });
    const fe = $("#form-error");
    if (bad.length) {
      fe.hidden = false; const n = bad.length; fe.textContent = n === 1 ? "Залишилось одне поле — подивись нижче." : `Залишилось ${n} ${n < 5 ? "поля" : "полів"} — подивись нижче.`;
      const first = document.getElementById(bad[0].id) || $(`[data-id="${bad[0].id}"] input`);
      first && first.focus({ preventScroll: true });
      $(`[data-id="${bad[0].id}"]`).scrollIntoView({ behavior: "smooth", block: "center" });
    } else fe.hidden = true;
    return !bad.length;
  }

  function goTo(i) {
    state.step = Math.max(0, Math.min(STEPS.length - 1, i));
    state.maxStep = Math.max(state.maxStep, state.step);
    save(true); renderStep();
    window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    $("#step-title").focus({ preventScroll: true });
  }

  $("#brief").addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (state.step < STEPS.length - 1) goTo(state.step + 1);
    else submit();
  });
  $("#prev").addEventListener("click", () => goTo(state.step - 1));

  function show(id) {
    ["welcome", "formwrap", "thanks"].forEach((s) => ($("#" + s).hidden = s !== id));
    $(".topbar__meta").style.visibility = id === "formwrap" ? "visible" : "hidden";
    if (id !== "formwrap") { $("#progress span").style.width = id === "thanks" ? "100%" : "0"; document.title = "Анкета-бриф · mppl.style — персональний стиліст"; }
  }
  function startForm() { state.started = true; save(true); show("formwrap"); renderStep(); $("#step-title").focus(); }
  $("#start").addEventListener("click", startForm);
  $("#restart").addEventListener("click", async () => { if (confirm("Почати з чистого аркуша? Збережені відповіді буде видалено.")) { await resetAll(); startForm(); } });

  /* ---------- Export ---------- */
  function fmt(f, v) {
    if (v == null || v === "" || (Array.isArray(v) && !v.length)) return null;
    switch (f.type) {
      case "range": return `${rangeText(f, v)} (${f.left} ↔ ${f.right})`;
      case "scale": return `${v} з ${f.max} (${f.min} — ${f.left}, ${f.max} — ${f.right})`;
      case "consent": return v ? "Так" : null;
      default: return Array.isArray(v) ? v.join(", ") : String(v);
    }
  }
  function collect() {
    const a = A(); const out = [];
    STEPS.forEach((s) => {
      const items = [];
      s.fields.forEach((f) => {
        if (f.type === "group") {
          const parts = f.fields.map((sf) => (a[sf.id] !== "" && a[sf.id] != null ? `${sf.label}: ${a[sf.id]}${sf.unit && sf.type === "number" ? " " + sf.unit : ""}` : null)).filter(Boolean);
          if (parts.length) items.push({ id: f.id, label: f.label, value: parts.join(" · ") });
        } else if (f.type === "hours") {
          const hv = a[f.id] || {}; const tot = f.rows.reduce((t, r) => t + (Number(hv[r.id]) || 0), 0);
          if (tot) items.push({ id: f.id, label: f.label, value: f.rows.map((r) => `${r.label}: ${Number(hv[r.id]) || 0} год (${Math.round(((Number(hv[r.id]) || 0) / tot) * 100)}%)`).join("; "), hours: f.rows.map((r, i) => ({ label: r.label, h: Number(hv[r.id]) || 0, c: HOURS_COLORS[i] })), total: tot });
        } else if (f.type === "file") {
          if ((photos[f.id] || []).length) items.push({ id: f.id, label: f.label, value: `${photos[f.id].length} фото`, photos: photos[f.id] });
        } else {
          let val = fmt(f, a[f.id]);
          const other = a[f.id + "__other"]; if (other && other.trim()) val = (val ? val + ", " : "") + other.trim();
          if (val) items.push({ id: f.id, label: f.label, value: val, swatches: f.type === "swatches" ? a[f.id] : null });
        }
      });
      if (items.length) out.push({ id: s.id, title: s.title, items });
    });
    return out;
  }
  function payloadJSON(withPhotos) {
    const data = collect();
    return {
      form: "mppl.style — анкета-бриф", version: 1, submittedAt: new Date().toISOString(),
      client: A().name || "", contact: A().contact || "",
      sections: data.map((s) => ({ section: s.title, answers: s.items.map((i) => ({ question: i.label, answer: i.value, ...(withPhotos && i.photos ? { photos: i.photos } : {}) })) })),
      raw: A()
    };
  }
  function reportHTML() {
    const data = collect(); const a = A(); const color = Object.fromEntries(B.palette);
    const date = new Date().toLocaleDateString("uk-UA", { day: "numeric", month: "long", year: "numeric" });
    const sec = data.map((s) => `<section><h2>${esc(s.title)}</h2><dl>${s.items.map((i) => {
      let val = esc(i.value);
      if (i.swatches) val = i.swatches.map((n) => `<span class="sw"><i style="background:${color[n]}"></i>${esc(n)}</span>`).join("");
      if (i.hours) val = `<div class="bar">${i.hours.map((h) => `<i style="width:${(h.h / i.total) * 100}%;background:${h.c}"></i>`).join("")}</div>` + i.hours.map((h) => `<span class="sw"><i style="background:${h.c}"></i>${esc(h.label)} — ${h.h} год</span>`).join("");
      if (i.photos) val = `<div class="ph">${i.photos.map((p) => `<img src="${p.dataUrl}" alt="${esc(p.name)}">`).join("")}</div>`;
      return `<div><dt>${esc(i.label)}</dt><dd>${val}</dd></div>`;
    }).join("")}</dl></section>`).join("");
    return `<!doctype html><html lang="uk"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Бриф — ${esc(a.name || "клієнтка")} · mppl.style</title>
<style>body{font:14px/1.5 'Inter',system-ui,sans-serif;color:#141413;background:#f6f5f2;margin:0;padding:56px 24px}main{max-width:820px;margin:0 auto;background:#fff;padding:56px 64px;box-shadow:2px 10px 24px -10px rgba(51,43,33,.25)}
h1,h2{font-weight:700;text-transform:uppercase;margin:0}h1{font-size:22px;line-height:1.2}h1 em{font-style:normal}.meta{color:rgba(20,20,19,.6);margin:10px 0 36px;font-size:11px;text-transform:uppercase;font-weight:700}
h2{font-size:11px;border-bottom:1px solid #141413;padding-bottom:10px;margin:36px 0 6px}dl{margin:0}dl>div{display:grid;grid-template-columns:38% 1fr;gap:18px;padding:9px 0;border-bottom:1px solid rgba(20,20,19,.12);break-inside:avoid}
dt{color:rgba(20,20,19,.6);font-size:13px}dd{margin:0;white-space:pre-wrap}.sw{display:inline-flex;align-items:center;gap:6px;margin:0 12px 4px 0;white-space:nowrap}.sw i{width:14px;height:14px;border:1px solid rgba(0,0,0,.15);display:inline-block}
.bar{display:flex;height:6px;overflow:hidden;margin:4px 0 8px}.bar i{display:block}.ph{display:flex;flex-wrap:wrap;gap:8px}.ph img{height:180px;object-fit:cover}
.wm{font-size:15px;font-weight:700;text-transform:uppercase;margin-bottom:28px}.wm span{font-weight:700}
@media print{body{background:#fff;padding:0}main{box-shadow:none;padding:0}dl>div{grid-template-columns:34% 1fr}}@media(max-width:600px){main{padding:28px 20px}dl>div{grid-template-columns:1fr;gap:2px}}</style></head>
<body><main><div class="wm">mppl<span>.style</span></div><h1>Бриф: <em>${esc(a.name || "")}</em></h1><p class="meta">${esc(a.contact || "")} · ${esc(a.city || "")} · заповнено ${date}</p>${sec}</main></body></html>`;
  }
  function download(name, content, type) {
    const blob = new Blob([content], { type }); const url = URL.createObjectURL(blob);
    const l = document.createElement("a"); l.href = url; l.download = name; document.body.appendChild(l); l.click(); l.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }
  const slug = () => (A().name || "brief").toLowerCase().replace(/[^a-zа-яіїєґ0-9]+/gi, "-").replace(/^-|-$/g, "") || "brief";
  $("#dl-html").addEventListener("click", () => download(`mppl-brief-${slug()}.html`, reportHTML(), "text/html;charset=utf-8"));
  $("#dl-json").addEventListener("click", () => download(`mppl-brief-${slug()}.json`, JSON.stringify(payloadJSON(true), null, 2), "application/json"));
  $("#dl-pdf").addEventListener("click", () => {
    const fr = document.createElement("iframe"); fr.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0"; fr.setAttribute("aria-hidden", "true");
    document.body.appendChild(fr); const d = fr.contentDocument; d.open(); d.write(reportHTML().replace("<style>", `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400..700&display=swap"><style>`)); d.close();
    setTimeout(() => { fr.contentWindow.focus(); fr.contentWindow.print(); setTimeout(() => fr.remove(), 1500); }, 500);
  });

  /* ---------- Submit ---------- */
  async function submit() {
    const btn = $("#next"); btn.disabled = true; btn.textContent = "Надсилаю…";
    let sent = false, error = null;
    const hasPhotos = Object.values(photos).some((p) => p && p.length);
    if (CONFIG.SUBMIT_ENDPOINT) {
      try {
        let res;
        const p = payloadJSON(false);
        if (CONFIG.SEND_PHOTOS && hasPhotos) {
          const fd = new FormData();
          fd.append("_subject", `Новий бриф: ${p.client}`); fd.append("name", p.client); fd.append("contact", p.contact);
          p.sections.forEach((s) => s.answers.forEach((x) => fd.append(`[${s.section}] ${x.question}`, x.answer)));
          for (const [id, list] of Object.entries(photos)) for (const ph of list || []) fd.append(id, await (await fetch(ph.dataUrl)).blob(), ph.name.replace(/\.\w+$/, "") + ".jpg");
          res = await fetch(CONFIG.SUBMIT_ENDPOINT, { method: "POST", body: fd, headers: { Accept: "application/json" } });
        } else {
          // Плаский формат читабельніший у листі Formspree
          const flat = { _subject: `Новий бриф: ${p.client}`, name: p.client, contact: p.contact };
          if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(p.contact.trim())) flat.email = p.contact.trim(); // Formspree: Reply-To
          p.sections.forEach((s) => s.answers.forEach((x) => (flat[`[${s.section}] ${x.question}`] = x.answer)));
          if (hasPhotos) flat["Фото"] = "Клієнтка додала фото — вони у файлі, який вона надішле окремо.";
          res = await fetch(CONFIG.SUBMIT_ENDPOINT, { method: "POST", body: JSON.stringify(flat), headers: { "Content-Type": "application/json", Accept: "application/json" } });
        }
        if (!res.ok) throw new Error("HTTP " + res.status);
        sent = true;
      } catch (e) { error = e; console.error("Submit failed", e); }
    }
    btn.disabled = false; btn.textContent = "Надіслати бриф";
    if (CONFIG.SUBMIT_ENDPOINT && !sent) {
      const fe = $("#form-error"); fe.hidden = false;
      fe.textContent = "Не вдалося надіслати — перевір інтернет і спробуй ще раз. Твої відповіді збережено. Або завантаж їх файлом на наступному екрані й надішли мені напряму.";
      fe.scrollIntoView({ block: "center" });
      if (!submit.failedOnce) { submit.failedOnce = true; return; }
    }
    state.submitted = true; save(true);
    showThanks(sent, hasPhotos);
  }
  function showThanks(sent, hasPhotos) {
    show("thanks");
    const name = (A().name || "").trim();
    $("#thanks-name").textContent = name ? name + "!" : "що довірилась";
    const c = $("#thanks-callout"); c.hidden = true;
    const contact = `<b>${esc(CONFIG.STYLIST_CONTACT)}</b>`;
    if (!CONFIG.SUBMIT_ENDPOINT || !sent) {
      $("#thanks-lead").textContent = "Твої відповіді готові. Залишився один крок — надіслати їх мені.";
      c.hidden = false; c.innerHTML = `Завантаж файл з відповідями нижче (HTML містить і фото) та надішли його мені: ${contact}.`;
    } else if (hasPhotos && !CONFIG.SEND_PHOTOS) {
      $("#thanks-lead").textContent = "Відповіді вже в мене. Я уважно прочитаю їх і напишу протягом 2 робочих днів, щоб домовитись про першу зустріч.";
      c.hidden = false; c.innerHTML = `Фото не передаються через форму — завантаж HTML-файл нижче (у ньому є фото) і надішли мені: ${contact}.`;
    }
    $("#thanks").focus();
  }
  $("#edit").addEventListener("click", () => { state.submitted = false; save(true); show("formwrap"); renderStep(); });
  $("#reset").addEventListener("click", async () => { if (confirm("Видалити всі відповіді й фото з цього пристрою?")) { await resetAll(); show("welcome"); initWelcome(); } });

  async function resetAll() {
    state = { answers: {}, step: 0, maxStep: 0, started: false, submitted: false, updated: null };
    photos = {}; localStorage.removeItem(LS_KEY); await idb.clear();
  }

  function initWelcome() {
    const has = state.started && Object.keys(A()).length;
    $("#start").textContent = has ? `Продовжити з розділу «${STEPS[state.step].title}»` : "Почати";
    $("#restart").hidden = !has;
  }

  /* ---------- Boot ---------- */
  window.addEventListener("pagehide", () => save(true));
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") save(true); });
  $("#year").textContent = new Date().getFullYear();
  idb.all().then((p) => { photos = p || {}; });
  if (state.submitted) { show("thanks"); showThanks(!!CONFIG.SUBMIT_ENDPOINT, Object.keys(A()).some((k) => k.startsWith("photo_") && Array.isArray(A()[k]) && A()[k].length)); }
  else { show("welcome"); initWelcome(); }
  // Expose for debugging/tests
  window.__brief = { state: () => state, collect, reportHTML, CONFIG };
})();
