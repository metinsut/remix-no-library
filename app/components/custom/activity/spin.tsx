import { Loader2 } from "lucide-react";
import { cn } from "~/utils/cn";

type Props = {
  className?: string;
  size?: number | string;
};

export function Spin(props: Props) {
  const { className, size = 30 } = props;
  return <Loader2 className={cn("animate-spin text-brand", className)} size={size} />;
}
