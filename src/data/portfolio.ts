export const portfolioItems = [
  {
    id: "techmart-transformation",
    title: "TechMart Digital Transformation",
    client: "TechMart Electronics",
    industry: "Retail Electronics",
    service: "Digital Transformation",
    thumbnail: "/images/portfolio/techmart.jpg",
    description:
      "Complete digital overhaul of a traditional electronics retailer, transforming them into an omnichannel powerhouse.",
    challenge:
      "TechMart was struggling with outdated inventory systems, disconnected sales channels, and declining foot traffic. They needed a comprehensive digital transformation to compete with online giants.",
    solution:
      "We implemented an integrated ERP system, launched a modern ecommerce platform, and created seamless connections between their physical and digital stores. Added real-time inventory tracking and AI-powered demand forecasting.",
    results: [
      { metric: "200%", label: "Increase in online sales" },
      { metric: "45%", label: "Reduction in inventory costs" },
      { metric: "3x", label: "Customer engagement" },
      { metric: "60%", label: "Faster order processing" },
    ],
    testimonial: {
      quote:
        "Hexor didn't just digitize our business—they revolutionized how we think about retail. Our customers now enjoy a seamless experience whether they shop online or in-store.",
      author: "Rajesh Kumar",
      role: "CEO, TechMart Electronics",
    },
    featured: true,
  },
  {
    id: "greenleaf-automation",
    title: "GreenLeaf Manufacturing Automation",
    client: "GreenLeaf Organics",
    industry: "Food & Beverage",
    service: "Automation Solutions",
    thumbnail: "/images/portfolio/greenleaf.jpg",
    description:
      "End-to-end automation of production and quality control processes for an organic food manufacturer.",
    challenge:
      "Manual quality checks were causing bottlenecks and inconsistencies. Order processing took too long, and inventory management was chaotic.",
    solution:
      "Deployed IoT sensors for real-time quality monitoring, automated the entire order-to-fulfillment pipeline, and implemented predictive maintenance for equipment.",
    results: [
      { metric: "85%", label: "Reduction in quality issues" },
      { metric: "4x", label: "Faster order processing" },
      { metric: "30%", label: "Decrease in downtime" },
      { metric: "50%", label: "Labor cost savings" },
    ],
    testimonial: {
      quote:
        "The automation solutions from Hexor have transformed our operations. We've scaled production significantly while maintaining the quality our customers expect.",
      author: "Priya Sharma",
      role: "Operations Director, GreenLeaf Organics",
    },
    featured: true,
  },
  {
    id: "fashionista-ecommerce",
    title: "Fashionista Ecommerce Launch",
    client: "Fashionista Boutique",
    industry: "Fashion Retail",
    service: "Ecommerce Management",
    thumbnail: "/images/portfolio/fashionista.jpg",
    description:
      "Complete ecommerce platform development and management for a growing fashion brand.",
    challenge:
      "A successful local boutique wanted to expand nationally but lacked the technical expertise and infrastructure to manage an online store.",
    solution:
      "Built a custom Shopify Plus store with AI-powered product recommendations, implemented automated inventory sync across channels, and set up efficient fulfillment workflows.",
    results: [
      { metric: "500%", label: "Growth in online revenue" },
      { metric: "25%", label: "Higher average order value" },
      { metric: "40%", label: "Repeat customer rate" },
      { metric: "12", label: "New markets reached" },
    ],
    testimonial: {
      quote:
        "From a single store in Mumbai to shipping nationwide—Hexor made our dream of national expansion a reality. Their ecommerce expertise is unmatched.",
      author: "Anita Desai",
      role: "Founder, Fashionista Boutique",
    },
    featured: true,
  },
  {
    id: "urbanfit-social",
    title: "UrbanFit Social Media Growth",
    client: "UrbanFit Gym Chain",
    industry: "Fitness & Wellness",
    service: "Social Media Management",
    thumbnail: "/images/portfolio/urbanfit.jpg",
    description:
      "Strategic social media management that turned a local gym chain into a fitness lifestyle brand.",
    challenge:
      "Despite having great facilities and trainers, UrbanFit was struggling to attract new members. Their social media presence was minimal and inconsistent.",
    solution:
      "Developed a comprehensive content strategy featuring member transformations, workout tips, and behind-the-scenes content. Launched targeted ad campaigns and influencer partnerships.",
    results: [
      { metric: "10x", label: "Instagram followers" },
      { metric: "300%", label: "Increase in leads" },
      { metric: "65%", label: "Membership growth" },
      { metric: "8.5%", label: "Engagement rate" },
    ],
    testimonial: {
      quote:
        "Our social media went from an afterthought to our primary lead generation channel. Hexor's creative approach and strategic thinking made all the difference.",
      author: "Vikram Singh",
      role: "Marketing Head, UrbanFit",
    },
    featured: false,
  },
];

export type PortfolioItem = (typeof portfolioItems)[number];
