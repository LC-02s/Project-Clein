import { MAIN_TITLE } from '@/shared/config'
import { Repository } from '@/shared/lib'

export const DevProjectRepository = new Repository({
  attraction: {
    name: 'Attraction',
  },
  'pbl-notes': {
    name: 'PBL Notes',
  },
  'project-clein': {
    name: MAIN_TITLE,
  },
  'eung-cham-jal': {
    name: '응원 참 잘하는 집',
  },
  'synergy-meet-2024': {
    name: 'Synergy Meet 2024',
  },
} as const)
