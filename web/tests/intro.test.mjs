import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { runInNewContext } from "node:vm";

// Execute the actual inline bootstrap without React, hydration or browser timers.
const source = readFileSync(new URL("../src/components/Intro.tsx", import.meta.url), "utf8");
const script = source.match(/const bootstrap = `([\s\S]*?)`;/)[1];

function fixture({ reduced = false, played = false, blocked = false } = {}) {
  const root = { dataset: {} };
  const listeners = new Map();
  const timers = new Map();
  const target = (name) => ({
    addEventListener: (event, callback) => listeners.set(`${name}:${event}`, callback),
    removeEventListener: (event) => listeners.delete(`${name}:${event}`),
  });
  const curtain = target("curtain");
  const media = { ...target("media"), matches: reduced };
  const storage = new Map(played ? [["wdg-intro-played", "1"]] : []);
  runInNewContext(script, {
    document: { documentElement: root, getElementById: () => curtain },
    window: target("window"),
    matchMedia: () => media,
    sessionStorage: {
      getItem: (key) => { if (blocked) throw Error("blocked"); return storage.get(key); },
      setItem: (key, value) => { if (blocked) throw Error("blocked"); storage.set(key, value); },
    },
    setTimeout: (callback, delay) => { timers.set(1, { callback, delay }); return 1; },
    clearTimeout: (id) => timers.delete(id),
  });
  return { root, listeners, timers, storage };
}

for (const event of ["curtain:click", "window:keydown", "media:change"]) {
  test(`${event} dismisses before hydration and cleans up`, () => {
    const f = fixture();
    assert.equal(f.root.dataset.intro, "playing");
    f.listeners.get(event)();
    assert.equal(f.root.dataset.intro, undefined);
    assert.equal(f.storage.get("wdg-intro-played"), "1");
    assert.equal(f.listeners.size, 0);
    assert.equal(f.timers.size, 0);
  });
}
test("hard timeout dismisses even if React never loads", () => {
  const f = fixture();
  const timer = f.timers.get(1);
  assert.ok(timer.delay <= 6000);
  timer.callback();
  assert.equal(f.root.dataset.intro, undefined);
});
for (const options of [{ reduced: true }, { played: true }]) {
  test(`skips entirely for ${JSON.stringify(options)}`, () => {
    const f = fixture(options);
    assert.equal(f.root.dataset.intro, undefined);
    assert.equal(f.listeners.size, 0);
    assert.equal(f.timers.size, 0);
  });
}
test("blocked session storage cannot trap visitors", () => {
  const f = fixture({ blocked: true });
  f.timers.get(1).callback();
  assert.equal(f.root.dataset.intro, undefined);
  assert.equal(f.listeners.size, 0);
});
