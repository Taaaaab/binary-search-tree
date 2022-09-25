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
                subArr.push(node.data);
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
        if(node == null)
            return;
        console.log(node.data);
        this.preOrder(node.left);
        this.preOrder(node.right);
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

    find(node, data) {
        if (node === null) 
            return null;

        else if (data < node.data)
            return this.find(node.left, data);

        else if (data > node.data)
            return this.find(node.right, data);

        else 
            return node;
    }

    height(root) {
        let depth = 0;
        let q = [];

        q.push(root)
        q.push(null)
        while(q.length > 0) {
            let temp = q.shift()

            if (temp == null)
                depth += 1;
            if (temp != null) {
                if (temp.left)
                    q.push(temp.left)

                if (temp.right)
                    q.push(temp.right)
            }

            else if (q.length > 0)
                q.push(null)
        }
        return depth
    }

    depth(node) {
        if (node == null)
            return -1;
        else {
            let lDepth = this.depth(node.left);
            let rDepth = this.depth(node.right);

            if (lDepth > rDepth)
                return (lDepth + 1);
            else
                return (rDepth + 1);
        }
    }

    isBalanced(root) {
        if (root == null) {
            return 0
        }
        let leftSubtreeHeight = this.isBalanced(root.left);
        if (leftSubtreeHeight == -1) {
            return -1;
        }
        let rightSubtreeHeight = this.isBalanced(root.right);
        if (rightSubtreeHeight == -1) {
            return -1;
        }
        if (Math.abs(leftSubtreeHeight - rightSubtreeHeight) > 1) {
            return -1;
        }
        return (Math.max(leftSubtreeHeight, rightSubtreeHeight) + 1);
    }

    traverse(root, array) {
        if (array !== undefined) array.push(root.data);
        if (root.leftPart !== null) {
          this.traverse(root.leftPart, array);
        }
    
        if (root.rightPart !== null) {
          this.traverse(root.rightPart, array);
        }
        return array;
      }

    reBalance(root) {
        if (this.isBalanced(this.root)) return this.root; 

        let rebalancedNewTreeArray = [];
        rebalancedNewTreeArray = this.traverse(this.root, rebalancedNewTreeArray);
    
        let balancedTree = buildTree(rebalancedNewTreeArray);
    
        return balancedTree.root;
    }
    
}

let root = null;

// Write a buildTree function which takes an array 
// of data and turns it into a balanced binary tree 
// full of Node objects appropriately placed

function buildTreeUtil(array, start, end) {

    if (start > end) {
        return null;
    }

    const mid = parseInt((start + end) / 2, 10);
    const node = array[mid];

    node.left = buildTreeUtil(array, start, mid - 1);
    node.right = buildTreeUtil(array, mid + 1, end);
    
    return node;
};

function buildTree(root) {
    let nodes = [];
    storeBSTNodes(root, nodes);

    let n = nodes.length;
    return buildTreeUtil(nodes, 0, n - 1);
}

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

function storeBSTNodes(root, nodes) {
    if (root == null)
    return;

    storeBSTNodes(root.left, nodes);
    nodes.push(root);
    storeBSTNodes(root.right, nodes);
}

function treeTest(array) {
    let sortedArr = mergeSort(array);
    let BST = new Tree();
    for (let i = 0; i < sortedArr.length; i++) {
        BST.insert(sortedArr[i]);
    }
    
    root = BST.getRootNode();
    root = buildTree(root);
    console.log(BST.isBalanced(root));
    BST.inOrder(root);
    BST.preOrder(root);
    BST.postOrder(root);

    BST.insert(101);
    BST.insert(200);
    BST.insert(222);
    console.log(BST.isBalanced(root));

    BST.reBalance();
    console.log(BST.isBalanced(root));
    console.log(BST.levelOrder(root));
    BST.preOrder(root);
    BST.postOrder(root);
    BST.inOrder(root);
    prettyPrint(root);
}
const myArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

treeTest(myArray);

// let BST = new Tree();
// BST.insert(15);
// BST.insert(25);
// BST.insert(10);
// BST.insert(7);
// BST.insert(22);
// BST.insert(17);
// BST.insert(13);
// BST.insert(5);
// BST.insert(9);
// BST.insert(27);
// root = BST.getRootNode();
// prettyPrint(root);
// BST.inOrder(root);
// BST.remove(5);
// root = BST.getRootNode();
// BST.inOrder(root);
// BST.remove(7);
// BST.remove(15);
// root = BST.getRootNode();
// prettyPrint(root);
// BST.postOrder(root);
// BST.preOrder(root);
// console.log(BST.find(root, 25));
// console.log(BST.levelOrder(root));
// console.log(BST.height(root));
// console.log(BST.depth(root));
// console.log(BST.isBalanced(root));

// root = new Node(10);
// root.left = new Node(8);
// root.left.left = new Node(7);
// root.left.left.left = new Node(6);
// root.left.left.left.left = new Node(5);

// root = buildTree(root);
// prettyPrint(root);
