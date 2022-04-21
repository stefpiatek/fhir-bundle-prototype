import {readFileSync} from 'fs';

const readCsv = (filePath) => {
  const data = readFileSync(filePath, "utf-8")

  let rows = [];
  for (const row of data.split("\n")) {
    let dataRow = {}
    let colNumber = 0;
    for (const column of row.split(",")) {
      colNumber += 1;
      dataRow[`col${colNumber}`] = column;
    }
    if (dataRow["col1"]) {
      rows.push(dataRow);
    }
  }
  return rows;
}

export default readCsv;
