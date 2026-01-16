# ts-base

ph0ryn's typescript base template

## requirement

- pnpm (package manager)

## script

`pnpm run <script>`

```json
{
  "format": "pnpm run lint --fix . ; oxfmt . ; eslint --fix .",
  "lint": "oxlint --type-aware",
  "precommit": "pnpm run typecheck && pnpm run format",
  "typecheck": "tsgo -p . --noEmit"
}
```

## Linter

- [ESLint](./eslint.config.mjs)
  - eslint-plugin-import-x
  - typescript-eslint
  - @stylistic/eslint-plugin
- [oxlint](./.oxlintrc.json)
  - @stylistic/eslint-plugin

## Formatter

- [oxfmt](./.oxfmtrc.jsonc)
