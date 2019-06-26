import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import cx from './classnames';

const App = () => (
	<div className={cx('col-4')}>Application code</div>
);

ReactDOM.render(<App />, document.getElementById('root'));
