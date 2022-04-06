const FIREBASE_DOMAIN =
  "https://flashcard-app-82c5a-default-rtdb.firebaseio.com";

export const getCards = async () => {
  const response = await fetch(`${FIREBASE_DOMAIN}/cards.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch cards");
  }

  const loadedCards = [];

  for (const key in data) {
    const cardObj = {
      id: key,
      ...data[key],
    };

    loadedCards.push(cardObj);
  }

  return loadedCards;
};

export const addCard = async cardData => {
  const request = await fetch(`${FIREBASE_DOMAIN}/cards.json`, {
    method: "POST",
    body: JSON.stringify(cardData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await request.json();

  if (!request.ok) {
    throw new Error(data.message || "Failed to add a new card");
  }

  return null;
};
