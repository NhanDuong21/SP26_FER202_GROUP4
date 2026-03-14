const API_URL = "http://localhost:3001/messages";

export const getMessages = async () => {
  const res = await fetch(API_URL);
  return res.json();
};