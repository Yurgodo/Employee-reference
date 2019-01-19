import * as React from 'react';
import EmployeeRow from './employeeRow';

export default class EmployeeTable extends React.Component<IEmployeeTableProps> {
  constructor(props: any) {
    super(props);
    
    this.onRowClick = this.onRowClick.bind(this);
  }
  //Вызываем функцию из компонента EmployeeRow, при нажатии на строку
  onRowClick(id: number, e: any) {
    //Изменяем состояние основного компонента
    let selectedEmployee = {};
    this.props.employees.forEach((employee: any) => {
      if (employee.id === id) {
        let copyEmployee: any = {};
        for (var key in employee) {
          copyEmployee[key] = employee[key];
        }
        selectedEmployee = copyEmployee
      }
    });
    this.props.onChange(id, selectedEmployee, e);
  }

  render() {
    let rows: any = [];
    this.props.employees.forEach((employee: any, i: number) => {
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