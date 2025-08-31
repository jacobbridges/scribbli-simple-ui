import type { IconComponentProps } from "~/types";

const IconMapPin = ({
  size = 24,
  color = "gray-400",
  className,
}: IconComponentProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
       viewBox="0 0 24 24" fill="none" stroke="currentColor"
       stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
       className={className}>
    <path
      d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
      fill={color}
    />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export default IconMapPin;