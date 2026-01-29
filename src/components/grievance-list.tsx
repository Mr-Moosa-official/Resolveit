import type { Grievance } from "@/lib/data";
import GrievanceCard from "./grievance-card";

interface GrievanceListProps {
  grievances: Grievance[];
}

const GrievanceList = ({ grievances }: GrievanceListProps) => {
  return (
    <div className="space-y-4 pt-4">
      {grievances.length === 0 ? (
        <div className="flex h-40 items-center justify-center rounded-lg border-2 border-dashed border-border bg-card">
          <p className="text-muted-foreground">You have not submitted any grievances yet.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {grievances.map((grievance) => (
            <GrievanceCard key={grievance.id} grievance={grievance} />
          ))}
        </div>
      )}
    </div>
  );
};

export default GrievanceList;
