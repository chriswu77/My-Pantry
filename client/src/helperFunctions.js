import axios from 'axios';

const editFavorite = async (recipeId, userId, option) => {
  if (option === 'add') {
    await axios.post(`/users/${userId}/recipes`, { recipeId });
  } else {
    await axios.delete(`/users/${userId}/recipes/${recipeId}`);
  }

  const recipeData = await axios.get(`/users/${userId}/recipes`);

  return recipeData.data;
};

export default editFavorite;
