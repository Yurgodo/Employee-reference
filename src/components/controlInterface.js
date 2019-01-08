import React from 'react';
import Button from './button';

class ControlInterface extends React.Component {
  constructor(props) {
    super(props);
    this.onAddClick = this.onAddClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onSaveStorageClick = this.onSaveStorageClick.bind(this);
    this.onRefreshStorageClick = this.onRefreshStorageClick.bind(this);
  }

  onAddClick(e) {
    this.props.onControlClick('AddEmployee', e)
  }

  onDeleteClick(e) {
    this.props.onControlClick('DeleteEmployee', e)
  }

  onSaveStorageClick(e) {
    this.props.onControlClick('SaveStorage', e)
  }

  onRefreshStorageClick(e) {
    this.props.onControlClick('RefreshStorage', e)
  }

  render() {
    return (
      <div className="control-interface row">
        <Button name="Добавить нового сотрудника" onClick={this.onAddClick} isDisabled={this.props.isEmployeeChanged ? false : true}/>
        <Button name="Удалить выбранного сотрудника" onClick={this.onDeleteClick} isDisabled={this.props.isRowSelected ? false : true}/>
        <Button name="Сохранить изменения" onClick={this.onSaveStorageClick} isDisabled={this.props.isSaveDisabled}/>
        <Button name="Обновить данные" onClick={this.onRefreshStorageClick}/>
      </div>
    );
  }
}

export default ControlInterface;