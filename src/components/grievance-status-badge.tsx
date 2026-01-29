import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { GrievanceStatus } from "@/lib/data";
import { CheckCircle2, XCircle, FileClock, Loader2 } from "lucide-react";

interface GrievanceStatusBadgeProps {
  status: GrievanceStatus;
  className?: string;
  iconOnly?: boolean;
  useAnimation?: boolean;
}

const statusConfig = {
  Submitted: {
    label: "Submitted",
    icon: FileClock,
    color: "bg-blue-500 hover:bg-blue-500",
    iconColor: "text-blue-500",
  },
  "In Progress": {
    label: "In Progress",
    icon: Loader2,
    color: "bg-orange-500 hover:bg-orange-500",
    iconColor: "text-orange-500",
  },
  Resolved: {
    label: "Resolved",
    icon: CheckCircle2,
    color: "bg-green-500 hover:bg-green-500",
    iconColor: "text-green-500",
  },
  Rejected: {
    label: "Rejected",
    icon: XCircle,
    color: "bg-red-500 hover:bg-red-500",
    iconColor: "text-red-500",
  },
};

const GrievanceStatusBadge = ({
  status,
  className,
  iconOnly = false,
  useAnimation = true,
}: GrievanceStatusBadgeProps) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  if (iconOnly) {
    return (
       <Icon className={cn(
          "h-4 w-4",
          config.iconColor,
          status === 'In Progress' && useAnimation && "animate-spin"
       )} />
    );
  }

  return (
    <Badge
      variant="outline"
      className={cn(
        "flex items-center gap-1.5 border-0 text-white",
        config.color,
        className
      )}
    >
      <Icon
        className={cn(
          "h-3.5 w-3.5",
          status === "In Progress" && useAnimation && "animate-spin"
        )}
      />
      <span>{config.label}</span>
    </Badge>
  );
};

export default GrievanceStatusBadge;
