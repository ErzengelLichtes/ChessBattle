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
    var me = this;
    this.resetClassRange = function(className) {
        $(me.table).find("td").removeClass(className);
    }

}

function Cell(x, y) {
    this.x = x;
    this.y = y;
    this.cell = document.createElement("td");
    this.cell.obj = this;
}

function CheckSquaresAroundPosition(startingSquare, straightCost, diagonalCost, validSquares, board) {
    var position =
    {
        x: startingSquare.x,
        y: startingSquare.y
    };
    var x, y;
    for (y = -1; y <= 1; ++y) {
        var finalY = position.y + y;
        if (finalY < 0 || finalY >= board.rows.count) continue;
        var row = board.rows[finalY];
        for (x = -1; x <= 1; ++x) {
            if (x === 0 && y === 0) continue;

            var finalX = position.x + x;
            if (finalX < 0 || finalX >= row.squares.count) continue;
            var square = row.squares[finalX];

            var distance = (x === 0 || y === 0
                         ? straightCost
                         : diagonalCost)
                         + startingSquare.distance;

            var existingValidSquare = validSquares.find(function (check) {
                // ReSharper disable ClosureOnModifiedVariable
                return check.x === finalX && check.y === finalY;
                // ReSharper restore ClosureOnModifiedVariable
            });
            if (existingValidSquare == null) {
                existingValidSquare = {
                    square: square,
                    distance: Number.MAX_VALUE,
                    x: finalX,
                    y: finalY,
                }
                validSquares.push(existingValidSquare);
            }
            if (existingValidSquare.distance > distance) {
                existingValidSquare.distance = distance;
                existingValidSquare.start = startingSquare;
            }
        }
    }
}
function GetSquaresInOrder(squareArray) {
    var orderedSquares = {};
    var minX = Number.MAX_VALUE,
        maxX = Number.MIN_VALUE,
        minY = Number.MAX_VALUE,
        maxY = Number.MIN_VALUE;
    squareArray.forEach(function (squareInfo) {
        var x = squareInfo.x;
        var y = squareInfo.y;
        maxX = Math.max(maxX, x);
        minX = Math.min(minX, x);
        maxY = Math.max(maxY, y);
        minY = Math.min(minY, y);

        if (orderedSquares[y] == null) {
            orderedSquares[y] = {};
        }
        orderedSquares[y][x] = squareInfo.square;
    });
    return {
        ordered: orderedSquares,
        minX: minX,
        maxX: maxX,
        minY: minY,
        maxY: maxY,
    };
}
function ApplyFirstLastToSquares(squareArray) {
    var squares = GetSquaresInOrder(squareArray);
    var x, y;
    for (y = squares.minY; y <= squares.maxY; ++y) {
        for (x = squares.minX; x <= squares.maxX; ++x) {
            var square = squares.ordered[y][x];
            if (square == null) continue;
            var cell = $(square.cell);
            if (squares.ordered[y - 1] == null || squares.ordered[y - 1][x] == null) {
                cell.addClass("firstY");
            }
            if (squares.ordered[y + 1] == null || squares.ordered[y + 1][x] == null) {
                cell.addClass("lastY");
            }
            if (squares.ordered[y][x - 1] == null) {
                cell.addClass("firstX");
            }
            if (squares.ordered[y][x + 1] == null) {
                cell.addClass("lastX");
            }
        }
    }
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
    

    var me = this;
    this.setPosition = function(x, y) {
        me.position = { x: x, y: y };
        me.movementSquares = [];
        var startingSquare =
        {
            square: me.board.rows[me.position.y].squares[me.position.x],
            distance: 0,
            x: me.position.x,
            y: me.position.y,
        };
        me.movementSquares.push(startingSquare);

        CheckSquaresAroundPosition(startingSquare, 1, 1, me.movementSquares, me.board);
        var itSquare;
        for (itSquare = 1; itSquare < me.movementSquares.length; ++itSquare) {
            var square = me.movementSquares[itSquare];
            if (square.distance > me.move) {
                me.movementSquares.splice(itSquare, 1);
                --itSquare;
                continue;
            }
            CheckSquaresAroundPosition(square, 1, 1.5, me.movementSquares, me.board);
        }
    }
    this.clearPosition = function() {
        me.position = null;
    }
    this.applyMovementUi = function() {
        if (me.board == null) return;
        me.board.resetClassRange("moveHighlight");
        me.movementSquares.forEach(function (square) {
            $(square.square.cell).addClass("moveHighlight");
        });
        ApplyFirstLastToSquares(me.movementSquares);
    }
}


$(document).ready(function () {
    var testBoard = new Board(8, 8);
    document.body.appendChild(testBoard.table);
    window.oneP = new Piece({
        cost: 1,
        move: 1,
        range: 1,
        maximum: 1,
        powers: ["support"],
    });
    window.twoP = new Piece({
        cost: 1,
        move: 2,
        range: 1,
        maximum: 1,
        powers: ["support"],
    });
    window.oneP.board = testBoard;
    window.twoP.board = testBoard;
});