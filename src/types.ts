export interface Project {
  id: string;
  name: string;
  location: string;
  propertyType: string;
  areaSize: string; // e.g. "4,200 sq.ft."
  completionDate: string; // e.g. "Oct 2025"
  image: string;
  description: string;
  details: string[]; // e.g. ["Custom Travertine fireplace", "Solid Belgian linen drapery", "Lighting by Flos"]
  concept: string; // The philosophical design thinking behind the space
}

export interface Service {
  id: string;
  title: string;
  description: string;
  details: string[];
  image: string;
  vibe: string; // Design direction
}

export interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  projectType: string;
  location: string;
  rating: number;
}

export interface ConsultationSubmission {
  projectType: string;
  budgetRange: string;
  timelineSlot: string;
  fullName: string;
  email: string;
  phone: string;
  briefDescription: string;
}
