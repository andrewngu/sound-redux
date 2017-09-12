/* global window */

const totalHeightofRows = (rowCount, rowHeight, marginBetweenRows) =>
  (rowHeight * rowCount) + (marginBetweenRows * (rowCount - 1));

const ITEMS_PER_ROW = 5;
const MARGIN_BETWEEN_ROWS = 20;
const NUM_OF_BUFFER_ROWS = 5;
const ROW_HEIGHT = 132;

const THREE_ROWS_HEIGHT = totalHeightofRows(3, ROW_HEIGHT, MARGIN_BETWEEN_ROWS);
const TWO_ROWS_HEIGHT = totalHeightofRows(2, ROW_HEIGHT, MARGIN_BETWEEN_ROWS);

const scrollState = (height, count, isMobile) => {
  if (isMobile) {
    return {
      paddingTop: 0,
      paddingBottom: 0,
      start: 0,
      end: count,
    };
  }

  const scrollY = window.scrollY;

  let paddingTop = 0;
  let paddingBottom = 0;
  let start = 0;
  let end = count;

  const rowWithMarginHeight = ROW_HEIGHT + MARGIN_BETWEEN_ROWS;
  const shouldPadTop = scrollY > THREE_ROWS_HEIGHT;

  if (shouldPadTop) {
    const rowsToPad = Math.floor((scrollY - TWO_ROWS_HEIGHT) / rowWithMarginHeight);
    paddingTop = rowsToPad * rowWithMarginHeight;
    start = rowsToPad * ITEMS_PER_ROW;
  }

  const rowsOnScreen = Math.ceil(height / rowWithMarginHeight);
  const itemsToShow = (rowsOnScreen + NUM_OF_BUFFER_ROWS) * ITEMS_PER_ROW;
  const shouldPadBottom = count > (start + itemsToShow);

  if (shouldPadBottom) {
    end = start + itemsToShow;
    const rowsToPad = Math.ceil((count - end) / ITEMS_PER_ROW);
    paddingBottom = rowsToPad * rowWithMarginHeight;
  }

  return {
    end,
    paddingBottom,
    paddingTop,
    start,
  };
};

export default scrollState;
