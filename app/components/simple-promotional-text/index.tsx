import type {ComponentProps} from "react";

export interface SimplePromotionalTextProps
  extends ComponentProps<"div"> {
  text: string;
  linkTo: string;
}

export default function SimplePromotionalText(props: SimplePromotionalTextProps) {
  const {text, linkTo} = props;

  return (
    <div className="text-gray-400 font-serif">
      <a href={linkTo}>
        <span>ℰ</span>&nbsp;
        <span className="italic">{text}</span>
      </a>
    </div>
  )
}