// App.jsx
import { Button, TreeSelect } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoriesStart } from './store/categorySlice';
import { useState } from 'react';
import { useFetchCategories } from './hooks/useFetchCategories';


function transformToTreeData(node) {
  return {
    title: node.name,
    value: node.categoryId,
    key: node.categoryId,
    children: node.children?.map(transformToTreeData),
  };
}

function App() {
  const fetchViaHook = useFetchCategories();
  const dispatch = useDispatch();
  const categoryState = useSelector((state) => state.category);
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (value) => {
    setSelectedId(value);
    alert(`Selected category ID: ${value}`);
  };

  const handleFetchWithSaga = () => {
    dispatch(fetchCategoriesStart());
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',           // Full height of the viewport
        backgroundColor: '#f9f9f9',   // Optional background color
      }}
>
      <div
        style={{
          padding: '2rem',
          maxWidth: '600px',
          width: '100%',
          textAlign: 'center',         // Center text and inner content
        }}
  >
      <h2>Category TreeSelect</h2>

      <Button onClick={handleFetchWithSaga} type="primary" style={{ marginBottom: 16, width: '400px' }}>
        Fetch via Redux-Saga
      </Button>

      <br />

      {/* Placeholder for Hook-based Button */}
      <Button onClick={fetchViaHook} style={{ marginBottom: 16 ,width: '400px'}}>
        Fetch via Custom Hook
      </Button>

      <br />

      {categoryState.data && (
        <TreeSelect
          style={{ width: '100%' }}
          value={selectedId}
          treeData={[transformToTreeData(categoryState.data)]}
          placeholder="Please select a category"
          treeDefaultExpandAll
          onChange={handleSelect}
          popupMatchSelectWidth={false}
        />
      )}
      </div>
    </div>
  );
}

export default App;