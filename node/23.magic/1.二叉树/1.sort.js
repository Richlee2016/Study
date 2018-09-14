/**
 * 左孩子 递减
 * 右孩子 递增
 * 
 * 二叉树排序
 */

 function BinaryTree(){
     var Node = function(key){
         this.key = key;
         this.left = null;
         this.right = null;
     }

     this.root = null;

     function insertNode(node,newNode){
        if(node.key<newNode.key){
            if(node.right === null){
                node.right = newNode;
            }else{
                insertNode(node.right,newNode);
            };
        }else if(node.key>newNode.key){
            if(node.left === null){
                node.left = newNode;
            }else{
                insertNode(node.left,newNode);
            };
        };
     }

     this.insert = function(key){
         var newNode = new Node(key);
         if(!this.root){
            this.root = newNode;
         }else{
             insertNode(this.root,newNode)
         };
     }
 }

 var nodes = [8,3,10,1,6,14,4,7,13];

 var binaryTree = new BinaryTree();
 nodes.forEach(function(key){
    binaryTree.insert(key);
 })

 console.log(binaryTree);


 /**
  * 中序遍历
  * 1.先遍历左子树
  * 2.遍历右子树
  */

  

