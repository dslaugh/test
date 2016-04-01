var emptytilePosRow = 1;
var emptytilePosCol = 2;
var cellDisplacement = '69px';

$('.start .cell').on('click', moveTile);

function moveTile() {
	var $this = $(this);
	var $empty = $('#empty');
	var pos = $this.attr('data-pos').split(',');
	var posRow = parseInt(pos[0], 10);
	var posCol = parseInt(pos[1], 10);

	// Move up
	if (posRow + 1 === emptytilePosRow && posCol === emptytilePosCol) {
		$this.animate({'top' : '+=' + cellDisplacement});

		$empty.animate({'top': '-=' + cellDisplacement});

		emptytilePosRow -= 1;

		$this.attr('data-pos', (posRow + 1) + ',' + posCol);
	}

	if (posRow - 1 === emptytilePosRow && posCol === emptytilePosCol) {
		$this.animate({'top': '-=' + cellDisplacement});

		$empty.animate({'top': '+=' + cellDisplacement});

		emptytilePosRow += 1;

		$this.attr('data-pos', (posRow - 1) + ',' + posCol);
	}

	if (posRow === emptytilePosRow && posCol + 1 === emptytilePosCol) {
		$this.animate({'right': '-=' + cellDisplacement});

		$empty.animate({'right': '+=' + cellDisplacement});

		emptytilePosCol -= 1;

		$this.attr('data-pos', posRow + ',' + (posCol + 1));
	}

	if (posRow === emptytilePosRow && posCol - 1 === emptytilePosCol) {
		$this.animate({'right': '+=' + cellDisplacement});

		$empty.animate({'right': '-=' + cellDisplacement});

		emptytilePosCol += 1;

		$this.attr('data-pos', posRow + ',' + (posCol - 1));
	}
}


function Node(value, state, emptyRow, emptyCol, depth) {
	this.value = value;
	this.state = state;
	this.emptyRow = emptyRow;
	this.emptyCol = emptyCol;
	this.depth = depth;
	this.strRepresentation = '';
	this.path = '';

	for (var i = 0; i < state.length; i++) {
		if (state[i].length != state.length) {
			alert('Number of rows differs from number of columns');
			return false;
		}
		for (var j = 0; j < state[i].length; j++) {
			this.strRepresentation += state[i][j] + ',';
		}
	}

	this.size = this.state.length;
}

var MyQueue = function() {
	var length = 0;
	var queue = [];
	function add(node) {
		length += 1;
		queue.push(node);
	}
	function shift() {
		length -= 1;
		return queue.shift();
	}
	function getLength() {
		return length;
	}
	function setLength(len) {
		length = len;
	}
	function getQueue() {
		return queue;
	}
	function sortAsc() {
// debugger;
		queue.sort(function(a, b) {
			if (a.value < b.value) {
				return -1;
			} else if (a.value > b.value) {
				return 1;
			} else {
				return 0;
			}
		});
	}
	return {
		add: add,
		shift: shift,
		getLength: getLength,
		setLength: setLength,
		getQueue: getQueue,
		queue: queue,
		length: length
	};
}


function AStar(initial, goal, empty) {
	this.initial = initial;
	this.goal = goal;
	this.empty = empty;
	this.queue = MyQueue();
	this.queue.add(initial);
	this.visited = [];
}

AStar.prototype.execute = function() {
// debugger;
	this.visited.push(this.initial.strRepresentation);

	while (this.queue.getLength() > 0) {
		var current = this.queue.shift();

		if (current.strRepresentation === this.goal.strRepresentation) {
			return current;
		}

console.log(this.queue);
// debugger;
		this.expandNode(current);
// debugger;
	}
};

AStar.prototype.expandNode = function(node) {
// debugger;
	var temp = '';
	var newState = '';
	var col = node.emptyCol;
	var row = node.emptyRow;
	var newNode = '';

	// Up
	if (row > 0) {
		newState = cloneState(node.state);
		temp = newState[row - 1][col];
		newState[row - 1][col] = this.empty;
		newState[row][col] = temp;
		newNode = new Node(0, newState, row - 1, col, node.depth + 1);

		if (!this.alreadyVisited(newNode.strRepresentation)) {
			newNode.value = newNode.depth + this.heuristic(newNode);
			newNode.path = node.path + 'U';
			this.queue.add(newNode);
			if (this.queue.length > 0) {
				this.queue.sortAsc();
			}
			this.visited.push(newNode.strRepresentation);
		}
	}

	// Down
	if (row < node.size - 1) {
		newState = cloneState(node.state);
		temp = newState[row + 1][col];
		newState[row + 1][col] = this.empty;
		newState[row][col] = temp;
		newNode = new Node(0, newState, row + 1, col, node.depth + 1);

		if (!this.alreadyVisited(newNode.strRepresentation)) {
			newNode.value = newNode.depth + this.heuristic(newNode);
			newNode.path = node.path + 'D';
			this.queue.add(newNode);
			if (this.queue.length > 0) {
				this.queue.sortAsc();
			}
			this.visited.push(newNode.strRepresentation);
		}
	}

	// Left
	if (col > 0) {
		newState = cloneState(node.state);
		temp = newState[row][col - 1];
		newState[row][col - 1] = this.empty;
		newState[row][col] = temp;
		newNode = new Node(0, newState, row, col - 1, node.depth + 1);

		if (!this.alreadyVisited(newNode.strRepresentation)) {
			newNode.value = newNode.depth + this.heuristic(newNode);
			newNode.path = node.path + 'L';
			this.queue.add(newNode);
			if (this.queue.length > 0) {
				this.queue.sortAsc();
			}
			this.visited.push(newNode.strRepresentation);
		}
	}

	// Right
	if (col < node.size - 1) {
		newState = cloneState(node.state);
		temp = newState[row][col + 1];
		newState[row][col + 1] = this.empty;
		newState[row][col] = temp;
		newNode = new Node(0, newState, row, col + 1, node.depth + 1);

		if (!this.alreadyVisited(newNode.strRepresentation)) {
			newNode.value = newNode.depth + this.heuristic(newNode);
			newNode.path = node.path + 'R';
			this.queue.add(newNode);
			if (this.queue.length > 0) {
				this.queue.sortAsc();
			}
			this.visited.push(newNode.strRepresentation);
		}
	}
};

AStar.prototype.alreadyVisited = function(strRepresentation) {
	return this.visited.some(function(visitedStr) {
		return visitedStr === strRepresentation;
	});
};

AStar.prototype.heuristic = function(node) {
	return this.manhattanDistance(node) + this.manhattanDistance(node);
};

AStar.prototype.misplacedTiles = function(node) {
	var result = 0;
	var i = 0;
	var len = node.state.length;
	for (; i<len; i++) {
		var j = 0;
		var jlen = node.state[i].length;
		for (; j<jlen; j++) {
			if (node.state[i][j] != this.goal.state[i][j] && node.state[i][j] != this.empty) {
				result += 1;
			}
		}
	}
	return result;
};

AStar.prototype.manhattanDistance = function(node) {
	var result = 0;

	for(var i = 0; i < node.state.length; i++) {
		for(var j = 0; j < node.state[i].length; j++) {
			var elem = node.state[i][j];
			var found = false;
			for(var h = 0; h < this.goal.state.length; h++) {
				for(var k = 0; k < this.goal.state[h].length; k++) {
					if (this.goal.state[h][k] == elem) {
						result += Math.abs(h - i) + Math.abs(j - k);
						found = true;
						break;
					}
					if (found) {
						break;
					}
				}
			}
		}
	}
	return result;
};

function cloneState(state) {
	var clone = [];
	state.forEach(function(col, i) {
		clone[i] = [];
		col.forEach(function(row, j) {
			clone[i][j] = state[i][j];
		});
	});
	return clone;
}

function start() {
	var init = new Node(0, [[6,4,7],[8,5,0],[3,2,1]], 1, 2, 0);
	var goal = new Node(0, [[1,2,3],[4,5,6],[7,8,0]], 2, 2, 0);

	var astar = new AStar(init, goal, 0);

	var result = astar.execute();

debugger;
}