

import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure
} from './categorySlice';

// Worker Saga: performs the API call
function* fetchCategoriesWorker() {
  try {
    const response = yield call(fetch, 'http://localhost:8080/categories');
    const data = yield response.json();
    yield put(fetchCategoriesSuccess(data)); // dispatch success action
  } catch (error) {
    yield put(fetchCategoriesFailure(error.message));
  }
}

// Watcher Saga: watches for fetchCategoriesStart action
function* rootSaga() {
  yield takeLatest(fetchCategoriesStart.type, fetchCategoriesWorker);
}

export default rootSaga;
