import {
  PLAYING_FIELD_COLUMN,
  PLAYING_FIELD_ROW,
  TETRAMINO_FORMS,
  TETRAMINO_NAMES,
  getRandomTetramino,
  positionIndex,
  rotateForm,
} from './utils.js';

let assetField = [];

//заполняем матрицу нулями и создаем соответвующее количество дивов
export const buildField = () => {
  const tetrisContainer = document.querySelector('.teris__container');

  for (let i = 0; i < PLAYING_FIELD_ROW; i++) {
    assetField[i] = [];
    for (let j = 0; j < PLAYING_FIELD_COLUMN; j++) {
      assetField[i][j] = 0;
      const gameCell = document.createElement('div');
      tetrisContainer.appendChild(gameCell);
    }
  }
  return assetField;
};
//функция создания тетрамины
export const createTetramino = () => {
  const name = getRandomTetramino(TETRAMINO_NAMES); //получаем случайную форму тетрамины(индекс формы)
  const form = TETRAMINO_FORMS[name]; //получаем случайную форму по индексу
  const column = PLAYING_FIELD_COLUMN / 2 - Math.floor(form.length / 2); //расчитываем номер колонки
  const row = -2; //номер строки
  return { name, form, column, row };
};

//финкция отрисовки тетрамины
export const drawTetramino = (tetramino, gameCells) => {
  const name = tetramino.name; //достаём имя формы
  const formSize = tetramino.form.length; //записываем размер матрицы
  for (let i = 0; i < formSize; i++) {
    for (let j = 0; j < formSize; j++) {
      if (tetramino.form[i][j] != 1) continue; //если не равно 1 идём дальше
      if (tetramino.row + i < 0) continue; //расчёт строки
      //во всех остальных случаях отрисовываем
      const cellIndex = positionIndex(tetramino.row + i, tetramino.column + j);
      gameCells[cellIndex].classList.add(name);
    }
  }
};

//функция перемещения вправо
export const tetraminoRight = (tetramino, playingField) => {
  tetramino.column += 1;
  if (checkBorder(tetramino, playingField)) {
    tetramino.column -= 1;
  }
  return tetramino;
};

//функция перемещения влево
export const tetraminoLeft = (tetramino, playingField) => {
  tetramino.column -= 1;
  if (checkBorder(tetramino, playingField)) {
    tetramino.column += 1;
  }
  return tetramino;
};

//фнкция вращения
export const tetraminoRotate = (tetramino, playingField) => {
  const oldForm = tetramino.form;
  const form = rotateForm(tetramino);
  tetramino.form = form;
  if (checkBorder(tetramino, playingField)) {
    tetramino.form = oldForm;
  }
  return tetramino;
};

// Функция  проверяет столкновение тетрамины с границами игрового поля
export const checkBorder = (tetramino, playingField) => {
  const { form } = tetramino;
  const formSize = form.length;
  for (let i = 0; i < formSize; i++) {
    for (let j = 0; j < formSize; j++) {
      if (form[i][j] == 0) continue;
      if (exitLimit(tetramino, i, j, playingField)) return true;
      if (isCollide(tetramino, i, j, playingField)) return true;
    }
  }
  return false;
};

//функция проверяет касается ли чего либо фигура
const isCollide = (tetramino, row, column, playingField) => {
  return playingField[tetramino.row + row]?.[tetramino.column + column];
};
// Функция  проверяет, выходит ли ячейка тетрамины за границы игрового поля
const exitLimit = (tetramino, row, column, playingField) => {
  const { column: tetraminoColumn, row: tetraminoRow } = tetramino;

  return (
    tetraminoColumn + column < 0 ||
    tetraminoColumn + column >= PLAYING_FIELD_COLUMN ||
    tetraminoRow + row >= playingField.length
  );
};
