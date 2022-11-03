import { Component } from 'react';

export class Modal extends Component {
  componentDidMount() {
    console.log('componentDidMount...');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount...');
  }

  redner() {
    return (
      <div className="Overlay">
        <div className="Modal">{this.props.children}</div>
      </div>
    );
  }
}

// export const Modal = () => {
//   return (
//     <div className="Overlay">
//       <div className="Modal">
//         Modalka...
//         <img src="" alt="" />
//       </div>
//     </div>
//   );
// };
