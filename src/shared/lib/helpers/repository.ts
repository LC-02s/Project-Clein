export default class Repository<K extends string | number | symbol, V> {
  private data: Record<K, V>

  public constructor(data: Record<K, V>) {
    this.data = data
  }

  public findById(id: K): V {
    return this.data[id]
  }

  public getKeys(): K[] {
    return Object.keys(this.data) as K[]
  }

  public getValues(): V[] {
    return Object.values(this.data)
  }
}
