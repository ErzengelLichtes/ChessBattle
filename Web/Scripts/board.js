function Board(width, height) {
    this.width   = width;
    this.height  = height;
    this.rows    = [];
    this.squares = [];

    this.table = document.createElement("table");
    this.table.obj = this;
    $(this.table).addClass("board");
    this.table.tbody = document.createElement("tbody");
    this.table.appendChild(this.table.tbody);

    var y = 0;
    for (; y < height; ++y) {
        var row = document.createElement("tr");
        row.squares = [];
        this.rows.push(row);
        this.table.tbody.appendChild(row);
        var x = 0;
        for (; x < width; ++x) {
            var cell = new Cell(x, y);

            row.appendChild(cell.cell);
            row.squares.push(cell);
            this.squares.push(cell);
        }
    }
}

function Cell(x, y) {
    this.x = x;
    this.y = y;
    this.cell = document.createElement("td");
    this.cell.obj = this;
}

function Piece(settings) {
    this.cost    = settings.cost    || 1;
    this.move    = settings.move    || 1;
    this.range   = settings.range   || 1;
    this.maximum = settings.maximum || 1;
    this.powers = [];
    if (Array.isArray(settings.powers)) {
        var powers = this.powers;
        settings.powers.forEach(function (power) {
            powers.push(window.powers[power]);
        });
    }
}


$(document).ready(function () {
    var testBoard = new Board(8, 8);
    document.body.appendChild(testBoard.table);
});