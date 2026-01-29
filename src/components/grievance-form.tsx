"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { grievanceCategories } from "@/lib/data";
import type { Grievance } from "@/lib/data";
import { FilePlus2 } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  category: z.enum(grievanceCategories, {
    errorMap: () => ({ message: "Please select a valid category." }),
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  attachments: z.any().optional(),
});

interface GrievanceFormProps {
    onSubmit: (data: Omit<Grievance, 'id' | 'submittedAt' | 'updatedAt' | 'status' | 'history'>) => void;
}

const GrievanceForm = ({ onSubmit }: GrievanceFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: undefined,
    },
  });

  function handleFormSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values);
    form.reset();
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Submit a New Grievance</CardTitle>
        <CardDescription>
          Please provide all necessary details about your issue.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grievance Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Broken streetlight on Elm Street" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {grievanceCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detailed Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the issue in detail, including location and any other relevant information."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="attachments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attachments (Optional)</FormLabel>
                  <FormControl>
                    <Input type="file" multiple {...form.register('attachments')} />
                  </FormControl>
                  <FormDescription>
                    You can upload images or documents related to your grievance.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-accent hover:bg-accent/90">
              <FilePlus2 className="mr-2 h-4 w-4" />
              Submit Grievance
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default GrievanceForm;
