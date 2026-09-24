# svelte-json-render

Sample SvelteKit app using [`@json-render/core`](https://www.npmjs.com/package/@json-render/core) and [`@json-render/svelte`](https://www.npmjs.com/package/@json-render/svelte).

## Setup

```sh
npm install @json-render/core @json-render/svelte zod
```

## Develop

```sh
npm run dev
```

Open the app to see a JSON-driven UI: counter, todos, visibility conditions, and two-way bound input.

## What's inside

| Path | Role |
|------|------|
| `src/lib/catalog.ts` | Component/action schema via `schema.createCatalog` |
| `src/lib/registry.ts` | Maps catalog types to Svelte components |
| `src/lib/spec.ts` | Demo JSON spec (element tree + state) |
| `src/lib/components/` | Stack, Card, Text, Button, Badge, ListItem, Input |
| `src/lib/DemoRenderer.svelte` | Action/visibility/validation providers + `Renderer` |
| `src/routes/+page.svelte` | `StateProvider` + demo |

## Learn more

- [json-render.dev](https://json-render.dev)
- [Svelte API docs](https://json-render.dev/docs/api/svelte)
