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

export type TFilterType = 'species' | 'gender' | 'status';

export type TCharacter = {
  id: number;
  name: string;
  gender: TGender;
  species: TSpecies;
  location: string;
  status: TStatus;
};
