class CacheStore {
  cacheStore = new Map();

  public addToCacheStore(key: string, value: Object) {
    return this.cacheStore.set(key, value);
  }

  public getFromCacheStore(key: string) {
    return this.cacheStore.get(key);
  }

  public isInCacheStore(key: string) {
    return this.cacheStore.has(key);
  }
}

const singletonCacheStore = new CacheStore();

export default singletonCacheStore;
