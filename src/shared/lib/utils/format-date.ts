import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
dayjs.locale('ko')

export default function formatDateFromNow(date: dayjs.ConfigType) {
  return dayjs(date).fromNow()
}
