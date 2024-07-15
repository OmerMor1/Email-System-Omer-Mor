import Email from "../models/email.js";
import User from "../models/user.js";

export const createEmail = async (req, res) => {
  const { recipientEmail, subject, body, isDraft } = req.body;
  const senderId = req.userId;

  try {
    let recipient;
    if (!isDraft) {
      recipient = await User.findOne({ email: recipientEmail });
      if (!recipient) {
        return res.status(404).json({ message: "Recipient not found" });
      }
    }

    const email = new Email({
      sender: senderId,
      recipient: recipient ? recipient._id : null,
      subject,
      body,
      isDraft,
      sentAt: isDraft ? null : Date.now(),
    });

    await email.save();

    res.status(201).json({ message: "Email created successfully", email });
  } catch (error) {
    console.error("Error creating email:", error);
    res.status(500).json({ message: "An error occurred" });
  }
};

export const getEmails = async (req, res) => {
  const userId = req.userId;

  try {
    const receivedEmails = await Email.find({ recipient: userId }).populate(
      "sender",
      "firstName lastName email"
    );
    const sentEmails = await Email.find({ sender: userId }).populate(
      "recipient",
      "firstName lastName email"
    );
    const drafts = await Email.find({ sender: userId, isDraft: true }).populate(
      "recipient",
      "firstName lastName email"
    );

    res.status(200).json({ receivedEmails, sentEmails, drafts });
  } catch (error) {
    console.error("Error fetching emails:", error);
    res.status(500).json({ message: "An error occurred" });
  }
};

export const getEmail = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const email = await Email.findOne({
      _id: id,
      $or: [{ recipient: userId }, { sender: userId }],
    }).populate("sender recipient", "firstName lastName email");
    if (!email) {
      return res.status(404).json({ message: "Email not found" });
    }

    res.status(200).json({ email });
  } catch (error) {
    console.error("Error fetching email:", error);
    res.status(500).json({ message: "An error occurred" });
  }
};
