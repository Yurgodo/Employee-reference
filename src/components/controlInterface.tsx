import * as React from 'react';
import Button from './button';

export default class ControlInterface extends React.Component<IControlInterfaceProps> {
  render() {
    return (
      <div className="control-interface row">
        <Button name="Добавить нового сотрудника" handleClick={ e => this.props.onControlClick('AddEmployee', e)} isDisabled={this.props.isEmployeeChanged ? false : true}/>
        <Button name="Удалить выбранного сотрудника" handleClick={ e => this.props.onControlClick('DeleteEmployee', e)} isDisabled={this.props.isRowSelected ? false : true}/>
        <Button name="Сохранить изменения" handleClick={ e => this.props.onControlClick('SaveStorage', e)} isDisabled={this.props.isSaveDisabled}/>
        <Button name="Обновить данные" handleClick={e => this.props.onControlClick('RefreshStorage', e)} isDisabled={false}/>
      </div>
    );
  }
}