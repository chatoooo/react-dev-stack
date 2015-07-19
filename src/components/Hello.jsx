import React from 'react';
import 'styles/Hello'

class Hello extends React.Component {

  render() {
    return(<div className="hello">Hello {this.props.name}</div>);
  }
};

export default Hello;

