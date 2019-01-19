import * as React from 'react';

export default class Button extends React.Component<IButtonProps>  { 
  render() {
    return (
      <button disabled={this.props.isDisabled} onClick={ e => this.props.handleClick(e)} className={"btn btn-primary"} style={{margin: '10px'}}> {this.props.name} </button>
    );
  }
}