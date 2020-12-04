const Game = (() => {
  const _board = {
    data: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
  };

  const _players = {};

  const _merge = (board, value) => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        value.innerHTML = _players.current.symbol;
      }
    }
  };

  const _check = (board) => {
    const _isCompleted = (array) => {
      return (
        array.filter((element, index, array) => {
          return element === array[0] && element !== 0;
        }).length === 3
      );
    };

    const _checkDiagonal = (x1, y1, x2, y2, x3, y3) => {
      const currDiagonal = [board[y1][x1], board[y2][x2], board[y3][x3]];
      return _isCompleted(currDiagonal);
    };

    const _checkLines = () => {
      for (let i = 0; i < board.length; i++) {
        const currHorizontal = [board[i][0], board[i][1], board[i][2]];
        if (_isCompleted(currHorizontal)) {
          console.log("horizontal completed");
          return true;
        }

        for (let j = 0; j < board[i].length; j++) {
          const currVertical = [board[0][j], board[1][j], board[2][j]];
          if (_isCompleted(currVertical)) {
            console.log("vertical completed");
            return true;
          }
        }
      }

      return false;
    };

    const mainDiagonal = _checkDiagonal(0, 0, 1, 1, 2, 2);
    const antiDiagonal = _checkDiagonal(0, 2, 1, 1, 2, 0);
    const lines = _checkLines();
    return mainDiagonal || antiDiagonal || lines;
  };

  const _draw = (board) => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === 0) {
          return false;
        }
      }
    }
    return true;
  };

  const setup = (isHuman) => {
    _players.first = PlayerFactory(1, true);
    _players.second = PlayerFactory(2, isHuman);
    _players.current = _players.first;
  };

  const show = () => Object.assign({}, _board);

  const update = (event) => {
    const targetDataset = event.target.dataset;
    const board = _board.data;
    const firstWinCheck = _check(board);

    if (firstWinCheck) {
      return;
    }

    if (board[targetDataset.y][targetDataset.x] !== 0) {
      return;
    }

    board[targetDataset.y][targetDataset.x] = _players.current.number;
    _merge(board, event.target);

    const secondWinCheck = _check(board);

    if (secondWinCheck) {
      console.log("Hooray!");
      Display.elements.message.innerHTML = `${_players.current.name} has won!`;
      return;
    }

    const drawCheck = _draw(board);

    if (drawCheck) {
      Display.elements.message.innerHTML = "It's a draw";
      return;
    }

    if (_players.current.number === 1) {
      _players.current = _players.second;
    } else {
      _players.current = _players.first;
    }
  };

  const restart = () => {
    const board = _board.data;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        board[i][j] = 0;
      }
    }
    _players.current = _players.first;
  };

  const PlayerFactory = (number, isHuman) => {
    const name = isHuman ? `Player ${number}` : "AI";
    const symbol = number === 1 ? "X" : "O";
    return { name, number, symbol };
  };

  return { setup, show, update, restart };
})();

const Display = (() => {
  const start = () => {
    Game.setup(true); // true = human, false = AI
  };

  const restart = () => {
    Game.restart();

    elements.cols.forEach((col) => {
      col.innerHTML = "";
    });
    elements.message.innerHTML = "Let's play";
  };

  const elements = (() => {
    const cols = Array.from(document.querySelectorAll(".col"));
    const message = document.getElementById("message-container");
    const restart = document.getElementById("restart-container");
    return {
      cols,
      message,
      restart,
    };
  })();

  elements.cols.forEach((col) => {
    col.addEventListener("click", Game.update);
  });

  elements.restart.addEventListener("click", restart);

  return {
    elements,
    start,
  };
})();

Display.start();
