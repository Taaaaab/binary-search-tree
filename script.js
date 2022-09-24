// Build a Node class / factory
class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

// Build a Tree class / factory which accepts an array
class Tree {

    constructor() {
        this.root = null;
    }

    insert(data) {
        const newNode = new Node(data);

        if (this.root === null)
            this.root = newNode;
        else
            this.insertNode(this.root, newNode);
    }

    insertNode(node, newNode) {
        if (newNode.data < node.data) {
            if(node.left === null)
            node.left = newNode;
            else 
            this.insertNode(node.left, newNode);
        }
    
        else {
            if(node.right === null)
            node.right = newNode;
            else
            this.insertNode(node.right, newNode);
        }
    }
    
    remove(data) {
        this.root = this.removeNode(this.root, data);
    }

    removeNode(node, key) {
        if(node === null)
        return null;

        else if(key < node.data) {
            node.left = this.removeNode(node.left, key);
            return node;
        }

        else if (key > node.data) {
            node.right = this.removeNode(node.right, key);
            return node;
        }

        else {
            if(node.left === null && node.right === null) {
                node = null;
                return node;
            }

            if(node.left === null) {
                node = node.right;
                return node;
            }

            else if(node.right === null) {
                node = node.left;
                return node;
            }

            let aux = this.findMinNode(node.right);
            node.data = aux.data;

            node.right = this.removeNode(node.right, aux.data);
            return node;
        }
    }

    levelOrder(root) {
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

// Left, Root, Right
    inOrder(node) {
        if (node !== null) {
            this.inOrder(node.left);
            console.log(node.data);
            this.inOrder(node.right);
        }
    }
    
// Root, Left, Right
    preOrder(node) {
        if(node !== null) {
            console.log(node.data);
            this.preOrder(node.left);
            this.preOrder(node.right);
        }
    }

// Left, Right, Root
    postOrder(node) {
        if(node != null) {
            this.postOrder(node.left);
            this.postOrder(node.right);
            console.log(node.data);
        }
    }

    findMinNode(node) {
        if(node.left === null) 
            return node;
        else
            return this.findMinNode(node.left);
    }

    getRootNode() {
        return this.root;
    }

    search(node, data) {
        if (node === null) 
            return null;

        else if (data < node.data)
            return this.search(node.left, data);

        else if (data > node.data)
            return this.search(node.right, data);

        else 
            return node;
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
};

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

// const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

// let sortedArr = mergeSort(array);
// const n = sortedArr.length;
// root = buildTree(sortedArr, 0, n - 1);
// prettyPrint(root);

// console.log(find(root, 8));
// prettyPrint(root);
// console.log(levelOrder(root));

let BST = new Tree();
BST.insert(15);
BST.insert(25);
BST.insert(10);
BST.insert(7);
BST.insert(22);
BST.insert(17);
BST.insert(13);
BST.insert(5);
BST.insert(9);
BST.insert(27);
root = BST.getRootNode();
prettyPrint(root);
BST.inOrder(root);
BST.remove(5);
root = BST.getRootNode();
BST.inOrder(root);
BST.remove(7);
BST.remove(15);
root = BST.getRootNode();
prettyPrint(root);
BST.postOrder(root);
BST.preOrder(root);