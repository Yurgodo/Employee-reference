import * as React from 'react';

export default class EmployeeRow extends React.Component<IEmployeeRowProps> {
  render() {
    return (
      <tr className={this.props.isSelected ? "table-active" : ""} onClick={e => this.props.onRowClick(this.props.employee.id, e)} key={this.props.employee.id}>
        <td style={{width: "10%"}}> { this.props.number } </td>
        <td style={{width: "90%"}}> { this.props.name } </td>
      </tr>
    );
  }
}