import { NextResponse, type NextRequest } from 'next/server'
import { ProjectRepository } from '@/database/projects'
import type { SearchProjectResponse } from '@/entities/project'
import { PROJECT_TYPE_LABEL, SEARCH_PROJECT_PARAMS } from '@/entities/project'
import { exceptionMessage } from '@/shared/api'

export const GET = (request: NextRequest) => {
  const { searchParams } = request.nextUrl
  const query = searchParams.get(SEARCH_PROJECT_PARAMS.QUERY)

  if (!query) {
    return NextResponse.json(exceptionMessage('검색어를 입력해주세요'), { status: 400 })
  }

  const word = query.toLowerCase()
  const targetProjects = ProjectRepository.getEntries()
    .filter(([, data]) => {
      return (
        data.name.toLowerCase().includes(word) ||
        data.description.toLowerCase().includes(word) ||
        PROJECT_TYPE_LABEL[data.type].includes(word)
      )
    })
    .map(([id, { name, thumbnail }]) => ({ id, name, thumbnail }))

  return NextResponse.json({ contents: targetProjects } satisfies SearchProjectResponse)
}
