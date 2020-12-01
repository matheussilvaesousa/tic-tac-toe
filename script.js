const Gameboard = (() => {
  const board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  const show = () => board;
  const play = (player, x, y) => {
    board[y][x] = player.number;
    return;
  };
  return { show, play };
})();

const Player = (number) => {
  const name = `Player ${number}`;
  return { name, number };
};

Gameboard.play(1, 1, 1);
console.log(Gameboard.show());
