import sgMail from "@sendgrid/mail";
import { PrismaClient } from "@prisma/client";

sgMail.setApiKey(process.env.SEND_GRID_API_KEY as string);

const prisma = new PrismaClient();

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
    asm: {
      groupId: 25620,
    },
  };

  return sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent to", to);
    })
    .catch((error) => {
      console.error("SendGrid error:", error);
    });
};

export const notifyFriendsOfMove = async () => {
  try {
    // Fetch friends from your Prisma database
    const friends = await prisma.friend.findMany();

    if (friends.length === 0) {
      console.log("No friends found to notify.");
      return;
    }

    // Iterate over each friend and send an email
    await Promise.all(
      friends.map((friend) =>
        sendEmail({
          to: friend.email,
          subject: "Your move",
          text: "Mitchell just made his move. Stop by and play a move if you have a minute: https://mitchellwalters.com/interests/chess",
          html: "<p>Mitchell just made his move. Stop by and play a move if you have a minute: https://mitchellwalters.com/interests/chess</p>",
        })
      )
    );

    console.log("All emails sent successfully.");
  } catch (error) {
    console.error("Error notifying friends:", error);
  } finally {
    await prisma.$disconnect();
  }
};
