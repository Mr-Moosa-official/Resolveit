"use client";

import { useState, useEffect } from "react";
import Header from "@/components/header";
import GrievanceForm from "@/components/grievance-form";
import GrievanceList from "@/components/grievance-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import type { Grievance, GrievanceStatus } from "@/lib/data";
import { initialGrievances } from "@/lib/data";

export default function Home() {
  const [grievances, setGrievances] = useState<Grievance[]>(initialGrievances);
  const { toast } = useToast();

  const addGrievance = (data: Omit<Grievance, 'id' | 'submittedAt' | 'updatedAt' | 'status' | 'history'>) => {
    const newGrievance: Grievance = {
      ...data,
      id: `GRV-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      submittedAt: new Date(),
      updatedAt: new Date(),
      status: "Submitted",
      history: [{ status: "Submitted", date: new Date(), comments: "Grievance has been submitted successfully." }],
    };
    setGrievances(prev => [newGrievance, ...prev]);
    toast({
      title: "Grievance Submitted",
      description: `Your grievance "${newGrievance.title}" has been submitted.`,
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setGrievances(prevGrievances => {
        const updatableGrievances = prevGrievances.filter(g => g.status !== 'Resolved' && g.status !== 'Rejected');
        if (updatableGrievances.length === 0) return prevGrievances;

        const randomIndex = Math.floor(Math.random() * updatableGrievances.length);
        const grievanceToUpdate = updatableGrievances[randomIndex];
        
        let newStatus: GrievanceStatus = grievanceToUpdate.status;
        let comments = "";

        if (grievanceToUpdate.status === 'Submitted') {
          newStatus = 'In Progress';
          comments = "An officer has been assigned and is reviewing your case.";
        } else if (grievanceToUpdate.status === 'In Progress') {
          newStatus = Math.random() > 0.5 ? 'Resolved' : 'Rejected';
          if (newStatus === 'Resolved') {
            comments = "The issue has been resolved. Please check the resolution notes.";
          } else {
            comments = "The grievance has been rejected. See notes for details.";
          }
        }

        if (newStatus !== grievanceToUpdate.status) {
           toast({
            title: `Grievance Updated: ${grievanceToUpdate.id}`,
            description: `Status changed to: ${newStatus}`,
          });
          return prevGrievances.map(g => 
            g.id === grievanceToUpdate.id 
              ? { ...g, status: newStatus, updatedAt: new Date(), history: [...g.history, { status: newStatus, date: new Date(), comments }] } 
              : g
          );
        }
        return prevGrievances;
      });
    }, 8000); // Simulate updates every 8 seconds

    return () => clearInterval(interval);
  }, [toast]);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Tabs defaultValue="history">
            <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
              <TabsTrigger value="new">New Grievance</TabsTrigger>
              <TabsTrigger value="history">Grievance History</TabsTrigger>
            </TabsList>
            <TabsContent value="new">
              <GrievanceForm onSubmit={addGrievance} />
            </TabsContent>
            <TabsContent value="history">
              <GrievanceList grievances={grievances} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
