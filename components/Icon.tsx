type IconStyle =
  | "material-symbols-outlined"
  | "material-symbols-rounded"
  | "material-symbols-sharp";

type IconProps = {
  iconName: string;
  styles?: string;
  iconStyle?: IconStyle;
};

// displays Google icons found here: https://fonts.google.com/icons
// find iconName in the bottom of the right sidebar
// for advanced configs: https://developers.google.com/fonts/docs/material_symbols
export const Icon = ({
  iconName,
  styles = "",
  iconStyle = "material-symbols-outlined",
}: IconProps) => {
  return (
    <span className={`select-none ${iconStyle} ${styles} `}>{iconName}</span>
  );
};

<svg
  xmlns="http://www.w3.org/2000/svg"
  height="24px"
  viewBox="0 -960 960 960"
  width="24px"
  fill="#D3E0E3"
>
  <path d="M160-120v-480l320-240 320 240v480H560v-280H400v280H160Z" />
</svg>;
