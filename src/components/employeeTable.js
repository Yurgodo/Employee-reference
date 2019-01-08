import React from 'react';
import EmployeeRow from './employeeRow';

class EmployeeTable extends React.Component {
  constructor(props) {
    super(props);
    
    this.onRowClick = this.onRowClick.bind(this);
    
    // this.state = {
    //   isSelectedRow: false,
    //   selectedEmployeeID: null
    // };
  }
  //Вызываем функцию из компонента EmployeeRow, при нажатии на строку
  onRowClick(id, e) {
    //Изменяем состояние основного компонента
    let selectedEmployee = {};
    this.props.employees.forEach((employee) => {
      if (employee.id === id) {
        let copyEmployee = {};
        for (var key in employee) {
          copyEmployee[key] = employee[key];
        }
        selectedEmployee = copyEmployee
      }
    });
    this.props.onChange(id, selectedEmployee, e);
  }

  render() {
    let rows = [];
    this.props.employees.forEach((employee, i) => {
      rows.push(<EmployeeRow key={employee.id} number={i+1} name={employee.name} employee={employee} onRowClick={this.onRowClick} isSelected={this.props.selectedEmployeeID === employee.id ? true : false}/>);
    });
    // Возвращаем таблицу с заголовками колонок и контентом записаным в массив rows
    return (
      <div>
        <table className={"table table-bordered table-hover"}>
          <thead className={"thead-light"}>
            <tr>
              <th style={{width: "10%"}}> # </th>
              <th style={{width: "90%"}}> ФИО </th>
            </tr>
          </thead>
          <tbody>{ rows }</tbody>
        </table>
      </div>
    );
  }
}


export default EmployeeTable;