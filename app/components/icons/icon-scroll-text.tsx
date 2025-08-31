import type { IconComponentProps } from "~/types";

const IconScrollText = ({
                     size = 24,
                     color = "gray-400",
                     className,
                   }: IconComponentProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
       viewBox="0 0 24 24" fill="none" stroke="currentColor"
       stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
       className={className}>
    <path d="M15 12h-5" fill={color}/>
    <path d="M15 8h-5" fill={color}/>
    <path d="M19 17V5a2 2 0 0 0-2-2H4" fill={color}/>
    <path
      d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"
      fill={color}
    />
  </svg>
);

export default IconScrollText;