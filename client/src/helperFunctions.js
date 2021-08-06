import axios from 'axios';

const editFavorite = async (recipeId, userId, option) => {
  if (option === 'add') {
    await axios.post(`/api/users/${userId}/recipes`, { recipeId });
  } else {
    await axios.delete(`/api/users/${userId}/recipes/${recipeId}`);
  }

  const recipeData = await axios.get(`/api/users/${userId}/recipes`);

  return recipeData.data;
};

export default editFavorite;
