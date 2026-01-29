import Image from "next/image";
import { format, formatDistanceToNow } from "date-fns";
import {
  Building2,
  Calendar,
  Clock,
  FileText,
  GraduationCap,
  HeartPulse,
  Paperclip,
  Trash2,
  ChevronsRight,
  Route,
} from "lucide-react";
import type { Grievance, GrievanceCategory } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import GrievanceStatusBadge from "./grievance-status-badge";
import { Separator } from "./ui/separator";

interface GrievanceCardProps {
  grievance: Grievance;
}

const categoryIcons: Record<GrievanceCategory, React.ReactNode> = {
  Infrastructure: <Building2 className="h-4 w-4" />,
  Healthcare: <HeartPulse className="h-4 w-4" />,
  Sanitation: <Trash2 className="h-4 w-4" />,
  Education: <GraduationCap className="h-4 w-4" />,
  "Public Transport": <Route className="h-4 w-4" />,
  Other: <FileText className="h-4 w-4" />,
};

const GrievanceCard = ({ grievance }: GrievanceCardProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="flex h-full transform-gpu cursor-pointer flex-col transition-all duration-200 ease-in-out hover:shadow-lg hover:-translate-y-1">
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle className="mb-2 text-lg leading-tight">
                {grievance.title}
              </CardTitle>
            </div>
            <CardDescription className="font-mono text-xs">
              ID: {grievance.id}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {categoryIcons[grievance.category]}
              <span>{grievance.category}</span>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <GrievanceStatusBadge status={grievance.status} />
            <div className="text-xs text-muted-foreground">
              {formatDistanceToNow(grievance.updatedAt, { addSuffix: true })}
            </div>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{grievance.title}</DialogTitle>
          <div className="flex items-center gap-4 pt-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              {categoryIcons[grievance.category]} {grievance.category}
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="font-mono text-xs">ID: {grievance.id}</div>
          </div>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <h4 className="font-semibold">Description</h4>
            <p className="text-sm text-muted-foreground">
              {grievance.description}
            </p>
          </div>
          <Separator />
          <div className="space-y-4">
            <h4 className="font-semibold">Status History</h4>
            <div className="relative pl-6">
              <div className="absolute left-[9px] top-1 h-[calc(100%-1rem)] w-0.5 bg-border"></div>
              {grievance.history.map((item, index) => (
                <div key={index} className="relative flex items-start gap-4 mb-4">
                   <div className="z-10 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-background">
                     <GrievanceStatusBadge status={item.status} iconOnly useAnimation={false} />
                   </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm flex items-center">
                      {item.status}
                       <span className="ml-2 text-xs font-normal text-muted-foreground">
                        {format(item.date, "PPP p")}
                      </span>
                    </p>
                    <p className="text-sm text-muted-foreground">{item.comments}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {grievance.attachments && grievance.attachments.length > 0 && (
            <>
              <Separator />
              <div className="space-y-2">
                <h4 className="font-semibold">Attachments</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {grievance.attachments.map((file, index) => (
                    <a key={index} href={file.url} target="_blank" rel="noopener noreferrer" className="block space-y-2 group">
                      <Image 
                        src={file.url} 
                        alt={file.name} 
                        width={200} 
                        height={150}
                        className="rounded-lg object-cover aspect-[4/3] transition-all group-hover:opacity-80"
                      />
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Paperclip className="h-4 w-4" />
                        <span className="truncate">{file.name}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GrievanceCard;
