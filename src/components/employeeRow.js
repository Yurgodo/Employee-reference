import React from 'react';

class EmployeeRow extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    this.props.onRowClick(this.props.employee.id, e);
  }

  render() {
    return (
      <tr className={this.props.isSelected ? "table-active" : ""} onClick={this.onClick} key={this.props.employee.id}>
        <td style={{width: "10%"}}> { this.props.number } </td>
        <td style={{width: "90%"}}> { this.props.name } </td>
      </tr>
    );
  }
}

export default EmployeeRow;