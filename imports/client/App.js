import React, {Component} from 'react';
import {render} from 'react-dom';
import Header from './Header.jsx';
import Template from 'meteor/templating';
export default class App extends Component {


	render()
	{
		return(
			<div name="app">
				<Header/>
			</div>
		);
	}
}
