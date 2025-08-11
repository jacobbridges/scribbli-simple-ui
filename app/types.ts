export interface User {
  title: string;
  email: string;
  avatar: string;
}

export interface Relationship {
  name: string;
  status: string;
}

export interface StoryAppearance {
  name: string;
  chapter: string;
}

export interface CharacterQuickInfo {
  age: number;
  origin: string;
  occupation: string;
  status: string;
}

export interface Character {
  name: string;
  title: string;
  biography: string[];
  footnotes: string[];
  quickInfo: CharacterQuickInfo;
  relationships: Relationship[];
  connectedLocations: string[];
  storyAppearances: StoryAppearance[];
}

export interface World {
  id: string;
  name: string;
  authorName: string;
  lastEdited: string;
  createdAt: number;
  access: 'owner' | 'shared' | 'public';
  tags: string[];
  description: string;
}