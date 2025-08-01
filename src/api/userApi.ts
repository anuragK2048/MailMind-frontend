const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getCurrentUser = async () => {
  const response = await fetch(`${API_BASE_URL}/api/v1/users/me`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("User is not authenticated");
  }

  return response.json();
};

export async function handleLogout() {
  const res = await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  const result = await res.json();
  console.log(result);
  if (result) {
    window.location.href = `/`;
  }
}

export async function handleDeleteAccount() {
  const response = await fetch(`${API_BASE_URL}/api/v1/users/me`, {
    method: "DELETE",
    credentials: "include",
  });
  if (response.status == 200) {
    window.location.href = "/";
  }
}

export async function handleUnlinkAccount(accountId) {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/gmail-accounts/${accountId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );
  if (response.status == 200) {
    window.location.href = "/inbox";
  }
}

export function handleAddNewAccount() {
  window.location.href = `${API_BASE_URL}/api/v1/auth/google/link`;
}

export function handleLogin() {
  window.location.href = `${API_BASE_URL}/api/v1/auth/google`;
}

export async function handleDemoLogin(navigate) {
  // window.location.href = `${API_BASE_URL}/api/v1/auth/demo`;
  const res = await fetch(`${API_BASE_URL}/api/v1/auth/demo`, {
    method: "GET",
    credentials: "include",
  });
  const result = await res.json();
  console.log(result);
  if (res.status == 200) {
    navigate("/inbox");
  } else alert("Unable to login, server issue");
}
