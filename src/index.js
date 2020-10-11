import React from 'react';
import ReactDOM from 'react-dom';

import { css } from 'glamor';

import NotesApp from './NotesApp';

css.global('html, body', { height: '100%' });
css.global('body', {
	margin: 0,
	padding: 0,

	overflow: 'hidden',

	display: 'flex',
	flexDirection: 'column'
});
css.global('#root', {
	overflow: 'hidden',

	display: 'flex',
	flexDirection: 'column',

	flex: 1
});

ReactDOM.render(<NotesApp />, window.document.getElementById('root'));
