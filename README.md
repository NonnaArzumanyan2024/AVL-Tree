# AVL Tree Implementation in JavaScript

This repository contain an implementation of an AVL Tree — a self-balancing Binary Search Tree (BST) — using JavaScript.

## Problem Description

An AVL Tree is a binary search tree that automatically balances itself after each insertion or deletion. It ensures that the height difference (balance factor) between the left and right subtrees of any node does not exceed 1. This guarantees `O(log n)` time complexity for insert, delete, and search operations.

## Objective

Implement a JavaScript class `AVLTree` with the following capabilities:

- Insert values into the tree while maintaining balance.
- Delete values from the tree while maintaining balance.
- Traverse the tree in level-order (breadth-first) and return the result as an array.

## Features

- `insert(value)` – Inserts a new node while keeping the tree balanced.
- `delete(value)` – Deletes a node and rebalances the tree as necessary.
- `levelOrderArray()` – Returns the values of the nodes in level-order (BFS).

## Helper Methods

- `_rotateLeft(node)` – Performs a left rotation.
- `_rotateRight(node)` – Performs a right rotation.
- `_getHeight(node)` – Updates the height and balance factor of a node.
- `_getBalance(node)` – Determines whether a node is unbalanced and applies necessary rotations.

## Time and Space Complexity

- Time Complexity: O(log n) for insert and delete operations.
- Space Complexity: O(1) additional space (excluding the recursion stack).

## Related LeetCode Problems

- [1382. Balance a Binary Search Tree](https://leetcode.com/problems/balance-a-binary-search-tree/)
- [701. Insert into a Binary Search Tree](https://leetcode.com/problems/insert-into-a-binary-search-tree/)
- [450. Delete Node in a BST](https://leetcode.com/problems/delete-node-in-a-bst/)
- [110. Balanced Binary Tree](https://leetcode.com/problems/balanced-binary-tree/)

These problems are closely related to AVL tree operations, focusing on balancing and modifying binary search trees.

## Example Usage

```javascript
let tree = new AVLTree();

tree.insert(30);
tree.insert(10);
tree.insert(50);
tree.insert(40);
tree.insert(60);
tree.insert(45);

console.log(tree.levelOrderArray());
// Output: [40, 30, 50, 10, 45, 60]

tree.delete(10);
console.log(tree.levelOrderArray());
// Output: [40, 30, 50, 45, 60]

tree.delete(50);
console.log(tree.levelOrderArray());
// Output: [40, 30, 60, 45]
