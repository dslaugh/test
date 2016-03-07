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