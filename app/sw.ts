import type { SerwistGlobalConfig } from "@serwist/core";
import { defaultCache } from "@serwist/next/worker";
import { Serwist } from "@serwist/sw";
import type { PrecacheEntry } from "@serwist/sw/precaching";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist();

serwist.install({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
});