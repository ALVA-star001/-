
export interface Product {
  id: string; // Internal ID
  archiveId: string; // Display ID like N°001
  codeName: string; // The abstract title e.g. "The Azure of Infinity"
  title: string; // Original title kept for reference or subtitle
  description: string;
  fullDescription?: string; // Long description for modal
  imageUrl: string;
  galleryImages?: string[]; // Additional images for the modal
  tags: string[];
  category: 'luxury' | 'atmosphere' | 'minimalist' | 'special';
  craftParams: {
    size: string;
    time: string;
    techniques: string[];
  };
  isNew?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
  isButton?: boolean; // For the CTA
  items?: NavItem[]; // For dropdowns
  action?: string; // For custom actions like 'consult'
}

export interface ShowcaseItem {
  id: number;
  img: string;
  author: string;
  avatar?: string;
  comment: string;
  tag: 'OFFICIAL' | 'STARFIRE';
}
