import type { IconComponentProps } from "~/types";

const IconUsers = ({
  size = 24,
  color = "gray-400",
  className,
}: IconComponentProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
       viewBox="0 0 24 24" fill="none" stroke="currentColor"
       stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
       className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" fill={color}/>
    <path d="M16 3.128a4 4 0 0 1 0 7.744" fill={color}/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" fill={color}/>
    <circle cx="9" cy="7" r="4"/>
  </svg>
);

export default IconUsers;