import React from 'react';
import ReactDOM from 'react-dom';
import EmployeeCard from './components/employeeCard';
import EmployeeTable from './components/employeeTable';
import ControlInterface from './components/controlInterface';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEmployeeValid: false,
      isRowSelected: false,
      employees: EMPLOYEES,
      selectedEmployeeID: null,
      isUnsavedChanges: false,
      modal: false
    };
    this.handleRowChange = this.handleRowChange.bind(this);
    this.onFormChange = this.onFormChange.bind(this);
    this.onControlClick = this.onControlClick.bind(this);
    this.modalToggle = this.modalToggle.bind(this);
    this.refreshDataStorage = this.refreshDataStorage.bind(this);
    this.saveDataStorage = this.saveDataStorage.bind(this);
  }

  //Подъем модального окна
  modalToggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  //Добавляем в состояние id клиента
  handleRowChange(value, employee, e) {
    this.setState({selectedEmployeeID: value, editedEmployee: employee, isRowSelected: true});
  }

  //Меняем состояние с информацией, что карточка сотрудника изменилась
  onFormChange(editedEmployee, e) {
    let isEmployeeValid = false;
    if (editedEmployee.name && editedEmployee.position) {
      isEmployeeValid = true;
    }
    this.setState({isEmployeeValid: isEmployeeValid, editedEmployee: editedEmployee});
  }

  onControlClick(btnName, e) {
    switch (btnName) {
      case 'AddEmployee':
        let editedEmployee = this.state.editedEmployee;
        let copyEmployee = {};
        for (var key in editedEmployee) {
          copyEmployee[key] = editedEmployee[key];
        }
        editedEmployee = copyEmployee;
        let currentEmployee = editedEmployee;
        currentEmployee.id++;
        this.setState((prevState) => 
        {
          return {
            selectedEmployeeID: editedEmployee.id,
            editedEmployee: currentEmployee,
            isRowSelected: true,
            employees: prevState.employees.concat([editedEmployee]),
            isUnsavedChanges: true
          }
        });
      break
      case 'DeleteEmployee':
        let selectedEmployeeID = this.state.selectedEmployeeID;
        let deletedEmployeeIndex = null;
        this.state.employees.forEach((employee, i) => {
          if (employee.id === selectedEmployeeID) {
            deletedEmployeeIndex = i
          }
        });
        let array = [...this.state.employees];
        array.splice(deletedEmployeeIndex, 1);
        this.setState({
          employees: array,
          isRowSelected: false,
          isUnsavedChanges: true,
          selectedEmployeeID: null,
          editedEmployee: null,
          isEmployeeValid: false
        });
      break
      case 'SaveStorage':
        this.saveDataStorage();
      break
      case 'RefreshStorage':
        if (this.state.isUnsavedChanges) {
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
    this.setState({
      employees: employeesFromStorage,
      isRowSelected: false,
      editedEmployee: null,
      selectedEmployeeID: null,
      isUnsavedChanges: false,
      isEmployeeValid: false,
      modal: false
    });
  }

  saveDataStorage() {
    localStorage.setItem('EMPLOYEES', JSON.stringify(this.state.employees));
    this.setState({
      isUnsavedChanges: false
    });
  }

  render() {
    let editedEmployee = this.state.editedEmployee;
    if (this.state.editedEmployee) {
      let copyEmployee = {};
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
          <ControlInterface isEmployeeChanged={this.state.isEmployeeValid} isRowSelected={this.state.isRowSelected} onControlClick={this.onControlClick} isSaveDisabled={!this.state.isUnsavedChanges}/>
          <EmployeeTable employees={this.state.employees} onChange={this.handleRowChange} isRowSelected={this.state.isRowSelected} selectedEmployeeID={this.state.selectedEmployeeID}/>
        </div>
        <div className="employee-card col-lg-6 col-md-6 col-sm-6" style={{}}>
          <EmployeeCard employee={editedEmployee} onEmployeeChange={this.onFormChange} employees={this.state.employees}/>
        </div>

        <Modal isOpen={this.state.modal} toggle={this.modalToggle} className={this.props.className}>
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
  objectsAreSame(x, y) {
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

module.hot.accept();