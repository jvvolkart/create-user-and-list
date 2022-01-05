import React from 'react';

// import { Container } from './styles';

function SafeArea(props) {
  return (
    <div style={{ padding: '60px 0px 0px 60px' }}>
  {props.children}
    </div>
  );
}

export default SafeArea;