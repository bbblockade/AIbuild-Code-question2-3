import { useDispatch } from 'react-redux';
import { fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFailure } from '../store/categorySlice';

export function useFetchCategories() {
  const dispatch = useDispatch();

  const fetchData = async () => {
    dispatch(fetchCategoriesStart());

    try {
      const response = await fetch('http://localhost:8080/categories');
      const data = await response.json();
      dispatch(fetchCategoriesSuccess(data));
    } catch (error) {
      dispatch(fetchCategoriesFailure(error.toString()));
    }
  };

  return fetchData; // return the function so the caller can trigger it
}