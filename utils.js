export const PLAYING_FIELD_ROW = 20;
export const PLAYING_FIELD_COLUMN = 10;
export const TETRAMINO_NAMES = ['S', 'Z', 'T', 'O', 'I', 'J', 'L'];
export const TETRAMINO_FORMS = {
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  O: [
    [1, 1],
    [1, 1],
  ],
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
};
export const getRandomTetramino = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)]; //получаем случайную форму тетрамины
};

export const positionIndex = (row, column) => {
  return row * PLAYING_FIELD_COLUMN + column; //получаем индекс
};

//функция вращения формы
export const rotateForm = (tetramino) => {
  const oldForm = tetramino.form;
  const oldRows = oldForm.length;
  const oldCols = oldForm[0].length;

  // Создаем новую матрицу с перевернутыми размерами
  const newForm = Array.from({ length: oldCols }, () => Array(oldRows).fill(0));

  // Перебираем старую матрицу и заполняем новую
  for (let i = 0; i < oldRows; i++) {
    for (let j = 0; j < oldCols; j++) {
      newForm[j][oldRows - 1 - i] = oldForm[i][j];
    }
  }

  // Возвращаем обновленный тетрамино с новой формой
  return newForm;
};
