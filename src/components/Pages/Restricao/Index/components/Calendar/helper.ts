const getTable = () => document.getElementsByClassName('calendar')[0];

const mouseover = e => {
  const td: HTMLTableCellElement = e.target.closest('td');
  const tr: HTMLTableRowElement = e.target.closest('tr');

  if (td) {
    const { cellIndex } = td;
    const tds = document.querySelectorAll(
      `.calendar tr td:nth-child(${cellIndex + 1})`,
    );
    const ths = document.querySelectorAll(
      `.calendar tr th:nth-child(${cellIndex + 1})`,
    );

    tds.forEach(t => t.classList.add('hovered'));
    ths.forEach(t => t.classList.add('hovered'));
  }

  if (tr) {
    const { rowIndex } = tr;
    const tds = document.querySelectorAll(
      `.calendar tr:nth-child(${rowIndex}) td`,
    );
    tds.forEach(t => t.classList.add('hovered'));
  }
};

const mouseout = e => {
  const td: HTMLTableCellElement = e.target.closest('td');
  const tr: HTMLTableRowElement = e.target.closest('tr');

  if (td) {
    const { cellIndex } = td;
    const tds = document.querySelectorAll(
      `.calendar tr td:nth-child(${cellIndex + 1})`,
    );
    const ths = document.querySelectorAll(
      `.calendar tr th:nth-child(${cellIndex + 1})`,
    );
    tds.forEach(t => t.classList.remove('hovered'));
    ths.forEach(t => t.classList.remove('hovered'));
  }

  if (tr) {
    const { rowIndex } = tr;
    const tds = document.querySelectorAll(
      `.calendar tr:nth-child(${rowIndex}) td`,
    );
    tds.forEach(t => t.classList.remove('hovered'));
  }
};

export { getTable, mouseout, mouseover };
