# fabric-json-schema-form

React components that render a JSON Schema as a form inside
[Teldio Fabric](https://github.com/teldio-operations/fabric-manager).

Fabric modules publish a JSON Schema for their configuration. They publish one
for the events they emit and listen to, and one for their queryables. The Fabric
manager web UI uses this library to turn those schemas into forms. Module web UIs
use it for the same purpose.

This library serves Fabric only. It is not a general-purpose JSON Schema form
library. Use [`@rjsf/mui`](https://rjsf-team.github.io/react-jsonschema-form/)
directly for that.

Two things tie it to Fabric:

- It reads the Fabric schema extensions that `fabric-go` writes. The `control`
  keyword picks a widget. The value `queryable`, together with `accept`, renders
  a picker. That picker lists the queryables other modules serve.
- It calls the manager API on the same origin. It sets no base URL. The
  components only work on a page that the manager serves.

## Install

```bash
bun add @teldio-operations/fabric-json-schema-form
```

The package ships TypeScript and TSX source. It has no build step, so the
consumer must bundle it. Fabric bundles with Bun and Vite.

## Use

```tsx
import { FabricJsonSchemaForm } from "@teldio-operations/fabric-json-schema-form";

<FabricJsonSchemaForm
  schema={schema}
  formData={config}
  onSubmit={({ formData }) => save(formData)}
/>;
```

The public API is small:

| Export | Entry point | Purpose |
| --- | --- | --- |
| `FabricJsonSchemaForm` | `.` | The form. Wraps `@rjsf/mui` and registers the Fabric fields and widgets. |
| `FabricJsonSchemaFormProps` | `.` | The prop type, for components that wrap the form. |
| `SchemaField` | `.` | The field that maps Fabric schema extensions to widgets. Pass it to another `@rjsf` form. |
| `validator` | `./utils/validator` | The AJV 2020 validator the form uses. Use it to compute schema defaults with the same rules. |

Everything else is internal. The `exports` map in `package.json` blocks it.

## Test local changes in `fabric-manager`

Use `yalc` to test local changes inside `fabric-manager`.

### Install `yalc`

```bash
bun install -g yalc
```

### Add Bun's global bin directory to your `PATH`

```bash
export PATH="$HOME/.bun/bin:$PATH"
```

To keep this, add the command above to your shell profile, such as `~/.zshrc` or
`~/.bashrc`.

### Publish the package locally

After you change `fabric-json-schema-form`, publish it:

```bash
yalc publish
```

### Add the package to `fabric-manager`

From the `fabric-manager` repository:

```bash
cd webui
yalc add @teldio-operations/fabric-json-schema-form
cd ..
bin/dev
```

Your local changes are now available in `fabric-manager`.

## Regenerate the manager API types

`bin/updateapi` generates `manager-api.d.ts`. Start the manager, then run:

```bash
bin/updateapi
```

## License

UNLICENSED. Copyright (C) 2025-2026 Teldio Corporation. All rights reserved. The
source is public so that you can read it. Publication grants no license.
