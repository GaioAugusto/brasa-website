export interface LoginButtonProps {
  mode: string;
}
export interface LoginButtonViewProps {
  colors: LoginButtonColors;
  handleClick: () => void;
}

export interface LoginButtonColors {
  baseColor: string;
  hoverBg: string;
  hoverBorder: string;
}
