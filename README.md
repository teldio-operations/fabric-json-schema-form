# Testing local development changes in `fabric-manager`

Use `yalc` to test local changes from `@teldio-operations/fabric-json-schema-form` inside `fabric-manager`.

## Prerequisites

### Install `yalc`

```bash
bun install -g yalc
```

### Add Bun’s global bin directory to your `PATH`

```bash
export PATH="$HOME/.bun/bin:$PATH"
```

To make this permanent, add the command above to your shell profile (such as `~/.zshrc` or `~/.bashrc`).

## Workflow

### 1. Publish your package locally

After making changes in `fabric-json-schema-form`, publish the package:

```bash
yalc publish
```

### 2. Add the package to `fabric-manager`

From the `fabric-manager` repository:

```bash
cd webui
yalc add @teldio-operations/fabric-json-schema-form
cd ..
bin/dev
```

## Result

Your local changes should now be available in `fabric-manager` for testing.
