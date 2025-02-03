import readingTime from 'reading-time'

export const computeReadingTime = (content: string) => Math.ceil(readingTime(content).minutes)
