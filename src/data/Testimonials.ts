export const testimonials = [
  {
    id: 1,
    quote:
      "Hexor transformed our entire business operations. What used to take our team hours now happens automatically. The ROI has been incredible.",
    author: "Rajesh Kumar",
    role: "CEO",
    company: "TechMart Electronics",
    avatar: "/images/testimonials/avatar-1.jpg",
  },
  {
    id: 2,
    quote:
      "Working with Hexor felt like having an in-house digital team. They understood our challenges and delivered solutions that actually work.",
    author: "Priya Sharma",
    role: "Operations Director",
    company: "GreenLeaf Organics",
    avatar: "/images/testimonials/avatar-2.jpg",
  },
  {
    id: 3,
    quote:
      "From zero online presence to a thriving ecommerce business—Hexor made it possible. Their expertise in digital commerce is unmatched.",
    author: "Anita Desai",
    role: "Founder",
    company: "Fashionista Boutique",
    avatar: "/images/testimonials/avatar-3.jpg",
  },
  {
    id: 4,
    quote:
      "The social media strategy Hexor developed for us generated more leads in 3 months than we had in the previous year. Absolutely phenomenal results.",
    author: "Vikram Singh",
    role: "Marketing Head",
    company: "UrbanFit",
    avatar: "/images/testimonials/avatar-4.jpg",
  },
  {
    id: 5,
    quote:
      "What sets Hexor apart is their genuine commitment to MSME success. They don't just provide services—they become partners in your growth journey.",
    author: "Meera Patel",
    role: "Managing Director",
    company: "Patel Industries",
    avatar: "/images/testimonials/avatar-5.jpg",
  },
];

export type Testimonial = (typeof testimonials)[number];
