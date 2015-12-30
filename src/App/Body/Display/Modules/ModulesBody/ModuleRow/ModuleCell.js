import React from 'react';
import request from 'superagent';
import { isDateField, isUnlimitedField, numberWithCommas } from 'util';
import { VALID, NAME, CODE } from 'data/columnNames';
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
      // TODO: use material-ui colors? or at least split into constants
      isIndented ? '#B6E0FE' : '#60B3EE'
    ) : undefined,
    color: (column === NAME) ? '#000000' : undefined
  };
}

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
