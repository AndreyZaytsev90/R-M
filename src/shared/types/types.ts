export type TStatus = 'alive' | 'dead' | 'unknown';
export type TGender = 'Female' | 'Male' | 'Genderless' | 'Unknown';
export type TSpecies =
  | 'Human'
  | 'Alien'
  | 'Humanoid'
  | 'Animal'
  | 'Robot'
  | 'Cronenberg'
  | 'Disease';

export type TFilterType = 'name' | 'species' | 'gender' | 'status';

export type TLocation = {
  name: string;
  url: string;
};

export type TCharacter = {
  id: number;
  name: string;
  status: TStatus;
  species: TSpecies;
  type: string;
  gender: TGender;
  origin: TLocation;
  location: TLocation;
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type TCharactersResponse = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: TCharacter[];
};

export type TSelectOption<T> = { label: string; value: T };
