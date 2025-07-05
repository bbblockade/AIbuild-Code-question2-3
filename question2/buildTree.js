// buildTree.js

/**
 * Converts a flat array of categories into a nested tree structure.
 * Each category is placed inside its parent's `children` array.
 *
 * @param {Array} categories - The flat array of category objects
 * @returns {Object} - The root node with nested children
 */
import { fileURLToPath } from 'url';

function buildCategoryTree(categories) {
  const map = {};  

  const root = {
    categoryId: 'root',
    name: 'Root Category',
    parent: null,
    children: []
  };


  // For each category, store it in the map using its categoryId as the key,
  // and add an empty `children` array to hold its child categories later.
  categories.forEach(cat => {
    map[cat.categoryId] = {
      ...cat,          // Copy all original fields (categoryId, parent, name)
      children: []     // Add an empty children array
    };
  });

  // Build the tree by linking children to their parent nodes
  categories.forEach(cat => {
    if (cat.parent === 'root') {
      // If this category's parent is 'root', add it directly under the root node
      root.children.push(map[cat.categoryId]);
    } else if (map[cat.parent]) {
      // If the parent exists in the map, add this category to the parent's children array
      map[cat.parent].children.push(map[cat.categoryId]);
    } else {
      // If the parent is missing or invalid, skip this node (optional: handle as error)
      console.warn(`Warning: Parent '${cat.parent}' not found for category '${cat.categoryId}'`);
    }
  });


  return root;
}

// test runner 

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const testData = [
    { categoryId: "category1", parent: "root", name: "Category One" },
    { categoryId: "category1-1", parent: "category1", name: "Subcategory One" },
    { categoryId: "category2", parent: "root", name: "Category Two" },
    { categoryId: "category2-1", parent: "category2", name: "Subcategory Two" },
    { categoryId: "category1-1-1", parent: "category1-1", name: "Nested Subcategory" }
  ];

  const tree = buildCategoryTree(testData);
  console.dir(tree, { depth: null });
}

export { buildCategoryTree };
