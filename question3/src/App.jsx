// App.jsx
import { Button, TreeSelect } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoriesStart } from './store/categorySlice';
import { useState } from 'react';

function transformToTreeData(node) {
  return {
    title: node.name,
    value: node.categoryId,
    key: node.categoryId,
    children: node.children?.map(transformToTreeData),
  };
}

function App() {
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
    <div style={{ padding: '2rem', maxWidth: 600, margin: '0 auto' }}>
      <h2>Category TreeSelect</h2>

      <Button onClick={handleFetchWithSaga} type="primary" style={{ marginBottom: 16 }}>
        Fetch via Redux-Saga
      </Button>

      <br />

      {/* Placeholder for Hook-based Button */}
      <Button disabled style={{ marginBottom: 16 }}>
        Fetch via Custom Hook (coming next)
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
        />
      )}
    </div>
  );
}

export default App;