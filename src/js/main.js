import {
  buildField,
  checkBorder,
  createTetramino,
  drawTetramino,
  tetraminoLeft,
  tetraminoRight,
  tetraminoRotate,
} from './tetris.js';
import { PLAYING_FIELD_COLUMN, PLAYING_FIELD_ROW, positionIndex } from './utils.js';
import '../assets/styles/style.css';
const newGame = document.querySelector('.new_game');
function startGame() {
  let time;
  let gameOver = false;
  let score = 0;
  let lines = 0;
  //создаём игровое поле
  let playingField = buildField();

  const scorePoint = document.querySelector('.score__point');
  const linesPoint = document.querySelector('.lines__point');

  //получаем все игровые ячейки в виде дивов
  const gameCells = document.querySelectorAll('.teris__container > div');

  //создаём тетрамино
  let tetramino = createTetramino();

  //функция отрисовки поля
  const drawField = () => {
    for (let i = 0; i < PLAYING_FIELD_ROW; i++) {
      for (let j = 0; j < PLAYING_FIELD_COLUMN; j++) {
        if (!playingField[i][j]) continue;
        const name = playingField[i][j];
        const cellIndex = positionIndex(i, j);
        gameCells[cellIndex].classList.add(name);
      }
    }
  };

  //функция главной отриовки, которая удаляет классы у дивов и вызывает drawField и drawTetramino
  const mainDraw = () => {
    gameCells.forEach((item) => item.removeAttribute('class'));
    drawField();
    drawTetramino(tetramino, gameCells);
  };
  const animation = () => {
    clearTimeout(time);
    time = setTimeout(() => downMove(), 500);
  };
  const downMove = () => {
    if (gameOver) return;
    tetraminoDown(tetramino, playingField);
    mainDraw();
    animation();
  };
  //функция вешает слушатель на нажатия
  const setOnKeyPress = () => {
    document.addEventListener('keydown', onKeyPress);
  };

  //задаём управление на англискую и русскую раскладку. При нажатии на кнопку вызывается соответсвующий ей метод и после вызываем отрисовку
  const onKeyPress = (ev) => {
    if (gameOver) return;
    if (ev.key == 's' || ev.key == 'ы') {
      downMove();
    } else if (ev.key == 'a' || ev.key == 'ф') {
      tetraminoLeft(tetramino, playingField);
      mainDraw();
      console.log('нажатие');
    } else if (ev.key == 'd' || ev.key == 'в') {
      tetraminoRight(tetramino, playingField);
      mainDraw();
    } else if (ev.key == ' ') {
      tetraminoRotate(tetramino, playingField);
      mainDraw();
    } else {
      return;
    }
  };

  const checkGameOver = (row) => {
    return tetramino.row + row < 0;
  };

  //функцйия удаления заполненных строк
  const deleteRows = () => {
    const nonFilledRows = playingField.filter((row) => !row.every((cell) => Boolean(cell)));
    const deletedRows = PLAYING_FIELD_ROW - nonFilledRows.length;
    playingField = [
      ...Array(PLAYING_FIELD_ROW - nonFilledRows.length).fill(
        new Array(PLAYING_FIELD_COLUMN).fill(0),
      ),
      ...nonFilledRows,
    ];
    console.log(deletedRows);
    return deletedRows;
  };
  const displayScorePoint = (score, lines) => {
    scorePoint.innerText = score;
    linesPoint.innerText = lines;
  };
  const updateScore = (rows) => {
    switch (rows) {
      case 1:
        score += 40;
        lines += 1;
        displayScorePoint(score, lines);
        break;
      case 2:
        score += 100;
        lines += 2;
        displayScorePoint(score, lines);
        break;
      case 3:
        score += 300;
        lines += 3;
        displayScorePoint(score, lines);
        break;
      case 4:
        score += 1200;
        lines += 4;
        displayScorePoint(score, lines);
        break;
      default:
        // Необработанная клавиша
        break;
    }
  };
  //функция перемещения вниз
  const tetraminoDown = (tetramino, playingField) => {
    tetramino.row += 1;
    if (checkBorder(tetramino, playingField)) {
      tetramino.row -= 1;
      mergeTetramino(tetramino);

      console.log(playingField);
    }
    return tetramino;
  };

  //фугкция, которая добавляет тетрамин в основную матрицу
  const mergeTetramino = (tetraminoOld) => {
    const { form, row, column } = tetraminoOld;

    for (let i = 0; i < form.length; i++) {
      for (let j = 0; j < form[i].length; j++) {
        if (form[i][j] === 1) {
          const fieldRow = row + i;
          const fieldColumn = column + j;
          if (checkGameOver(i)) {
            console.log('конец');
            gameOver = true;
            return;
          }
          playingField[fieldRow][fieldColumn] = tetraminoOld.name;
        }
      }
    }
    //дополнительно проверяем строку на заполненность, создаем новую деталь и перерисовываем
    const deletedRows = deleteRows();
    updateScore(deletedRows);
    tetramino = createTetramino();
    mainDraw();
  };

  downMove();
  setOnKeyPress();
}
newGame.addEventListener('click', () => {
  startGame();
});
startGame();
