import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders Ahmed's production portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /<title>Ahmed Mohamed Abd ElAal \| Backend \.NET Developer<\/title>/i,
  );
  assert.match(html, /AHMED/);
  assert.match(html, /ABD ELAAL/);
  assert.match(html, /University Admission System/);
  assert.match(html, /Clinic Flow/);
  assert.match(html, /Football Field Booking/);
  assert.match(html, /Code · Content/);
  assert.match(html, /href="tel:\+201021470391"/);
  assert.match(html, /href="\/Ahmed_Mohamed_AbdelAal_CV\.pdf"/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
});

test("keeps the mobile layout and reduced-motion safeguards", async () => {
  const [css, page] = await Promise.all([
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(css, /@media\s*\(max-width:\s*760px\)/);
  assert.match(css, /\.hero-portrait\s*\{[\s\S]*?position:\s*relative/);
  assert.match(css, /\.hero-actions\s*\{[\s\S]*?grid-template-columns/);
  assert.match(css, /@keyframes\s+revealMobile/);
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(page, /aria-label=\{t\.switchLabel\}/);
  assert.match(page, /aria-label=\{t\.navigationLabel\}/);
  assert.match(page, /aria-label=\{t\.stackLabel\}/);
  assert.match(page, /loading="lazy"/);
});
