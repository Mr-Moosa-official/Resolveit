export const grievanceCategories = [
  "Infrastructure",
  "Healthcare",
  "Sanitation",
  "Education",
  "Public Transport",
  "Other",
] as const;

export type GrievanceCategory = (typeof grievanceCategories)[number];
export type GrievanceStatus = "Submitted" | "In Progress" | "Resolved" | "Rejected";

export type GrievanceHistory = {
  status: GrievanceStatus;
  date: Date;
  comments: string;
};

export type Grievance = {
  id: string;
  title: string;
  category: GrievanceCategory;
  description: string;
  submittedAt: Date;
  updatedAt: Date;
  status: GrievanceStatus;
  attachments?: { name: string; url: string; hint: string }[];
  resolutionDetails?: string;
  history: GrievanceHistory[];
};

export const initialGrievances: Grievance[] = [
  {
    id: "GRV-8B3F5D",
    title: "Broken Streetlight on Elm Street",
    category: "Infrastructure",
    description: "The streetlight in front of 123 Elm Street has been out for over a week, creating a safety hazard at night.",
    submittedAt: new Date(new Date().setDate(new Date().getDate() - 10)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 2)),
    status: "Resolved",
    resolutionDetails: "Municipal electrical team was dispatched and replaced the faulty bulb and wiring on 2024-07-18. The area is now well-lit.",
    history: [
      { status: "Submitted", date: new Date(new Date().setDate(new Date().getDate() - 10)), comments: "Grievance submitted." },
      { status: "In Progress", date: new Date(new Date().setDate(new Date().getDate() - 7)), comments: "Assigned to electrical department." },
      { status: "Resolved", date: new Date(new Date().setDate(new Date().getDate() - 2)), comments: "Work completed by maintenance crew." },
    ],
    attachments: [
        {name: "photo1.jpg", url: "https://picsum.photos/seed/101/400/300", hint: "broken streetlight"},
        {name: "photo2.jpg", url: "https://picsum.photos/seed/102/400/300", hint: "dark street"},
    ]
  },
  {
    id: "GRV-A9C2E1",
    title: "Irregular Garbage Collection",
    category: "Sanitation",
    description: "Garbage collection in the Oak Avenue neighborhood has been very inconsistent for the past month. Bins are overflowing.",
    submittedAt: new Date(new Date().setDate(new Date().getDate() - 5)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    status: "In Progress",
    history: [
      { status: "Submitted", date: new Date(new Date().setDate(new Date().getDate() - 5)), comments: "Grievance submitted." },
      { status: "In Progress", date: new Date(new Date().setDate(new Date().getDate() - 1)), comments: "Forwarded to the sanitation department supervisor for immediate action." },
    ],
    attachments: [
        {name: "overflowing-bin.jpg", url: "https://picsum.photos/seed/201/400/300", hint: "garbage overflow"},
        {name: "street-view.jpg", url: "https://picsum.photos/seed/202/400/300", hint: "dirty street"},
    ]
  },
  {
    id: "GRV-G4H7J9",
    title: "Lack of books in public library",
    category: "Education",
    description: "The city's public library has a severe shortage of new books, especially for children and young adults. The current collection is outdated.",
    submittedAt: new Date(new Date().setDate(new Date().getDate() - 2)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 2)),
    status: "Submitted",
    history: [
      { status: "Submitted", date: new Date(new Date().setDate(new Date().getDate() - 2)), comments: "Grievance submitted and awaiting review." },
    ],
    attachments: [
        {name: "empty-shelves.jpg", url: "https://picsum.photos/seed/301/400/300", hint: "library shelves"},
        {name: "old-books.jpg", url: "https://picsum.photos/seed/302/400/300", hint: "old books"},
    ],
  },
   {
    id: "GRV-K2L3M4",
    title: "Pothole on Main and 4th",
    category: "Infrastructure",
    description: "A large and dangerous pothole has formed at the intersection of Main Street and 4th Avenue. It poses a risk to vehicles and cyclists.",
    submittedAt: new Date(new Date().setDate(new Date().getDate() - 20)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 15)),
    status: "Rejected",
    resolutionDetails: "Duplicate report. This issue was already reported under GRV-X5Y6Z7 and has been scheduled for repair.",
    history: [
      { status: "Submitted", date: new Date(new Date().setDate(new Date().getDate() - 20)), comments: "Grievance submitted." },
      { status: "In Progress", date: new Date(new Date().setDate(new Date().getDate() - 18)), comments: "Reviewed by public works department." },
      { status: "Rejected", date: new Date(new Date().setDate(new Date().getDate() - 15)), comments: "Marked as duplicate of an existing report." },
    ],
    attachments: [
        {name: "pothole-close-up.jpg", url: "https://picsum.photos/seed/401/400/300", hint: "road pothole"},
        {name: "pothole-street.jpg", url: "https://picsum.photos/seed/402/400/300", hint: "street pothole"},
        {name: "car-damage.jpg", url: "https://picsum.photos/seed/403/400/300", hint: "damaged tire"},
    ],
  },
  {
    id: "GRV-P5T8U9",
    title: "Infrequent bus service on Route 7",
    category: "Public Transport",
    description: "The bus service on Route 7 is extremely infrequent, with buses often arriving late or not at all, causing major disruptions for commuters.",
    submittedAt: new Date(new Date().setDate(new Date().getDate() - 3)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    status: "In Progress",
    history: [
      { status: "Submitted", date: new Date(new Date().setDate(new Date().getDate() - 3)), comments: "Grievance has been submitted." },
      { status: "In Progress", date: new Date(new Date().setDate(new Date().getDate() - 1)), comments: "Complaint forwarded to the transport authority." },
    ],
    attachments: [
        {name: "bus-stop-crowd.jpg", url: "https://picsum.photos/seed/501/400/300", hint: "crowded bus stop"},
        {name: "late-bus.jpg", url: "https://picsum.photos/seed/502/400/300", hint: "bus schedule"},
    ]
  },
  {
    id: "GRV-H3A4L5",
    title: "Long wait times at City General Hospital",
    category: "Healthcare",
    description: "The emergency room at City General Hospital has dangerously long wait times. Patients are waiting hours to be seen for urgent medical issues.",
    submittedAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    status: "Submitted",
    history: [
      { status: "Submitted", date: new Date(new Date().setDate(new Date().getDate() - 1)), comments: "Grievance submitted. Awaiting review from hospital administration." },
    ],
    attachments: [
        {name: "hospital-waiting-room.jpg", url: "https://picsum.photos/seed/601/400/300", hint: "hospital waiting room"},
        {name: "emergency-sign.jpg", url: "https://picsum.photos/seed/602/400/300", hint: "emergency room"},
    ]
  }
];
