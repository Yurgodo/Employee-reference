interface IButtonProps {
  name: string;
  isDisabled: boolean;
  handleClick(e: any): void;
}

interface IControlInterfaceProps {
  isEmployeeChanged: boolean;
  isRowSelected: boolean;
  onControlClick(btnName: string, e: any): void;
  isSaveDisabled: boolean;
}

interface IEmployeeEditProps {
  employee: any;
  onEmployeeChange(editedEmployee: any, e: any):void;
  isNewEmployee: boolean;
}

interface IEmployeeCard {
  employee: any;
  onEmployeeChange(editedEmployee: any, e: any): void;
  employees: any;
}

interface IEmployeeTableProps {
  employees: any;
  onChange(employeeID: number, selEmployee: any, e: any): void;
  isRowSelected: boolean;
  selectedEmployeeID: number;
}

interface IEmployeeRowProps {
  key: number;
  number: number;
  name: string
  employee: any;
  onRowClick(employeeID: number, e: any): void;
  isSelected: boolean;
}