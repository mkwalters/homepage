import React from "react";
import { Input, Button } from "@material-tailwind/react";
import { Typography } from "./Typography";

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

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/friend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok || response.status === 403) {
        setSubmittedEmailSuccessfully(true);
        console.log("Email submitted successfully");
      } else {
        setSubmittedEmailSuccessfully(false);
        console.error("Failed to submit email");
      }
    } catch (error) {
      setSubmittedEmailSuccessfully(false);
      console.error("Error submitting email:", error);
    }
  };

  return !submittedEmailSuccessfully ? (
    <div className="relative flex w-full max-w-[24rem] mx-auto">
      <Input
        type="email"
        label="Email"
        value={email}
        onChange={onChange}
        className="pr-20 text-cornsilk focus:bg-transparent focus:ring-0"
        crossOrigin="anonymous"
        labelProps={{
          style: { color: "#FEFAE0", opacity: 0.4 }, // cornsilk
        }}
      />
      <Button
        size="sm"
        disabled={!isValidEmail}
        className="!absolute right-1 top-1"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  ) : (
    <div>
      <Typography>Email submitted successfully! 🤗</Typography>
    </div>
  );
}
