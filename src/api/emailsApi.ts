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

export const getSelectedEmailsByLabel = async (
  labelId,
  emailAccountIds,
  page,
  limit
) => {
  const params = new URLSearchParams();
  params.append("page", page);
  params.append("limit", limit);
  params.append("systemView", "INBOX");
  if (labelId == "all" || labelId == "other") {
    params.append("inboxCategory", labelId);
  } else {
    params.append("inboxCategory", "label");
  }
  emailAccountIds?.forEach((element) => {
    params.append("emailAccountIds", element);
  });
  const queryString = params.toString();
  const inboxCateg = labelId;
  console.log(queryString);
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/emails/inbox/${inboxCateg}?${queryString}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
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

export const getEmailsBySystemLabel = async (
  systemLabel,
  emailAccountIds,
  page,
  limit
) => {
  console.log(page);
  const params = new URLSearchParams();
  params.append("page", page);
  params.append("limit", limit);
  emailAccountIds?.forEach((element) => {
    params.append("emailAccountIds", element);
  });
  const queryString = params.toString();
  console.log(queryString);
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/emails/system/${systemLabel}?${queryString}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
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
