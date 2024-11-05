import React from "react";
import { Input, Button } from "@material-tailwind/react";

export function InputWithButton() {
  const [email, setEmail] = React.useState<string>("");
  const [isValidEmail, setIsValidEmail] = React.useState<boolean>(false);
  const [submittedEmailSuccessfully, setSubmittedEmailSuccessfully] =
    React.useState<boolean | undefined>(undefined);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = event.target.value;
    setEmail(emailValue);

    // Simple email validation regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailPattern.test(emailValue));
  };

  return (
    <div className="relative flex w-full max-w-[24rem] mx-auto">
      <Input
        type="email"
        label="Email"
        value={email}
        onChange={onChange}
        className="pr-20 text-cornsilk focus:bg-transparent  focus:ring-0"
        crossOrigin="anonymous"
      />
      <Button
        size="sm"
        disabled={!isValidEmail}
        className="!absolute right-1 top-1"
        onClick={() => {
          setSubmittedEmailSuccessfully(true);
          console.log("Email submitted successfully");
        }}
      >
        Invite
      </Button>
    </div>
  );
}
