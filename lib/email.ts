import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SEND_GRID_API_KEY as string);

interface SendEmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export const sendEmail = async ({
  to,
  subject,
  text,
  html,
}: SendEmailOptions): Promise<void> => {
  const msg = {
    to,
    from: "mitchellkellywalters@gmail.com",
    subject,
    text,
    html,
  };

  return sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error("SendGrid error:", error);
    });
};
