export const PROJECT_TYPE = { PERSONAL: 'personal', TEAM: 'team' } as const

export const PROJECT_TYPE_LABEL = {
  [PROJECT_TYPE.PERSONAL]: '개인 프로젝트',
  [PROJECT_TYPE.TEAM]: '팀 프로젝트',
} as const
