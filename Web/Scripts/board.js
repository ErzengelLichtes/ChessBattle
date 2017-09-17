﻿function Board(width, height) {
    this.width   = width;
    this.height  = height;
    this.rows    = [];
    this.squares = [];
    this.table = document.createElement("table");
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
            var cell = document.createElement("td");
            cell.index_x = x;
            cell.index_y = y;

            

            
            row.appendChild(cell);
            row.squares.push(cell);
            this.squares.push(cell);
        }
    }
}


$(document).ready(function () {
    var testBoard = new Board(8, 8);
    document.body.appendChild(testBoard.table);
});