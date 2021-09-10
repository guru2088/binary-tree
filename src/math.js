const express = require('express')
const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.json());

const port = process.env.PORT || 8003;

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))

app.get('/calculate',function(req,res){
  if(req.body && req.body.value){
    var result =  evaluate(infixToBinaryTree(req.body.value.replace(/ /g,'')))
    if(result){
      res.send({
          status: true,
          status_code: 200,
          message: 'Calculation Successfull',
          data: result
      });
    }
    else{
      res.send({
          status: true,
          status_code: 500,
          message: 'Calculation UnSuccessfull',
      });
    }
  }
})

function Stack() {
	this.stack = new Array();
}

Stack.prototype = {
	isEmpty: function() {
		return this.stack.length == 0;
	},

	pop: function() {
		return this.stack.pop();
	},

  plain: function() {
		return this.stack;
	},

	peek: function() {
		return this.stack[this.stack.length - 1];
	},

	push: function(o) {
		this.stack.push(o);
	},

	size: function() {
		return this.stack.length;
	}
}

function BinaryTreeNode(d) {
	this.data = d;
	this.left = null;
	this.right = null;
}

function Operator(t){
	this.sign = t;
	return this;
}

Operator.prototype = {
	lessOrEqualInPrecedenceTo:function(o) {
		return this.value <= o?.value;
	}
}

var createOperator = function(t) {
	switch (t) {
		case '+': return new Plus(t);
		case '-': return new Minus(t);
		case '/': return new Divide(t);
		case '*': return new Multiply(t);
		default: return "null";
	}
}

function Plus(t) {
	Operator.call(this, t);
	this.value = 0;
	this.applyFunction = function(arg1,arg2) {
		return arg1 + arg2;
	}
}

Plus.prototype = Object.create(Operator.prototype);

function Minus(t) {
	Operator.call(this, t);
	this.value = 0;
	this.applyFunction = function(arg1,arg2) {
		return arg1 - arg2;
	}
}

Minus.prototype = Object.create(Operator.prototype);

function Divide(t) {
	Operator.call(this, t);
	this.value = 1;
	this.applyFunction = function(arg1,arg2) {
		return arg1 / arg2;
	}
}

Divide.prototype = Object.create(Operator.prototype);

function Multiply(t) {
	Operator.call(this, t);
	this.value = 1;
	this.applyFunction = function(arg1,arg2) {
		return arg1 * arg2;
	}
}

Multiply.prototype = Object.create(Operator.prototype);

var infixToBinaryTree = function(input) {
	if (input.length == 0) return null;
	if (input.length == 1) return input[0];

	var head = null,
		outputStack = new Stack(),
		operatorStack = new Stack();

	var updateTree = function() {
		var operator = operatorStack.pop(),
			output = outputStack.pop();
		if (head == null) {
			head = new BinaryTreeNode(operator);
			left = outputStack.pop();
			head.left = left instanceof BinaryTreeNode ? left : new BinaryTreeNode(left);
			head.right = output instanceof BinaryTreeNode ? output : new BinaryTreeNode(output);
		} else {
			var subtree = head;
			head = new BinaryTreeNode(operator);
			head.left = output instanceof BinaryTreeNode ? output : new BinaryTreeNode(output);
			head.right = subtree;
		}
	}

	var createSubtree = function createSubtree(operator, tree) {
		if (tree == null) {
			var right = outputStack.pop(),
				left = outputStack.pop();
			tree = new BinaryTreeNode(operator);
			tree.right = right instanceof BinaryTreeNode ? right : new BinaryTreeNode(right);
			tree.left = left instanceof BinaryTreeNode ? left : new BinaryTreeNode(left);
		} else {
			var subtree = tree,
				left = outputStack.pop();
			tree = new BinaryTreeNode(operator);
			tree.right = subtree;
			tree.left = left instanceof BinaryTreeNode ? left : new BinaryTreeNode(left);
		}

		if (!operatorStack.isEmpty() && operator?.lessOrEqualInPrecedenceTo(operatorStack.peek())) {
			return createSubtree(operatorStack.pop(), tree);
		} else {
			return tree;
		}
	}

	for (var s = 0; s < input.length; ) {
		var token;
		if (isNaN(input[s])) {
			token = input[s];
			s+=1;
		} else {
			var i = s + 1;
			while(i < input.length && !isNaN(input[i])) {
				i+=1;
			}


      // This is the error occuring place of two operators come at same time with out ( or ).
      // Below code for handling that exception but it needs to be fine tuned

      // if(input.substring(s - 1,i - 1) === "-"){
      //   negativetoken = input.substring(s - 1,i - 1) + input.substring(s,i);
      // }
      // else{
      //   token = input.substring(s,i);
      // }

      token = input.substring(s,i);

			s = i;
		}

		if (token == '(') {
			operatorStack.push(token);
		} else if (token == ')') {
			while(operatorStack.peek() != '(') {
				var subtree = createSubtree(operatorStack.pop(), null);
				outputStack.push(subtree);
			}
			operatorStack.pop();
		} else if (isNaN(token)) {
			var operator = createOperator(token);

      // Here also in operatorStack.pop() we need to fix the issue if two operators come at same time

      if (!operatorStack.isEmpty() && operator?.lessOrEqualInPrecedenceTo(operatorStack.peek())) {
        var subtree = createSubtree(operatorStack.pop(), null);
        outputStack.push(subtree);
      }
      operatorStack.push(operator);

      negativetoken = 0;


		} else {
			outputStack.push(parseInt(token));
		}
	}

	while (!operatorStack.isEmpty()) {
		updateTree();
	}

	if (head == null && outputStack.size() == 1 && outputStack.peek() instanceof BinaryTreeNode) {
		head = outputStack.pop();
	}

	return head;
}

var evaluate = function(node) {
	var token = node.data;
	if (token instanceof Operator) {
		return token.applyFunction(evaluate(node.left), evaluate(node.right));
	} else {
		return token;
	}
}

//Sample function for Test case
exports.addition = function(a,b) {
  if(a > 0 && b > 0){
    return a + b;
  }
  else{
    return 0;
  }
};


exports.createOperator = createOperator;
