//
// This function represents the state of the Gameboard
// each square holds a cell (defined letter) and we expose a dropToken
// method to be able to add cells to squares.

const cellBtns = document.querySelectorAll(".cell");

cellBtns.forEach((btn) => {
  btn.innerText = "";
});

function Gameboard() {
  const squares = 9;
  let board = [];

  var winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8],
  ];

  for (let i = 0; i < squares; i++) {
    board.push(Cell());
  }

  const placeToken = (index, player) => {
    var targetCell = board[index];
    if (targetCell.getValue() === 0) {
      targetCell.addToken(player);
    } else {
      console.log("Oops! That cell is taken, pick another one.");
    }
  };

  const getBoard = () => {
    return board;
  };

  const printBoard = () => {
    for (let i = 0; i < squares; i++) {
      console.log(board[i].getValue());
    }
  };

  return { getBoard, placeToken, printBoard, winCombinations };
}

function Cell() {
  let value = 0;

  const addToken = (player) => {
    value = player;
  };

  const getValue = () => value;

  return { addToken, getValue };
}

function GameController(playerOneName = "p1", playerTwoName = "p2") {
  const board = Gameboard();

  const players = [
    {
      name: playerOneName,
      token: "X",
    },
    {
      name: playerTwoName,
      token: "O",
    },
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    console.log(`${getActivePlayer().name}'s turn.'`);
  };

  const playRound = (index) => {
    console.log(`${getActivePlayer().name}'s token into square ${index},,,`);
    board.placeToken(index, getActivePlayer().token);
    const winner = checkWinner(board, players);
    console.log(winner);
    if (winner) {
      console.log(`${winner.name} IS THE WINNER!`);
    }
    switchPlayerTurn();
    printNewRound();
  };

  const checkWinner = (board, players) => {
    // Check if all items in row are of the same token value.
    // rows
    var xList = [];
    var oList = [];
    console.log(players[0]);
    var boardList = board.getBoard();
    for (var i = 0; i < boardList.length; i++) {
      var squareItem = boardList[i];
      if (squareItem.getValue() === "X") {
        xList.indexOf(i) === -1 ? xList.push(i) : console.log(".");
      } else if (squareItem.getValue() == "O") {
        oList.indexOf(i) === -1 ? oList.push(i) : console.log(",");
      }
    }
    var xWin = false;
    var oWin = false;
    var winCombinations = board.winCombinations;

    if (xList.length >= 3) {
      winCombinations.forEach((list) => {
        if (xWin === false) {
          xWin = xList.every((item) => list.includes(item));
        }
      });
    }
    if (oList.length >= 3) {
      winCombinations.forEach((list) => {
        if (oWin === false) {
          oWin = oList.every((item) => list.includes(item));
        }
      });
    }
    if (xWin) {
      players.forEach((player) => {
        console.log(player.name);
        console.log("@");
        if (player.token == "X") {
          return player;
        }
      });
    } else if (oWin) {
      players.forEach((player) => {
        if (player.token == "O") {
          return player;
        }
      });
    } else {
      return null;
    }
  };

  printNewRound();

  return {
    playRound,
    getActivePlayer,
    checkWinner,
  };
}

const game = GameController();

cellBtns.forEach((cellBtn) => {
  cellBtn.addEventListener("click", (e) => {
    console.log("clicked!");
    console.log(e.target.classList[1]);
    // grab number from cellBtn and parse into game.playRound()
    var player = game.getActivePlayer();
    e.target.textContent = player.token;
    console.log(player);
    game.playRound(e.target.classList[1]);
  });
});
