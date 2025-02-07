export const GITHUB = {
  USER_ID: 'LC-02s',
  REPO: {
    ID: 'R_kgDONeV9SQ',
    NAME: 'Project-Clein',
    CATEGORY: {
      ID: 'DIC_kwDONeV9Sc4CmDZp',
      NAME: 'Comments',
    },
  },
} as const

export const USER_GITHUB_ADDRESS = `https://github.com/${GITHUB.USER_ID}` as const

export const GITHUB_ISSUE_ADDRESS = `${USER_GITHUB_ADDRESS}/${GITHUB.REPO.NAME}/issues` as const
