'use server'

import { readFile } from 'fs/promises'
import { resolve } from 'path'

export const readFileToDatabase = async (path: string) => {
  const DATABASE_PATH = '__database__' as const
  const contentPath = resolve(`${DATABASE_PATH}${path}`)

  return await readFile(contentPath, 'utf-8')
}
