// JavaScript Document
$(document).ready(function() {
  var x = "x";
  var o = "o";
  var count = 0;
  var o_win = 0;
  var x_win = 0;
  var size = $("#board-size-input").val();
  $("#turn-text").text('O turn')
  
  const reset = () => {
      $("#turn-text").text('O turn')
      $("#game td").text("+");
      $("#game td").removeClass("disable");
      $("#game td").removeClass("o");
      $("#game td").removeClass("x");
      $("#game td").removeClass("btn-primary");
      $("#game td").removeClass("btn-info");
      count = 0;
  };

  const isOWon = () => {
      var oDiag1 = 0;
      var oDiag2 = 0;
      for (var i = 0; i < size; i++) {
          if (
              $(`.row${i + 1}`).filter(".o").length == size ||
              $(`.col${i + 1}`).filter(".o").length == size
          ) {
              return true;
          } else {
              if (
                  $("td")
                      .filter(`.row${i + 1}.col${i + 1}`)
                      .hasClass(`o`)
              ) {
                  oDiag1++;
              }
              if (
                  $("td")
                      .filter(`.row${i + 1}.col${size - i}`)
                      .hasClass(`o`)
              ) {
                  oDiag2++;
              }
              if (oDiag1 == size || oDiag2 == size) {
                  return true;
              }
          }
      }
      return false;
  };

  const isXWon = () => {
      var xDiag1 = 0;
      var xDiag2 = 0;
      for (var i = 0; i < size; i++) {
          if (
              $(`.row${i + 1}`).filter(".x").length == size ||
              $(`.col${i + 1}`).filter(".x").length == size
          ) {
              return true;
          } else {
              if (
                  $("td")
                      .filter(`.row${i + 1}.col${i + 1}`)
                      .hasClass(`x`)
              ) {
                  xDiag1++;
              }
              if (
                  $("td")
                      .filter(`.row${i + 1}.col${size - i}`)
                      .hasClass(`x`)
              ) {
                  xDiag2++;
              }
              if (xDiag1 == size || xDiag2 == size) {
                  return true;
              }
          }
      }
      return false;
  };

  const click = thisObj => {
      if (isOWon()) {
          alert("O has won the game. Start a new game");
          reset();
      } else if (isXWon()) {
          alert("X wins has won the game. Start a new game");
          reset();
      } else if ($(this).hasClass("disable")) {
          alert("Already selected");
      } else if (count % 2 == 0) {
          $("#turn-text").text('X turn')
          count++;
          thisObj.text(o);
          thisObj.addClass("disable o btn-primary");
          if (isOWon()) {
              alert("O wins");
              count = 0;
              o_win++;
              $("#o_win").text(o_win);
          } else if (count == size * size) {
              alert("Its a tie. It will restart.");
              reset();
          }
      } else {
          $("#turn-text").text('O turn')
          count++;
          thisObj.text(x);
          thisObj.addClass("disable x btn-info");
          if (isXWon()) {
              alert("X wins");
              count = 0;
              x_win++;
              $("#x_win").text(x_win);
          } else if (count == size * size) {
              alert("Its a tie. It will restart.");
              reset();
          }
      }
  };

  const renderTile = () => {
      size = $("#board-size-input").val();
      reset();
      $("#game").empty();
      for (var i = 0; i < size; i++) {
          $("#game").append(
              $(`<tr></tr>`).append(() => {
                  var rowCells = "";
                  for (var j = 0; j < size; j++) {
                      rowCells = rowCells.concat(
                          "",
                          `<td id=${"" + (i * size + j + 1)} class="row${i +
                              1} col${j + 1} btn span1">+</td>`
                      );
                  }
                  return rowCells;
              })
          );
      }
      $("#game td").click(function() {
          click($(this));
      });
  }

  renderTile()

  $("#board-size-input").on("change", function() {
      renderTile()
  });

  $("#game li").click(function() {
      click($(this));
  });

  $("#reset").click(function() {
      reset();
  });
});
