export interface Team {
  title: string;
  description: string;
  dialog: boolean;
  dialogDescription?: string;
  image: string;
  imageDialog?: string;
}
export interface OpportunitiesProps {}
export interface OpportunitiesViewProps {
  soccerTeam: Team;
  volleyballTeam: Team;
}
