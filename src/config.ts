import { exception } from "./exception.js";
import { readJson } from "./files/readJson.js";

export type CrawlerConfig = {};

export type NibblesConfig = {
  crawlers: Array<CrawlerConfig>;
};

let config: NibblesConfig | undefined;

export async function load(filepath: string) {
  config = await readJson(filepath);
}

export function get(): NibblesConfig {
  return (
    config ??
    exception("The configuration wasn't loaded. Have you called config.load()?")
  );
}
