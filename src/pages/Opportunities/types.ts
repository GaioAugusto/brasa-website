export interface TeamCaptain {
  name: string;
  phone: string;
  email: string;
  instagram: string;
  image: string;
  instagramUser: string;
}

export interface Team {
  title: string;
  description: string;
  dialog: boolean;
  dialogDescription?: string;
  image: string;
  descriptionDialog?: string;
  imageDialog?: string;
  captain?: TeamCaptain;
  youtubeUrl?: string;
  instagramUrl?: string;
}

export interface OpportunitiesProps {}
export interface OpportunitiesViewProps {
  soccerTeam: Team;
  volleyballTeam: Team;
}
