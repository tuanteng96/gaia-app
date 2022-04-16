// Import React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom';

// Import Framework7
import Framework7 from 'framework7/lite-bundle';
//import Framework7 from './framework7-custom';

// Import Framework7-React Plugin
import Framework7React from 'framework7-react';

// Import Framework7 Styles
import 'framework7/framework7-bundle.css';

// React Toastify
import 'react-toastify/dist/ReactToastify.css';

// Import react-lazy-load-image-component
import "react-lazy-load-image-component/src/effects/blur.css";

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.scss';

// Import App Component
import App from '../app/MyApp.jsx';

// Init F7 React Plugin
Framework7.use(Framework7React);

// Mount React App
ReactDOM.render(
    React.createElement(App),
    document.getElementById('app'),
);