# svelte-json-render

Sample SvelteKit app using `@json-render/core`, `@json-render/svelte`, and `@json-render/shadcn-svelte`.

## Setup

```sh
npm install @json-render/core @json-render/svelte @json-render/shadcn-svelte zod tw-animate-css
```

## Develop

```sh
npm run dev
```

## What's inside

| Path | Role |
|------|------|
| `src/lib/catalog.ts` | Picks shadcn component definitions + actions |
| `src/lib/registry.ts` | Maps those to `shadcnComponents` |
| `src/lib/spec.ts` | Demo JSON spec |
| `src/lib/DemoRenderer.svelte` | Providers + `Renderer` |
| `src/routes/+page.svelte` | `StateProvider` + demo |
| `src/routes/layout.css` | Tailwind + shadcn theme tokens |

## Learn more

- [json-render.dev](https://json-render.dev)
- [shadcn-svelte API](https://json-render.dev/docs/api/shadcn-svelte)
