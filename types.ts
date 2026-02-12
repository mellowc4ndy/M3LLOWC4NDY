
export interface ArchiveItem {
  id: string;
  title: string;
  category: string;
  date: string;
  description: string;
  imageUrl: string;
  code: string; // Like a unique serial number in Arknights
}

export interface SocialLink {
  label: string;
  url: string;
  icon: string;
}
