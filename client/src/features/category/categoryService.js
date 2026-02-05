import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const CATEGORIES_URL = `${BASE_URL}api/v1/categories/`;
const ARCHIVE_CATEGORIES_URL = `${BASE_URL}api/v1/categories/archive/`;

// Create new Category
const createCategory = async (category, token) => {
   const config = {
      headers: {
         authorization: `Bearer ${token}`,
      },
   };
   const response = await axios.post(CATEGORIES_URL, category, config);
   return response.data.data;
};

// Get all Categories
const getCategories = async (token) => {
   const config = {
      headers: {
         authorization: `Bearer ${token}`,
      },
   };
   const response = await axios.get(CATEGORIES_URL, config);
   return response.data.data;
};

// Update Existing Category
const updateCategory = async (categoryID, category, token) => {
   const config = {
      headers: {
         authorization: `Bearer ${token}`,
      },
   };
   const response = await axios.put(
      CATEGORIES_URL + categoryID,
      category,
      config
   );
   return response.data;
};

// Delete Existing Category
const deleteCategory = async (categoryID, token) => {
   const config = {
      headers: {
         authorization: `Bearer ${token}`,
      },
   };
   const response = await axios.delete(CATEGORIES_URL + categoryID, config);
   return response.data;
};

// Archive an Existing Category
const archiveCategory = async (categoryID, token) => {
   const config = {
      headers: {
         authorization: `Bearer ${token}`,
      },
   };
   const response = await axios.put(
      ARCHIVE_CATEGORIES_URL + categoryID,
      null,
      config
   );
   return response.data;
};

// Unarchive a Category
const restoreCategory = async (categoryID, token) => {
   const config = {
      headers: {
         authorization: `Bearer ${token}`,
      },
   };
   const response = await axios.put(
      ARCHIVE_CATEGORIES_URL + categoryID,
      null,
      config
   );
   return response.data;
};

const categoryService = {
   createCategory,
   getCategories,
   updateCategory,
   deleteCategory,
   archiveCategory,
   restoreCategory,
};

export default categoryService;
