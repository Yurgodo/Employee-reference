import * as React from 'react';
import * as ReactDOM from 'react-dom';
import EmployeeCard from './components/employeeCard';
import EmployeeTable from './components/employeeTable';
import ControlInterface from './components/controlInterface';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

@observer
class MainComponent extends React.Component<any, any> {
  //Объявляем состояния 
  @observable employees: any = EMPLOYEES;
  @observable editedEmployee: any;
  @observable isEmployeeValid: boolean = false;
  @observable isRowSelected: boolean = false;
  @observable isUnsavedChanges: boolean = false;
  @observable modal: boolean = false;
  @observable selectedEmployeeID: number = null;

  constructor(props: any) {
    super(props);
    this.handleRowChange = this.handleRowChange.bind(this);
    this.onFormChange = this.onFormChange.bind(this);
    this.onControlClick = this.onControlClick.bind(this);
    this.modalToggle = this.modalToggle.bind(this);
    this.refreshDataStorage = this.refreshDataStorage.bind(this);
    this.saveDataStorage = this.saveDataStorage.bind(this);
  }

  //Подъем модального окна
  modalToggle() {
    this.modal = !this.modal
  }

  //Добавляем в состояние id клиента
  handleRowChange(value: number, employee: any, e: any) {
    this.selectedEmployeeID = value;
    this.editedEmployee = employee;
    this.isRowSelected = true;
  }

  //Меняем состояние с информацией, что карточка сотрудника изменилась
  onFormChange(editedEmployee: any, e: any) {
    let isEmployeeValid = false;
    if (editedEmployee.name && editedEmployee.position) {
      isEmployeeValid = true;
    }
    this.isEmployeeValid = isEmployeeValid;
    this.editedEmployee = editedEmployee;
  }

  onControlClick(btnName: string, e: any) {
    switch (btnName) {
      case 'AddEmployee':
        let editedEmployee = this.editedEmployee;
        let copyEmployee: any = {};
        for (var key in editedEmployee) {
          copyEmployee[key] = editedEmployee[key];
        }
        editedEmployee = copyEmployee;
        let currentEmployee = editedEmployee;
        currentEmployee.id++;
        this.selectedEmployeeID = editedEmployee.id;
        this.editedEmployee = currentEmployee;
        this.isRowSelected = true;
        this.employees = this.employees.concat([editedEmployee]);
        this.isUnsavedChanges = true;
      break
      case 'DeleteEmployee':
        let selectedEmployeeID = this.selectedEmployeeID;
        let deletedEmployeeIndex = null;
        this.employees.forEach((employee: any, i: number) => {
          if (employee.id === selectedEmployeeID) {
            deletedEmployeeIndex = i
          }
        });
        let array = [...this.employees];
        array.splice(deletedEmployeeIndex, 1);
        this.employees = array;
        this.isRowSelected = false;
        this.isUnsavedChanges = true;
        this.selectedEmployeeID = null;
        this.editedEmployee = null;
        this.isEmployeeValid = false;
      break
      case 'SaveStorage':
        this.saveDataStorage();
      break
      case 'RefreshStorage':
        if (this.isUnsavedChanges) {
          this.modalToggle();
        } else {
          this.refreshDataStorage();
        }
      break
    }
  }

  refreshDataStorage() {
    let storageData = JSON.parse(localStorage.getItem('EMPLOYEES'));
    let employeesFromStorage = storageData !== null ? storageData : [];
    this.employees = employeesFromStorage;
    this.isRowSelected = false;
    this.editedEmployee = null;
    this.selectedEmployeeID = null;
    this.isUnsavedChanges = false;
    this.modal = false;
  }

  saveDataStorage() {
    localStorage.setItem('EMPLOYEES', JSON.stringify(this.employees));
    this.isUnsavedChanges = false;
  }

  render() {
    let editedEmployee = this.editedEmployee;
    if (this.editedEmployee) {
      let copyEmployee: any = {};
      for (var key in editedEmployee) {
        copyEmployee[key] = editedEmployee[key];
      }
      editedEmployee = copyEmployee;
    }
    // Возвращаем таблицу с заголовками колонок и контентом записаным в массив rows
    return (
      <div className="row">
        <div className="employee-table col-lg-6 col-md-6 col-sm-6" style={{}}>
          <h1>Список сотрудников</h1>
          <ControlInterface isEmployeeChanged={this.isEmployeeValid} isRowSelected={this.isRowSelected} onControlClick={this.onControlClick} isSaveDisabled={!this.isUnsavedChanges}/>
          <EmployeeTable employees={this.employees} onChange={this.handleRowChange} isRowSelected={this.isRowSelected} selectedEmployeeID={this.selectedEmployeeID}/>
        </div>
        <div className="employee-card col-lg-6 col-md-6 col-sm-6" style={{}}>
          <EmployeeCard employee={editedEmployee} onEmployeeChange={this.onFormChange} employees={this.employees}/>
        </div>

        <Modal isOpen={this.modal} toggle={this.modalToggle} className={this.props.className}>
          <ModalHeader toggle={this.modalToggle}>Обновление данных</ModalHeader>
          <ModalBody>
            Все внесенные изменения будут потеряны
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.refreshDataStorage}>Продолжить</Button>{' '}
            <Button color="secondary" onClick={this.modalToggle}>Отмена</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }

  //Метод для проверки равенства объектов
  objectsAreSame(x: any, y: any) {
    var objectsAreSame = true;
    for(var propertyName in x) {
       if(x[propertyName] !== y[propertyName]) {
          objectsAreSame = false;
          break;
       }
    }
    return objectsAreSame;
  }
}

// Пример полученых данных
var EMPLOYEES = localStorage.getItem('EMPLOYEES') === null ? [] : JSON.parse(localStorage.getItem('EMPLOYEES'));

ReactDOM.render(
  <MainComponent />,
  document.getElementById('app')
);

declare var module : {
  hot : {
    accept(path?:string, callback?:() => void): void;
  };
};

module.hot.accept();
