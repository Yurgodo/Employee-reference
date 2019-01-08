import React from 'react';

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  
  onClick(e) {
    this.props.onClick(e);
  }

  render() {
    return (
      <button disabled={this.props.isDisabled} onClick={this.onClick} className={"btn btn-primary"} style={{margin: '10px'}}> {this.props.name} </button>
    );
  }
}

export default Button;