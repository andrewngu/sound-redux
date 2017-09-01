/* global window */

const scrollState = (height, count) => {
  const MARGIN_TOP = 20;
  const ROW_HEIGHT = 132;
  const ITEMS_PER_ROW = 5;
  const scrollY = window.scrollY;

  let paddingTop = 0;
  let paddingBottom = 0;
  let start = 0;
  let end = count;

  if ((scrollY - ((ROW_HEIGHT * 3) + (MARGIN_TOP * 2))) > 0) {
    const rowsToPad = Math.floor(
      (scrollY - ((ROW_HEIGHT * 2) + (MARGIN_TOP))) / (ROW_HEIGHT + MARGIN_TOP),
    );
    paddingTop = rowsToPad * (ROW_HEIGHT + MARGIN_TOP);
    start = rowsToPad * ITEMS_PER_ROW;
  }

  const rowsOnScreen = Math.ceil(height / (ROW_HEIGHT + MARGIN_TOP));
  const itemsToShow = (rowsOnScreen + 5) * ITEMS_PER_ROW;
  if (count > (start + itemsToShow)) {
    end = start + itemsToShow;
    const rowsToPad = Math.ceil((count - end) / ITEMS_PER_ROW);
    paddingBottom = rowsToPad * (ROW_HEIGHT + MARGIN_TOP);
  }

  return {
    end,
    paddingBottom,
    paddingTop,
    start,
  };
};

export default scrollState;
