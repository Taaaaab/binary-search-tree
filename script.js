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
    constructor(root) {
        this.root = root;
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
    
        // split in half
        const m = Math.floor(arr.length / 2);
        const leftArr = arr.slice(0, m);
        const rightArr = arr.slice(m);
        
        // merge sorted sub-arrays
        return merge(
            mergeSort(leftArr),
            mergeSort(rightArr)
        );
    };

    let sortedArr = mergeSort(array);
    
    const mid = parseInt((start + end) / 2);
    const node = new Node(sortedArr[mid]);

    node.left = buildTree(sortedArr, start, mid - 1);
    node.right = buildTree(sortedArr, mid + 1, end);
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

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const n = array.length;
root = buildTree(array, 0, n - 1);
prettyPrint(root);
