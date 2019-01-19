import * as React from 'react';

export default class EmployeeCard extends React.Component<IEmployeeCard> {
  constructor(props: any) {
    super(props);
    this.onFormChange = this.onFormChange.bind(this);
  }
  //Прокидываем информацию об изменении сотрудника в карточке 
  onFormChange(editedEmployee: any, e: any) {
    this.props.onEmployeeChange(editedEmployee, e);
  }

  render() {
    let employee = this.props.employee;
    let isNewEmployee = false;
    let employees = this.props.employees;
    let employeeID = employees.length === 0 ? 1 : employees[employees.length-1].id + 1;
    if (!employee) {
      employee={id: employeeID,name: '', position: '', birthdate: '', sex: 'male', fired: false};
      isNewEmployee = true;
    } else {
      employee.id = employeeID;
    }
    return (
      <div>
        <h1>Карточка сотрудника</h1>
        <EmployeeEdit employee={employee} onEmployeeChange={this.onFormChange} isNewEmployee={isNewEmployee}/>
      </div>
    );
  }
}

class EmployeeEdit extends React.Component<IEmployeeEditProps> {
  constructor(props: any) {
    super(props);
    this.onFormChange = this.onFormChange.bind(this);
  }

  onFormChange(e: any) {
    let name = e.target.name;
    let value = e.target.value;
    let prevEmployee = this.props.employee;
    if (name === "fired") {
      prevEmployee[name] = e.target.checked;
    } else {
      prevEmployee[name] = value;
    }
    let copyEmployee:any = {};
    for (var key in prevEmployee) {
      copyEmployee[key] = prevEmployee[key];
    }
    this.props.onEmployeeChange(copyEmployee, e);    
  }

  render() {
    let employee = this.props.employee;
    return (
      <form style={{width: '50%'}}>
        <label style={{display: 'block'}}>
          ФИО:<input type="text" name="name" value={employee.name} onChange={this.onFormChange} className = {'form-control'} placeholder={'Введите ФИО'}/>
        </label>
        <label style={{display: 'block'}}>
          Должность:<input type="text" name="position" value={employee.position} onChange={this.onFormChange} className = {'form-control'} placeholder={'Введите должность'}/>
        </label>
        <label style={{display: 'block'}}>
          Дата рождения:<input type="date" id="birthdate" name="birthdate" value = {employee.birthdate} onChange={this.onFormChange} className = {'form-control'}/>
        </label>
        <label style={{display: 'block'}}>
          Пол: <br/>
          <div className={'custom-control custom-radio custom-control-inline'}>
            <input type="radio" id="sexMale"
              name="sex" value="male" checked={employee.sex === "male"} onChange={this.onFormChange} className = {'custom-control-input'}/>
            <label className={'custom-control-label'} htmlFor="sexMale">Муж.</label>
          </div>
          <div className={'custom-control custom-radio custom-control-inline'}>
            <input type="radio" id="sexFemale"
              name="sex" value="female" checked={employee.sex === "female"} onChange={this.onFormChange} className = {'custom-control-input'}/>
            <label className={'custom-control-label'} htmlFor="sexFemale">Жен.</label>
          </div>
        </label>
        <div className={"custom-control custom-checkbox"}>
          <input type="checkbox" name="fired" checked={employee.fired} onChange={this.onFormChange} className={"custom-control-input"} id={'fired'}/>
          <label style={{display: 'block'}} className={"custom-control-label"} htmlFor="fired">Уволен</label>
        </div>
      </form>
    );
  }
}