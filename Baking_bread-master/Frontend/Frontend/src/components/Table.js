import React from "react";
import "./Table.scss";

const Table = (props) => {
  let head = props.config.map((el) => <td key={el.key}>{el.name}</td>);
  let body = props.data.map((row, index) => (
    <tr key={row[props.KEY]}>
      {props.config.map((el) => (
        <td key={el.key}>
          {el.template ? el.template(row[el.varName]) : row[el.varName]}
        </td>
      ))}
    </tr>
  ));
  return (
    <table className="Table" style={{ ...props.style }}>
      <thead className="Table__head">
        <tr>{head}</tr>
      </thead>
      <tbody className="Table__body">{body}</tbody>
    </table>
  );
};

export default Table;
