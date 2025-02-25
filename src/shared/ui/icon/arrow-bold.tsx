import { type ArrowIconProps, _arrowIconProps } from './interface'

export const ArrowBold: React.FC<ArrowIconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    {..._arrowIconProps(props)}
  >
    <path
      fill="currentColor"
      d="m12.37 8.165l6.43 6.63c.401.414.158 1.205-.37 1.205H5.57c-.528 0-.771-.79-.37-1.205l6.43-6.63a.5.5 0 0 1 .74 0"
    />
  </svg>
)
