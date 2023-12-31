import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { load } from "./config.js";

async function main() {
  const argv = yargs(hideBin(process.argv))
    .option("config", {
      alias: "c",
      describe: "path to a config file",
      type: "string",
      demandOption: true,
    })
    .parseSync();

  await load(argv.config);
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
