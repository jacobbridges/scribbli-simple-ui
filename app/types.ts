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
  lastEdited: string;
  access: 'owner' | 'shared' | 'public';
  character: Character; // In a real app, this would be a list of entities
  description: string;
}