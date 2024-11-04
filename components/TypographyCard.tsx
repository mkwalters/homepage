import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  styles?: string;
}

const Card = ({ children, styles = "" }: CardProps) => {
  return (
    <div className={`flex bg-dark-moss-green p-2 rounded-xl ${styles}`}>
      {children}
    </div>
  );
};

export default Card;
