const API_BASE_URL = "http://localhost:3000";

export const getEmailsByLabel = async (labelId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/emails/by-label/${labelId}`,
      {
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch emails");
    }
    const emails = await response.json();
    return emails;
  } catch (err) {
    console.error(err);
  }
};

export const getEmailByEmailId = async (emailId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/emails/${emailId}`, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch email");
    }
    const email = await response.json();
    return email;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};
