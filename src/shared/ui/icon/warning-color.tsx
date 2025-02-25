import type { IconProps } from './interface'

export const WarningColor: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 32 32"
    aria-label="경고 아이콘"
    {...props}
  >
    <g fill="none">
      <path
        fill="url(#fluentColorWarning320)"
        d="M12.937 3.809c1.33-2.41 4.796-2.41 6.127 0l10.494 18.999c1.288 2.333-.4 5.192-3.064 5.192H5.507c-2.665 0-4.352-2.86-3.064-5.192z"
      />
      <path
        fill="url(#fluentColorWarning321)"
        d="M17.25 22a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0M16 9a1 1 0 0 0-1 1v8a1 1 0 1 0 2 0v-8a1 1 0 0 0-1-1"
      />
      <defs>
        <linearGradient
          id="fluentColorWarning320"
          x1={6.377}
          x2={22.707}
          y1={-2.061}
          y2={31.433}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ffcd0f" />
          <stop offset={1} stopColor="#fe8401" />
        </linearGradient>
        <linearGradient
          id="fluentColorWarning321"
          x1={12.666}
          x2={20.071}
          y1={9}
          y2={22.856}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4a4a4a" />
          <stop offset={1} stopColor="#212121" />
        </linearGradient>
      </defs>
    </g>
  </svg>
)
