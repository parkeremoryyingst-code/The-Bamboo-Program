/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Benefit, Objective, ProjectComponent, FutureExpansion, SocialLink, DownloadResource } from "./types";

export const PROJECT_OVERVIEW = {
  title: "Bamboo Sustainability Initiative",
  description: "The Bamboo Sustainability Initiative is a long-term environmental project focused on reducing global deforestation, lowering pollution, and promoting renewable materials through the widespread adoption of industrial bamboo. This initiative aims to demonstrate bamboo’s potential as a scalable, eco-efficient alternative to traditional wood, plastics, and high-emission construction materials.",
  legalNotice: "The \"Bamboo Sustainability Initiative\" text, concepts, and framework are protected under international copyright law. All rights reserved."
};

export const MISSION_STATEMENT = "To accelerate the transition toward sustainable manufacturing and construction by expanding public awareness, industry adoption, and community engagement around bamboo-based materials.";

export const WHY_BAMBOO_INTRO = "Bamboo is one of the most renewable natural resources on Earth. It grows rapidly, regenerates without replanting, and offers structural strength comparable to hardwood and certain metals. By replacing environmentally harmful materials with bamboo, industries can significantly reduce carbon emissions, waste, and long-term ecological damage.";

export const ENVIRONMENTAL_BENEFITS: Benefit[] = [
  {
    id: "rapid-growth",
    title: "Rapid Growth",
    metric: "30x Faster",
    description: "Grows up to 30x faster than traditional hardwood trees, allowing for rapid and frequent harvest cycles.",
    iconName: "Zap"
  },
  {
    id: "carbon-sequestration",
    title: "Carbon Sequestration",
    metric: "35% More CO₂",
    description: "Absorbs significantly more CO₂ than most standard tree species and releases 35% more oxygen.",
    iconName: "Trees"
  },
  {
    id: "self-regenerating",
    title: "Self-Regenerating",
    metric: "No Replanting",
    description: "Requires absolutely no replanting after a harvest cycle. The root system remains intact, preventing soil erosion.",
    iconName: "RefreshCw"
  },
  {
    id: "natural-resistance",
    title: "Natural Resistance",
    metric: "Zero Pesticides",
    description: "Inherently pest-resistant, eliminating the need for harmful chemical pesticides or chemical fertilizers.",
    iconName: "ShieldCheck"
  },
  {
    id: "low-impact",
    title: "Low Impact",
    metric: "100% Biodegradable",
    description: "100% biodegradable, sustainable, and low-impact. Cultivated with minimal water footprint.",
    iconName: "Leaf"
  },
  {
    id: "industrial-versatility",
    title: "Industrial Versatility",
    metric: "Infinite Uses",
    description: "Engineered to replace wood, plastic, steel, and concrete in structures, apparel, and daily products.",
    iconName: "Cpu"
  }
];

export const CORE_OBJECTIVES: Objective[] = [
  {
    id: "env-impact",
    title: "Environmental Impact",
    description: "Promote bamboo as a renewable resource capable of reducing deforestation and restoring natural ecosystems.",
    details: "By demonstrating how bamboo can satisfy industrial demands formerly met by logging, we seek to preserve primary forests. Restoring degraded lands with bamboo forests also repairs soil structures and stabilizes water tables in critical ecosystems.",
    iconName: "Globe"
  },
  {
    id: "pollution-reduction",
    title: "Pollution Reduction",
    description: "Encourage the replacement of plastics and high-emission materials with biodegradable bamboo alternatives.",
    details: "Single-use plastic items and construction concrete represent massive carbon footprints and persistent pollution. Bamboo fibers can be processed into bioplastics, paper pulp, and bio-composites that decompose naturally without trace toxicity.",
    iconName: "Trash2"
  },
  {
    id: "industry-adoption",
    title: "Industry Adoption",
    description: "Collaborate with manufacturers, builders, and designers to integrate bamboo into supply chains.",
    details: "We consult with industrial stakeholders to engineer solutions that fit existing manufacturing flows. From structural laminated bamboo lumber (LBL) to lightweight transport packaging, we design transitions that are economically viable and physically robust.",
    iconName: "Briefcase"
  },
  {
    id: "community-education",
    title: "Community Education",
    description: "Provide accessible information, digital resources, and creator-led content to help consumers understand benefits.",
    details: "We believe education triggers adoption. By providing open-source curriculum modules, interactive digital assets, and coordinating with digital media creators, we demystify sustainable forestry and foster responsible consumerism.",
    iconName: "BookOpen"
  },
  {
    id: "long-term-innovation",
    title: "Long-Term Innovation",
    description: "Support research into advanced bamboo composites, textiles, structural materials, and next-gen products.",
    details: "Our innovation track is investigating carbon-reinforced bamboo composites, super-hydrophobic bamboo paper layers, and non-chemical enzymatic retting for bamboo textiles. We aim to break past the limits of raw timber.",
    iconName: "Lightbulb"
  }
];

export const PROJECT_COMPONENTS: ProjectComponent[] = [
  {
    id: "research-dev",
    title: "Research & Development",
    phase: "Phase 1 - Foundation",
    description: "Studying bamboo's mechanical properties, carbon footprint, and industrial applications.",
    details: "Testing tensile strength, compression limits, and moisture absorption parameters of various bamboo species (such as Moso and Guadua) to compile a public open-source material density database.",
    iconName: "Activity"
  },
  {
    id: "product-prototyping",
    title: "Product Prototyping",
    phase: "Phase 2 - Design",
    description: "Developing sample bamboo-based items such as packaging, furniture, tools, and textiles.",
    details: "Collaborating with local fabrication labs to produce physical prototypes including compostable food trays, flat-pack administrative desks, and ultra-durable structural joints.",
    iconName: "Hammer"
  },
  {
    id: "public-awareness",
    title: "Public Awareness Campaigns",
    phase: "Phase 3 - Outreach",
    description: "Creating educational content, social media outreach, and creator collaborations.",
    details: "Publishing accessible infographics, running organic short-form video campaigns, and working with design influencers to showcase the physical beauty and utility of engineered bamboo.",
    iconName: "Megaphone"
  },
  {
    id: "partnership-outreach",
    title: "Partnership Outreach",
    phase: "Phase 4 - Alignment",
    description: "Connecting with eco-friendly brands, builders, and sustainability organizations.",
    details: "Pitching green-minded corporate executives and real estate developers to outline how incorporating bamboo components into their projects boosts LEED certification scores and ESG ratings.",
    iconName: "Users"
  },
  {
    id: "community-engagement",
    title: "Community Engagement",
    phase: "Phase 5 - Activation",
    description: "Hosting workshops, digital guides, and interactive content to inspire sustainable choices.",
    details: "Establishing online community spaces, hosting practical sustainable building workshops, and supporting DIY makers with digital guides and blueprints.",
    iconName: "Compass"
  }
];

export const FUTURE_EXPANSIONS: FutureExpansion[] = [
  {
    id: "custom-merch",
    title: "Custom Bamboo Merchandise",
    description: "Sourcing premium everyday essentials made from 100% certified organic bamboo fibers and composites.",
    iconName: "ShoppingBag"
  },
  {
    id: "creator-collab",
    title: "Eco-Friendly Creator Collaborations",
    description: "Teaming up with prominent digital creators and media nodes to reach younger, action-oriented demographics.",
    iconName: "Sparkles"
  },
  {
    id: "streaming-series",
    title: "Educational Streaming Series",
    description: "A high-production-value video series documenting the path of bamboo from soil to industrial factory floors.",
    iconName: "Play"
  },
  {
    id: "nonprofit-partnerships",
    title: "Global Nonprofit Partnerships",
    description: "Directly funding reforestation and sustainable bamboo farming in sub-tropical regions through trusted NGOs.",
    iconName: "Heart"
  },
  {
    id: "digital-hub",
    title: "Centralized Digital Research Hub",
    description: "An open-source, peer-reviewed directory for structural engineers and material scientists to share test results.",
    iconName: "Database"
  }
];

export const LEADERSHIP = {
  founder: "Parker Yingst (ZenkoParx)",
  bio: "The initiative is founded and led by Parker Yingst (ZenkoParx), a creator, designer, and community builder dedicated to environmental awareness and sustainable innovation.",
  discordUrl: "https://discord.gg/4QjnppyWxa",
  discordCta: "Join the GamingOfTheSynthLab Community / Discord"
};

export const BRANDS_INFO = {
  text: "Discover why partnering with the initiative can elevate your company's eco-metrics.",
  ctaText: "Request Collaboration / Contact Form"
};

export const DOWNLOAD_RESOURCES: DownloadResource[] = [
  {
    id: "pdf-summary",
    title: "Initiative Executive Summary PDF",
    type: "PDF Document",
    size: "2.4 MB",
    description: "A complete overview of the project objectives, targets, and implementation phases."
  },
  {
    id: "data-sheet",
    title: "Bamboo Infographic Data Sheet",
    type: "PNG Graphic",
    size: "4.1 MB",
    description: "Visual charts detailing carbon absorption comparison rates and growth speeds."
  },
  {
    id: "resource-guide",
    title: "Sustainable Bamboo Resource Guide",
    type: "PDF Booklet",
    size: "5.8 MB",
    description: "A detailed guide on bamboo varieties, processing methods, and ecological certifications."
  }
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@tiktok_of_the_synthlab?lang=en",
    iconName: "Video"
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@ZenkoParxGaming",
    iconName: "Youtube"
  },
  {
    name: "Discord",
    url: "https://discord.gg/4QjnppyWxa",
    iconName: "MessageSquare"
  },
  {
    name: "Bluesky",
    url: "https://synthlabgaming.bsky.social",
    iconName: "Send"
  }
];

export const CONTACT_INFO = {
  email: "bamboo@synthlab.org",
  discord: "https://discord.gg/4QjnppyWxa",
  tiktok: "https://www.tiktok.com/@tiktok_of_the_synthlab?lang=en",
  youtube: "https://www.youtube.com/@ZenkoParxGaming",
  bluesky: "https://synthlabgaming.bsky.social"
};
