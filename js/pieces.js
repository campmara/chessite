// ------------------------ piece logic

function Piece(id) {
	this.raster = new Raster(id);
	this.point = new Point(0, 0);
	this.velocity = 0;
	this.reset();
}

Piece.prototype = {
	update: function() {
		this.point = new Point(this.point.x, this.point.y + this.velocity);
		this.raster.position = this.point;

		this.checkForReset();
	},

	checkForReset: function() {
		if (this.point.y >= view.size.height + 100) {
			this.reset();
		}
	},

	reset: function() {
		var p = Point.random() * view.size;
		p.y = -500 - (Math.random() * 1000);
		this.point = p;
		this.raster.position = this.point;

		var v = 4 + Math.random() * 2;
		this.velocity = v;
	}
};


// ------------------------ main

var pieceIDs = ['pawn', 'rook', 'knight', 'bishop', 'queen', 'king'];
var pieceArray = [];
var numPieces = 6;
for (var i = 0; i < numPieces; i++) {
	pieceArray.push(new Piece(pieceIDs[i]));
	pieceArray[i].raster.scale(0.05 + (Math.random() * 0.1));
}

// ------------------ event handlers

function onFrame(event) {
	// Falling Pieces
	for (var i = 0; i < pieceArray.length; i++) {
		pieceArray[i].update();
	}
}

function onResize(event) {
	board.position = view.center + new Point(0, 0);
	appstore.position = view.center + new Point(0, 200);
}
