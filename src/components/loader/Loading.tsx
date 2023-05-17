import { twMerge } from "tailwind-merge";

type Props = React.HTMLAttributes<HTMLDivElement> & {};
export default function Loading({ className, ...props }: Props) {
  return <div {...props} className={twMerge("loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4", className)} />;
}
