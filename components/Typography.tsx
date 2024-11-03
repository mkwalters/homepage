import React, { forwardRef } from "react";
import {
  Typography as MaterialTypography,
  TypographyProps,
} from "@material-tailwind/react";

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  ({ children, ...props }, ref) => (
    <MaterialTypography
      {...props}
      ref={ref}
      className="font-montserrat text-cornsilk"
    >
      {children}
    </MaterialTypography>
  )
);

Typography.displayName = "Typography";
