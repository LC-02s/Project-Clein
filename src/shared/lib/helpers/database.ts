'use server'

import { readFile } from 'fs/promises'
import { join } from 'path'

export const readFileToDatabase = async (path: string) => {
  const DATABASE_PATH = '__database__' as const
  const contentPath = join(process.cwd(), `${DATABASE_PATH}${path}`)

  return await readFile(contentPath, 'utf-8')
}
