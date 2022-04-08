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

    loadedCards.unshift(cardObj);
  }

  return loadedCards;
};

export const getSingleCard = async cardId => {
  const response = await fetch(`${FIREBASE_DOMAIN}/cards/${cardId}/.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch the card");
  }

  const loadedCard = {
    id: cardId,
    ...data,
  };

  return loadedCard;
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

  return data;
};

export const deleteCard = async cardId => {
  const request = await fetch(`${FIREBASE_DOMAIN}/cards/${cardId}/.json`, {
    method: "DELETE",
    body: JSON.stringify(cardId),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await request.json();

  if (!request.ok) {
    throw new Error(data.message || "Failed to delete the card");
  }

  return null;
};

export const updateCard = async (cardId, cardData) => {
  const request = await fetch(`${FIREBASE_DOMAIN}/cards/${cardId}/.json`, {
    method: "PATCH",
    body: JSON.stringify(cardData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await request.data;

  if (!request.ok) {
    throw new Error(data.message || "Failed to edit the card");
  }

  return null;
};
