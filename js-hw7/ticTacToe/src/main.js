window.addEventListener('load', function() {
    const game = new Game();
    const board = new Board();
    const status = new Status();

    board.init(game, status);
    game.init(status, board);

    board.renderMap();
    board.initEventHandlers();
});