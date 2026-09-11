# kotobase-worker-shell

**The machinery every kotobase protocol Worker shares: request policy, CACAO
verification, the R2-backed store, graph resolution, and the four query-dialect
surfaces.** Split out of `net-kotobase/protocols-worker` by superproject
ADR-2608051000 (`1 repo = 1 capability`) so that each capability's deploy shell
can be its own repository without copying any of this.

| namespace | what it owns |
|---|---|
| `core` | pure request policy — `write?`, `authorized-write?`, `effective-surface`, `read-auth-required?`, header normalization, `make-store` |
| `graph` | which R2 head/chain a request targets (ADR-2607178000) — pure |
| `cacao` | CACAO verification at the edge (WebCrypto) |
| `kotobase-crypto` | the crypto the store needs |
| `kotobase-store` | per-request in-memory materialization hydrated from and diffed back to R2 (ADR-2607177500) |
| `kotobase-r2` | the R2 adapter |
| `query` | SPARQL 1.1 / openCypher / Gremlin / GraphQL composed onto a shell, as a `surfaces` + `path-surfaces` registry |
| `shell` | the Worker `fetch` entry itself — request/ring bridging, the security response boundary, read-auth, SigV4/CACAO/Bearer write auth, the hydrate→run→persist retry loop, and the Gremlin WebSocket upgrade |

`core` and `graph` are host-free `.cljc` on purpose: the decisions that matter
are testable without a workerd runtime.

## What a shell must now supply

`kotobase-protocol-core`'s router **has no built-in surface table** — removing
it is what allowed the protocol surfaces to become separate repositories. The
consequence lands here: a shell states which surfaces it carries.

```clojure
(ns net-kotobase-cypher.worker
  (:require [kotobase-protocols-worker.query :as query]
            [kotobase-protocols-worker.shell :as shell]))

(def handler
  (shell/make-handler
   {:surfaces      (select-keys query/surfaces ["cypher"])
    :path-surfaces {"/db/data/" "cypher"}}))
```

`shell/make-handler` is the whole entry point: a per-capability deploy shell is
its `wrangler.jsonc` plus about ten lines naming one surface. The combined
deployment calls the same function with all of them.

A surface not in `:surfaces` is not served, including its `/health`. That is
the point — a shell cannot accidentally serve a capability it did not ask for.
For the four query dialects, `query/surfaces` and `query/path-surfaces` are the
registry to select from; a sparql-only shell takes the one entry it needs.

## Namespaces are still `kotobase-protocols-worker.*`

They are not renamed yet, so the existing `protocols-worker` keeps building
while the per-capability shells are stood up. **Do not put this repo and
`net-kotobase/protocols-worker/src` on the same classpath** — they collide.
Renaming to something that does not say "protocols-worker" is a follow-up for
after the shells land.

## Test

```bash
npm install
npm test          # amu compile --target wasm32-browser test && node out/node-tests.js
```

44 tests / 163 assertions at the 2026-08-05 split, including the SigV4
write-auth path driven end to end through `make-handler`.

**Not nbb.** nbb/SCI cannot resolve `IEquiv` for some transitive deps here, and
`kotobase.local/snapshot`'s deftype field access has the same problem — the same
reason `protocols-worker` used shadow-cljs. The repo-wide runtime priority
prefers nbb; this is a measured exception, not a default.

Sibling checkouts (`../<repo>/src`, the west layout) supply the dependencies;
`shadow-cljs.edn` lists them.
