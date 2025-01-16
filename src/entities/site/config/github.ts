export const GITHUB = Object.freeze({
  USER_ID: 'LC-02s',
  REPO: Object.freeze({
    ID: 'R_kgDONeV9SQ',
    NAME: 'Project-Clein',
    CATEGORY: Object.freeze({
      ID: 'DIC_kwDONeV9Sc4CmDZp',
      NAME: 'Comments',
    }),
  }),
})

export const USER_GITHUB_ADDRESS = `https://github.com/${GITHUB.USER_ID}`

export const GITHUB_ISSUE_ADDRESS = `${USER_GITHUB_ADDRESS}/${GITHUB.REPO.NAME}/issues`

export const GISCUS_ADDRESS = 'https://giscus.app'

export const GISCUS_CLASS_NAME = 'giscus'

export const GISCUS_FRAME_CLASS_NAME = 'giscus-frame'
