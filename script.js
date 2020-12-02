const Game = (() => {
  const _board = {
    data: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
  };

  const _players = {};

  const _merge = (board, target) => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        target.innerHTML = _players.current.symbol;
      }
    }
  };

  const setup = (isHuman) => {
    _players.first = PlayerFactory(1, true);
    _players.second = PlayerFactory(2, isHuman);
    _players.current = _players.first;
  };

  const show = () => Object.assign({}, _board);

  const update = (event) => {
    const target = event.target.dataset;

    if (_board.data[target.y][target.x] !== 0) return;

    _board.data[target.y][target.x] = _players.current.number;
    _merge(_board.data, event.target);

    if (_players.current.number === 1) {
      _players.current = _players.second;
    } else {
      _players.current = _players.first;
    }
  };

  const PlayerFactory = (number, isHuman) => {
    const name = isHuman ? `Player ${number}` : "AI";
    const symbol = number === 1 ? "X" : "O";
    return { name, number, symbol };
  };

  return { setup, show, update };
})();

const Display = (() => {
  const start = () => {
    Game.setup(true); // Checks if 2nd player is human
  };

  const elements = (() => {
    const cols = Array.from(document.querySelectorAll(".col"));
    return {
      cols,
    };
  })();

  elements.cols.forEach((col) => {
    col.addEventListener("click", Game.update);
  });

  return {
    elements,
    start,
  };
})();

Display.start();

// const jose = Player(1);

// Board.update(jose, 1, 1);
// console.log(Board.show());
