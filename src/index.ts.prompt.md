---
include:
  - config.ts
---

This is the entry point to a CLI app called nibbles.

We need to support the following commands:
  - nibbles job create <job_name> --config <config_path>
  - nibbles job resume <job_name>

Use yargs for parsing command line args.

The following args are needed:
- "-c", is the path to a config file

Call config.load with the filepath. You need to import load.

codespin:include:/codespin/rules/ts-conventions.md