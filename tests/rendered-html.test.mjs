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
  assert.match(html, /Backend · Freelance/);
  assert.match(html, /href="https:\/\/github\.com\/3ab3al11"/);
  assert.match(
    html,
    /href="https:\/\/www\.linkedin\.com\/in\/ahmed-mohamed-web-dev\/"/,
  );
  assert.match(html, /href="https:\/\/www\.facebook\.com\/3ab3al10\/"/);
  assert.match(
    html,
    /href="https:\/\/www\.instagram\.com\/ahmed3ab3al"/,
  );
  assert.match(html, /class="hero-contact-bar"/);
  assert.match(html, /mailto:ahmed\.moh\.abdelaal\.dev@gmail\.com/);
  assert.match(html, /href="tel:\+201021470391"/);
  assert.match(html, /aria-label="Email Ahmed at ahmed\.moh\.abdelaal\.dev@gmail\.com"/);
  assert.match(html, /aria-label="Call Ahmed at \+201021470391"/);
  assert.match(html, /href="\/Ahmed_Mohamed_AbdelAal_CV\.pdf"/);
  assert.doesNotMatch(html, /id="contact"|href="#contact"/);
  assert.match(html, /class="site-footer"/);
  assert.match(html, /Arabic — Native · English — Good working proficiency/);
  assert.match(html, /aria-label="5K"/);
  assert.match(html, /Best Faculty Student Union in Assiut/);
  assert.doesNotMatch(html, /Social Media &amp; Content Specialist|Sahab Real Estate/);
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
