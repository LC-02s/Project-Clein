/* eslint-disable @typescript-eslint/no-explicit-any */

export type EntityId<E> = E extends Entity<infer K, any> ? K : never

export type EntityData<E> = E extends Entity<any, infer V> ? V : never

export type EntitySchema<E> = E extends Entity<infer K, infer V> ? Record<K, V> : never

export class Entity<K extends string | number | symbol, V extends string | object> {
  public constructor(private schema: Record<K, V>) {}

  public findById(id: K): V {
    return this.schema[id]
  }

  public getKeys(): K[] {
    return Object.keys(this.schema) as K[]
  }

  public getValues(): V[] {
    return Object.values(this.schema)
  }

  public getEntries(): [K, V][] {
    return Object.entries(this.schema) as [K, V][]
  }
}
