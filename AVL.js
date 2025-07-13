/*
Related LeetCode Problems:
1382  Balance a Binary Search Tree: 
701   Insert into a Binary Search Tree: 
450   Delete Node in a BST: 
110   Balanced Binary Tree: 

These problems focus on inserting, deleting, and balancing binary search trees, and are conceptually related to AVL tree operations.

Problem Description: AVL Tree Implementation in JavaScript

Objective:
Implement an AVL Tree class that represents a self-balancing Binary Search Tree (BST).

Requirements:
- The difference between the heights of left and right subtrees for any node should not exceed 1.
- The tree must rebalance itself after every insertion or deletion using appropriate rotations.

Features:
- insert(value): Inserts a new node and maintains balance.
- delete(value): Removes a node and rebalances the tree.

Helper Methods:
  _rotateLeft(node): Performs a left rotation.
  _rotateRight(node): Performs a right rotation.
  _getHeight(node): Updates height and balance factor of a node.
  _getBalance(node): Checks balance and applies rotations if necessary.

- Time Complexity: O(log n)  
- Space Complexity: O(1) (excluding recursion stack)
*/




/// Node class represents each node in the AVL Tree
class Node {
    constructor(value) {
        this.value = value;   // The value stored in this node
        this.left = null;     // Pointer to left child
        this.right = null;    // Pointer to right child
        this.height = 1;      // Height of this node (used for balancing)
    }
}

// AVL Tree class
class AVLTree {
    root = null;  // Root of the tree

    // Public method to insert a value into the AVL Tree
    insert(value) {
        this.root = this.#insert(this.root, value);
    }

    // Recursive helper to insert value and balance the subtree
    #insert(node, value) {
        if (!node) return new Node(value);

        if (value < node.value) {
            node.left = this.#insert(node.left, value);
        } else if (value > node.value) {
            node.right = this.#insert(node.right, value);
        } else {
            return node; // Duplicate values not allowed
        }

        this._getHeight(node);         // Step 1: Update height and balance
        return this._getBalance(node); // Step 2: Rebalance if needed
    }

    // Public method to delete a value from the AVL Tree
    delete(value) {
        this.root = this.#deleteNode(this.root, value);
    }

    // Recursive helper to delete a node and balance the tree
    #deleteNode(node, value) {
        if (!node) return null;

        if (value < node.value) {
            node.left = this.#deleteNode(node.left, value);
        } else if (value > node.value) {
            node.right = this.#deleteNode(node.right, value);
        } else {
            // Node to delete found

            // Case 1: No children
            if (!node.left && !node.right) return null;

            // Case 2: One child
            if (!node.left) return node.right;
            if (!node.right) return node.left;

            // Case 3: Two children – find the in-order successor
            let successor = node.right;
            while (successor.left) {
                successor = successor.left;
            }

            // Replace current node value with successor’s value
            node.value = successor.value;

            // Delete the successor node
            node.right = this.#deleteNode(node.right, successor.value);
        }

        this._getHeight(node);         // Step 1: Update height and balance
        return this._getBalance(node); // Step 2: Rebalance if needed
    }

    // Right rotation for Left-Left case
    _rotateRight(y) {
        const x = y.left;
        const T2 = x.right;

        x.right = y;
        y.left = T2;

        this._getHeight(y); // Update heights
        this._getHeight(x);

        return x;
    }

    // Left rotation for Right-Right case
    _rotateLeft(x) {
        const y = x.right;
        const T2 = y.left;

        y.left = x;
        x.right = T2;

        this._getHeight(x); // Update heights
        this._getHeight(y);

        return y;
    }

    // Updates height and balance factor of a node
    _getHeight(node) {
        const leftHeight = node.left ? node.left.height : 0;
        const rightHeight = node.right ? node.right.height : 0;

        node.height = 1 + Math.max(leftHeight, rightHeight);
        node.balance = leftHeight - rightHeight;
    }

    // Rebalances the node if needed based on balance factor
    _getBalance(node) {
        // Case: Left-heavy
        if (node.balance > 1) {
            // Left-Right case
            if (node.left && node.left.balance < 0) {
                node.left = this._rotateLeft(node.left);
            }
            return this._rotateRight(node);
        }

        // Case: Right-heavy
        if (node.balance < -1) {
            // Right-Left case
            if (node.right && node.right.balance > 0) {
                node.right = this._rotateRight(node.right);
            }
            return this._rotateLeft(node);
        }

        return node; // Already balanced
    }

    // NEW: Returns an array of node values using level-order traversal (BFS)
    levelOrderArray() {
        const result = [];
        const queue = [];

        if (this.root) queue.push(this.root);

        while (queue.length > 0) {
            const node = queue.shift();
            result.push(node.value); // Visit current node

            // Enqueue left and right children
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        return result;
    }
}


let tree = new AVLTree();
tree.insert(30);
tree.insert(10);
tree.insert(50);
tree.insert(40);
tree.insert(60);
tree.insert(45);

console.log(tree.levelOrderArray()); // Output: [40, 30, 50, 10, 45, 60]

tree.delete(10);
console.log(tree.levelOrderArray());  // Output: [40, 30, 50, 45, 60]

tree.delete(50);
console.log(tree.levelOrderArray());  // Output: [40, 30, 60, 45]

