import React from 'react';
import request from 'superagent';
import { isDateField, isUnlimitedField, numberWithCommas } from 'util';
import { VALID, NAME, CODE } from 'data/columnNames';
import colors from 'data/colors';
import TableRowColumn from 'material-ui/lib/table/table-row-column';

export default function ModuleCell({ module, column }) {
  return (
    <TableRowColumn style={cellStyle(module, column)}>
      {cellContents(module, column)}
    </TableRowColumn>
  );
}

function cellStyle(module, column) {
  const isIndented = module[NAME].startsWith(' ');

  return {
    whiteSpace: isIndented ? 'pre' : 'pre-wrap',
    overflow: 'visible',
    height: '1.5rem',
    fontWeight: (column === VALID) ? 'bold' : 'inherit',
    textAlign: (column === CODE || column === NAME) ? 'left' : 'center',
    backgroundColor: (column === NAME) ? (
      isIndented ? colors.emc.blue.light : colors.emc.blue.medium
    ) : undefined,
    color: (column === NAME) ? colors.black : undefined
  };
}

// TODO: move this somewhere else, maybe off of util?
let functions = {};
request('/src/data/functions.json', (err, res) => {
  functions = res.body;
});

function cellContents(module, column) {
  if (isDateField(column)) return formatDate(module[column]);
  if (isUnlimitedField(column) && module[column === '0']) return 'Unlimited';
  if (column === 'Function') return functions[module[NAME]];
  return numberWithCommas(module[column]);
}

function formatDate(date) {
  if (!date) return '';
  const shortMonth = date.toLocaleString('en-us', { month: 'short' });
  return `${shortMonth} ${date.getDate()}, ${date.getFullYear()}`;
}
