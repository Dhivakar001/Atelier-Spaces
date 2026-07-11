import { Project, Service, Testimonial } from "./types";

export const BRAND_VALUES = [
  {
    title: "Honesty of Materials",
    description: "We work with raw, natural elements—unfilled Italian travertine, dark-aged rift oak, textured limewash, and solid brass—allowing their native beauty to age with dignity."
  },
  {
    title: "Spatially Inherent",
    description: "Our design is never applied; it is found. We reveal the inherent architecture, optimizing natural light, volumetric balance, and axes of movement."
  },
  {
    title: "Quiet Luxury",
    description: "True luxury is felt rather than announced. We eliminate unnecessary decoration to invite visual quietness and a sense of meditative safety."
  }
];

export const PORTFOLIO_PROJECTS: Project[] = [
  {
    id: "proj_malibu",
    name: "The Coastal Monolith",
    location: "Anjuna, Goa",
    propertyType: "Coastal Villa",
    areaSize: "6,400 sq.ft.",
    completionDate: "November 2025",
    image: "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?auto=format&fit=crop&w=1200&q=80",
    description: "An absolute study in architectural weight and air. Perched above the Arabian Sea, this residence acts as an extension of the cliffside terrain.",
    concept: "We selected a monolithic architectural posture—using raw hammered sand-colored concrete, local Goa laterite rock accents, limestone tiles, and sliding oversized glass screens. It blurs the border of the shoreline and the hearth, creating a continuous light-reflective plane.",
    details: [
      "Custom unfilled travertine kitchen island",
      "Raw linen wallcoverings and handloom accents",
      "Floor-to-ceiling minimal frameless glass from Sky-Frame",
      "Bespoke teakwood slatted thermal bath",
      "Vintage Pierre Jeanneret Easy Chairs"
    ]
  },
  {
    id: "proj_manhattan",
    name: "The Malabar Sanctuary",
    location: "Malabar Hill, Mumbai",
    propertyType: "Duplex Penthouse",
    areaSize: "4,200 sq.ft.",
    completionDate: "May 2025",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    description: "A highly refined luxury penthouse designed to shut out the kinetic noise of Mumbai and provide absolute meditative rest.",
    concept: "Using soft-textured Belgian linen, Rajasthani dholpur limestone fireplaces, and dark-fumed Indian teak, we converted a cold modern layout into warm, layered zones. Elements are connected by custom-shadowline baseboards and custom doors that sit flush against the walls.",
    details: [
      "Monolithic raw plaster hearth centerpiece",
      "Engineered hand-scraping dark-fumed Indian teak planks",
      "Concealed flush frameless cabinet architecture",
      "Sculptural Makrana marble bathroom with drop-in solid basin",
      "Custom integrated museum-grade track lighting by Erco"
    ]
  },
  {
    id: "proj_kyoto",
    name: "Nilgiri Pavilion",
    location: "Ooty, Tamil Nadu",
    propertyType: "Luxury Hideaway",
    areaSize: "3,100 sq.ft.",
    completionDate: "August 2025",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    description: "A contemporary mountain hideaway drawing structural logic from traditional Nilgiri timber craftsmanship integrated with modern minimalism.",
    concept: "With sliding glass glass-facades, aromatic cedar lumber, and textured Western Ghats basalt rock tiles, we focused on light and shadow. The space reacts delicately to the dramatic shifts of Indian monsoons.",
    details: [
      "Aromatic Cedar timber structural gridwork",
      "Custom handloom silk screens from local weavers",
      "Volcanic basalt stone terrace paving",
      "Bespoke dining suite in solid rosewood",
      "Low-profile bespoke wool seating loops"
    ]
  },
  {
    id: "proj_milano",
    name: "Atelier New Delhi",
    location: "Lutyens' Delhi, New Delhi",
    propertyType: "Design Showroom & Residence",
    areaSize: "3,800 sq.ft.",
    completionDate: "February 2025",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    description: "A bold, highly artistic duplex pairing mid-century geometry with absolute restraint in finishes, set inside a heritage estate.",
    concept: "Our main mission was to breathe new life into a historic British-colonial style architectural frame in New Delhi. We preserved the terrazzo borders while introducing stark matte-black steel stair structures and raw brushed stainless steel kitchen modules.",
    details: [
      "Restored original Indian terrazzo with brass transitions",
      "Brushed stainless steel bespoke kitchen by Boffi",
      "Custom architectural steel spiral staircase",
      "Venetian marmorino plaster finish on walls",
      "Limited edition lighting by Michael Anastassiades"
    ]
  },
  {
    id: "proj_copenhagen",
    name: "Deccan Court",
    location: "Jubilee Hills, Hyderabad",
    propertyType: "Courtyard Residence",
    areaSize: "2,900 sq.ft.",
    completionDate: "December 2024",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80",
    description: "A warm, daylight-responsive courtyard home styled with soft native ash, light linen block-prints, and curated vintage Indian art.",
    concept: "Indirect light and natural cross-ventilation are the absolute design authorities here. We oriented the interior layout entirely around a triple-height open courtyard, filtering summer heat across smooth acoustic timber slats.",
    details: [
      "Teakwood wide planks from sustainable forests",
      "Custom acoustic warm-oak slatted ceiling panels",
      "Bespoke limestone bathroom clad in modular block stones",
      "Vintage Indian handcrafted ceramic art curation",
      "Warm boucle wool modular sofa system"
    ]
  },
  {
    id: "proj_paris",
    name: "The Alibaug Retreat",
    location: "Alibaug, Maharashtra",
    propertyType: "Classical-Modern Villa",
    areaSize: "3,300 sq.ft.",
    completionDate: "March 2025",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
    description: "A classically detailed beachside villa elevated with brave contemporary monolithic block furniture.",
    concept: "To maintain contrast, we carefully preserved high-arched traditional thresholds and lime-plaster ceilings, while inserting ultra-modern slabs of Indian green Kota stone and dark matte-black steel.",
    details: [
      "Meticulously restored hand-polished lime-plaster details",
      "Original oiled teak chevron wood flooring",
      "Solid forest-green Indian marble monolithic fireplace fireplace",
      "Contemporary minimalist bronze and glass chandelier",
      "Polished resin floor slabs in open bath wet zone"
    ]
  }
];

export const DESIGN_SERVICES: Service[] = [
  {
    id: "serv_residential",
    title: "Residential Interiors",
    description: "Every residential project is designed as an intimate autobiography of its occupants, where spatial flow is engineered around the human rhythm.",
    details: [
      "Bespoke spatial mapping and layout coordination",
      "Curated custom soft-furniture and art sourcing",
      "Tailored material and lighting schedule design",
      "Turnkey white-glove site delivery and styling"
    ],
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    vibe: "Warm minimalist, bespoke materials, luxury living"
  },
  {
    id: "serv_commercial",
    title: "Premium Commercial Spaces",
    description: "Architectural and spatial styling for boutique hotels, galleries, and high-end flagship spaces. We design spaces that feel like residential sanctuaries.",
    details: [
      "Spatial acoustic and physical wellness engineering",
      "Luxury experience strategy and touchpoint mapping",
      "Custom millwork, custom greeting desks and visual frames",
      "Commercial-grade luxury materials and lighting plans"
    ],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    vibe: "High-end corporate, galleries, architectural presence"
  },
  {
    id: "serv_villas",
    title: "Luxury Villas",
    description: "Comprehensive luxury estate planning from architectural alignment to final interior finishes, prioritizing clean monolithic lines.",
    details: [
      "Integration with landscape and structural architects",
      "Enormous structural openings and window optimization",
      "Custom oversized stone fabrication plans",
      "Outdoor spaces, wellness zones, and subterranean design"
    ],
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    vibe: "Monolithic, expansive landscape integration, high budget"
  },
  {
    id: "serv_furniture",
    title: "Custom Furniture Design",
    description: "We sketch, prototype, and manufacture completely bespoke furniture items, utilizing local stone carvers and master wood artisans.",
    details: [
      "Bespoke conceptual sketches and 3D modeling",
      "Material exploration (solid travertine, hand-brushed steel, dark oak)",
      "Collaboration with leading European master craftsmen",
      "Exclusive numbered limited series tags"
    ],
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80",
    vibe: "Craftsmanship, collectible design, geometric clarity"
  }
];

export const CLIENT_STORIES: Testimonial[] = [
  {
    id: "story_1",
    quote: "Working with Atelier Spaces was a revelation in subtraction. They helped us understand what we did not need, and gave us a home where light and silence are the ultimate luxuries. Our guests are instantly speechless. The level of craftsmanship and detail is exquisite.",
    clientName: "Vikramaditya Birla",
    projectType: "The Coastal Monolith",
    location: "Anjuna, Goa",
    rating: 5
  },
  {
    id: "story_2",
    quote: "Atelier Spaces designs with the rigour of an architect and the sensitive eye of an editorial stylist. They treated our Malabar Hill home like an exhibition. Every marble edge, every handloom texture, and every light transition is utterly flawless.",
    clientName: "Ananya & Kabir Kapur",
    projectType: "The Malabar Sanctuary",
    location: "Mumbai, MH",
    rating: 5
  },
  {
    id: "story_3",
    quote: "They understand how materials talk to each other. Building our retreat in Ooty with Cedar lumber and custom-woven heritage silks was a masterclass in modern Zen. We could not have chosen a more trustful partner.",
    clientName: "Dr. Aditi Krishnan",
    projectType: "Nilgiri Pavilion",
    location: "Ooty, TN",
    rating: 5
  }
];
