import { Request, Response, NextFunction } from "express";

type CacheEntry = {
  expiresAtMs: number;
  payload: unknown;
};

const cacheStore: Map<string, CacheEntry> = new Map();

function buildCacheKey(req: Request): string {
  return req.originalUrl || req.url;
}

export function cacheSeconds(ttlSeconds: number) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (req.method !== "GET" || ttlSeconds <= 0) {
      return next();
    }

    const key = buildCacheKey(req);
    const now = Date.now();
    const hit = cacheStore.get(key);

    if (hit && hit.expiresAtMs > now) {
      return res.json(hit.payload);
    }

    const originalJson = res.json.bind(res);
    res.json = (body?: any) => {
      cacheStore.set(key, { expiresAtMs: now + ttlSeconds * 1000, payload: body });
      return originalJson(body);
    };

    return next();
  };
}

export function cacheClearMatching(prefix: string) {
  for (const k of cacheStore.keys()) {
    if (k.startsWith(prefix)) {
      cacheStore.delete(k);
    }
  }
}


