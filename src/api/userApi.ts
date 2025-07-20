const API_BASE_URL = "http://localhost:3000"; // Your backend URL

export const getCurrentUser = async () => {
  const response = await fetch(`${API_BASE_URL}/api/v1/users/me`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("User is not authenticated");
  }

  return response.json();
};
