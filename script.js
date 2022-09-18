// Build a Node class / factory

class Node {
    constructor(d) {
        this.data = d;
        this.left = null;
        this.right = null;
    }
}

// Build a Tree class / factory which accepts an array

class Tree {
    constructor(array) {
        this.array = array;
        this.root = buildTree(array, 0, n - 1);
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

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
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
console.log(sortedArr);
const n = sortedArr.length;
root = buildTree(sortedArr, 0, n - 1);
prettyPrint(root);
