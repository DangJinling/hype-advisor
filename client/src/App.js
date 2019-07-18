// import React from 'react';
// import './App.css';
// import Scrollex from './components/hypeAdvisor/Scrollex';

// function App() {
//   return (
//     <div >
//       {/* <header className="App-header"> */}
//       {/* <img src={favicon} className="App-logo" alt="logo" /> */}
//       {/* <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a> */}
//       <Scrollex />
//       {/* </header> */}
//     </div>
//   );
// }

// export default App;


import React, { Component } from 'react';
import './App.css';
import Scrollex from './components/hypeAdvisor/Scrollex';

export class App extends Component {
  render() {
    return (
      <div>
        <Scrollex />
      </div>
    )
  }
}

export default App

