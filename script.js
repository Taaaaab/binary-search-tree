// Build a Node class / factory

class Node {
    constructor(item) {
        this.key = item;
        this.left = null;
        this.right = null;
    }
}

// Build a Tree class / factory which accepts an array

class Tree {
    constructor() {
        this.root = null;
    }
}

let root = null;

// Write a buildTree function which takes an array 
// of data and turns it into a balanced binary tree 
// full of Node objects appropriately placed

function buildTree(array, start, end) {

    if (start > end) {
        return null;
    }

    const mid = parseInt((start + end) / 2);
    const node = new Node(array[mid]);

    node.left = buildTree(array, start, mid - 1);
    node.right = buildTree(array, mid + 1, end);
    return node;

};

function insert(key) {
    root = insertRec(root, key);
}

function insertRec(root, key) {
    if (root == null) {
        root = new Node(key);
        return root;
    }

    if (key < root.key)
        root.left = insertRec(root.left, key);
    else if (key > root.key)
        root.right = insertRec(root.right, key);

    return root;
}

    function inOrder() {
        inOrderRec(root);
    }

    function inOrderRec(root) {
        if (root != null) {
            inOrderRec(root.left);
            console.log(root.key + "->");
            inOrderRec(root.right);
        }
    }

function deleteKey(key) {
    root = deleteRec(root, key);
}

function deleteRec(root, key) {
    if (root == null)
    return root;

    if (key < root.key)
    root.left = deleteRec(root.left, key);
    else if (key > root.key)
    root.right = deleteRec(root.right, key);
    
    else {
        if (root.left == null)
        return root.right;
    else if (root.right == null)
        return root.left;
    
    root.key = minValue(root.right);
    root.right = deleteRec(root.right, root.key);
    }
    return root;
}

function minValue(root) {
    let minV = root.key;
    while (root.left != null) {
        minV = root.left.key;
        root = root.left;
    }
    return minV;
}

function find(root, key) {
    if (root == null ||
    root.key == key)
    return root;

    if (root.key < key)
    return find(root.right, key);

    return find(root.left, key);
}

function levelOrder(root) {
    if (!root) return [];
    let result = [];
    let queue = [root];
   
    while (queue.length != 0) {
        let subArr = [];
        const n = queue.length;
        for (let i = 0; i < n; i++) {
            let node = queue.pop();
            subArr.push(node.key);
            if (node.left) queue.unshift(node.left);
            if (node.right) queue.unshift(node.right);
        }
        result.push(subArr);
    }
    return result;
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.key}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

// Merge Sort to sort array before building tree
const merge = (leftArr, rightArr) => {
    const output = [];
    let leftIndex = 0;
    let rightIndex = 0;
    
    while (leftIndex < leftArr.length && rightIndex < rightArr.length) {
        const leftEl = leftArr[leftIndex];
        const rightEl = rightArr[rightIndex];

        if (leftEl < rightEl) {
            output.push(leftEl);
            leftIndex++;
        } else {
            output.push(rightEl);
            rightIndex++;
        }
    }
    return [...output, ...leftArr.slice(leftIndex), ...rightArr.slice(rightIndex)];
};

const mergeSort = arr => {
    if (arr.length < 2) {
        return arr;
    } 

// Remove duplicates from array
    let uniqueArr = arr.filter((c, index) => {
    return arr.indexOf(c) === index;
    });

    // split in half
    const m = Math.floor(uniqueArr.length / 2);
    const leftArr = uniqueArr.slice(0, m);
    const rightArr = uniqueArr.slice(m);
    
    // merge sorted sub-arrays
    return merge(
        mergeSort(leftArr),
        mergeSort(rightArr)
    );
};

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

let sortedArr = mergeSort(array);
const n = sortedArr.length;
root = buildTree(sortedArr, 0, n - 1);
prettyPrint(root);

insert(50);
insert(20);
prettyPrint(root);
console.log(find(root, 8));
deleteKey(20);
prettyPrint(root);
console.log(levelOrder(root));
