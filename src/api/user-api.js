const FIREBASE_DOMAIN =
  "https://flashcard-app-82c5a-default-rtdb.firebaseio.com";

export const getUser = async userId => {
  console.log("userId from api", userId);
  const response = await fetch(`${FIREBASE_DOMAIN}/users/${userId}/.json`);
  const data = await response.json();
  console.log("data from api", data);

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch a card");
  }

  const loadedUser = {
    id: userId,
    ...data,
  };

  return loadedUser;
};

export const addUser = async userData => {
  const response = await fetch(`${FIREBASE_DOMAIN}/users.json`, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to add a new card");
  }

  return data;
};
