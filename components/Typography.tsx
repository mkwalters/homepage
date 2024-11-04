import React, { forwardRef } from "react";
import {
  Typography as MaterialTypography,
  TypographyProps,
} from "@material-tailwind/react";

interface CustomTypographyProps extends TypographyProps {
  styles?: string;
}

export const Typography = forwardRef<HTMLElement, CustomTypographyProps>(
  ({ children, styles = "", ...props }, ref) => (
    <MaterialTypography
      {...props}
      ref={ref}
      className={`font-montserrat text-cornsilk ${styles}`}
    >
      {children}
    </MaterialTypography>
  )
);

Typography.displayName = "Typography";
