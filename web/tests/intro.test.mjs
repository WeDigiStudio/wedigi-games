import assert from "node:assert/strict";
import test from "node:test";
import { runInNewContext } from "node:vm";
import { introBootstrap, INTRO_TIMING as timing } from "../src/components/intro-sequence.mjs";

// Execute the production bootstrap before React, with deterministic time and
// scene readiness. No rendering library or browser dependency is required.
function fixture({ reduced = false, played = false, blocked = false, sceneReady = false, search = "", hash = "" } = {}) {
  const root = { dataset: {} };
  const listeners = new Map();
  const timers = new Map();
  const observers = new Set();
  const events = [];
  let now = 0, id = 0, ready = sceneReady;
  const target = (name) => ({
    addEventListener: (event, callback) => listeners.set(`${name}:${event}`, callback),
    removeEventListener: (event) => listeners.delete(`${name}:${event}`),
  });
  const curtain = target("curtain");
  const media = { ...target("media"), matches: reduced };
  const storage = new Map(played ? [["wdg-intro-played", "1"]] : []);
  const document = {
    ...target("document"), hidden: false,
    documentElement: root,
    getElementById: () => curtain,
    querySelector: () => ready ? {} : null,
  };
  runInNewContext(introBootstrap, {
    document,
    window: { ...target("window"), location: { search, hash }, dispatchEvent: (event) => events.push(event.type) },
    Event: class { constructor(type) { this.type = type; } },
    URLSearchParams,
    MutationObserver: class {
      constructor(callback) { this.callback = callback; }
      observe() { observers.add(this.callback); }
      disconnect() { observers.delete(this.callback); }
    },
    matchMedia: () => media,
    sessionStorage: {
      getItem: (key) => { if (blocked) throw Error("blocked"); return storage.get(key); },
      setItem: (key, value) => { if (blocked) throw Error("blocked"); storage.set(key, value); },
    },
    setTimeout: (callback, delay) => { const next = ++id; timers.set(next, { callback, at: now + delay }); return next; },
    clearTimeout: (key) => timers.delete(key),
  });
  function advance(ms) {
    const end = now + ms;
    while (true) {
      const next = [...timers].filter(([, timer]) => timer.at <= end).sort((a, b) => a[1].at - b[1].at)[0];
      if (!next) break;
      now = next[1].at;
      timers.delete(next[0]);
      next[1].callback();
    }
    now = end;
  }
  function readyScene() { ready = true; [...observers].forEach((notify) => notify()); }
  return { root, listeners, timers, storage, events, observers, document, advance, readyScene };
}

test("waits for the real canvas before starting the crossing", () => {
  const f = fixture();
  assert.equal(f.root.dataset.intro, "preparing");
  f.advance(400);
  f.readyScene();
  assert.equal(f.root.dataset.intro, "playing");
  assert.equal(f.observers.size, 0);
  f.advance(timing.pass - 1);
  assert.deepEqual(f.events, []);
  f.advance(1);
  assert.deepEqual(f.events, ["wdg:intro-pass"]);
});

test("crossing, UI reveal, and release complete without a hard cut", () => {
  const f = fixture({ sceneReady: true });
  f.advance(timing.scene - 1);
  assert.equal(f.root.dataset.intro, "playing");
  f.advance(1);
  assert.equal(f.root.dataset.intro, "releasing");
  f.advance(timing.release - 1);
  assert.equal(f.root.dataset.intro, "releasing");
  f.advance(1);
  assert.equal(f.root.dataset.intro, undefined);
  assert.equal(f.listeners.size, 0);
  assert.equal(f.timers.size, 0);
});

for (const event of ["curtain:click", "window:keydown", "window:wheel", "window:touchmove"]) {
  for (const sceneReady of [false, true]) {
    test(`${event} smoothly skips ${sceneReady ? "during the scene" : "before hydration"}`, () => {
      const f = fixture({ sceneReady });
      f.listeners.get(event)();
      assert.equal(f.root.dataset.intro, "releasing");
      f.advance(timing.release);
      assert.equal(f.root.dataset.intro, undefined);
      assert.equal(f.listeners.size, 0);
      assert.equal(f.observers.size, 0);
      f.advance(timing.deadline);
      assert.deepEqual(f.events, []);
    });
  }
}

test("a late or unavailable WebGL renderer cannot trap the visitor", () => {
  const f = fixture();
  f.advance(timing.prepare);
  assert.equal(f.root.dataset.intro, "playing");
  f.advance(timing.scene + timing.release);
  assert.equal(f.root.dataset.intro, undefined);
  f.readyScene();
  assert.equal(f.root.dataset.intro, undefined);
});

test("hard failsafe independently removes the overlay", () => {
  const f = fixture();
  const deadline = [...f.timers.values()].find((timer) => timer.at === timing.deadline);
  deadline.callback();
  assert.equal(f.root.dataset.intro, undefined);
  assert.equal(f.timers.size, 0);
  assert.equal(f.observers.size, 0);
});

for (const options of [{ reduced: true }, { played: true }, { hash: "#project-s" }]) {
  test(`skips completely for ${JSON.stringify(options)}`, () => {
    const f = fixture(options);
    assert.equal(f.root.dataset.intro, undefined);
    assert.equal(f.listeners.size, 0);
    assert.equal(f.timers.size, 0);
  });
}

test("records the visit immediately so reloading mid-intro never replays", () => {
  const f = fixture();
  assert.equal(f.storage.get("wdg-intro-played"), "1");
});

test("an explicit preview replays, but never overrides reduced motion", () => {
  assert.equal(fixture({ played: true, search: "?intro=replay" }).root.dataset.intro, "preparing");
  assert.equal(fixture({ reduced: true, search: "?intro=replay" }).root.dataset.intro, undefined);
});

test("blocked storage still finishes normally", () => {
  const f = fixture({ blocked: true });
  f.advance(timing.deadline);
  assert.equal(f.root.dataset.intro, undefined);
  assert.equal(f.listeners.size, 0);
});

for (const event of ["media:change", "window:pagehide", "document:visibilitychange"]) {
  test(`${event} cancels immediately and removes the scheduled lantern reaction`, () => {
    const f = fixture({ sceneReady: true });
    f.document.hidden = true;
    f.listeners.get(event)();
    assert.equal(f.root.dataset.intro, undefined);
    f.advance(timing.deadline);
    assert.deepEqual(f.events, []);
  });
}
