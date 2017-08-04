/* eslint-disable no-undef */
import React from "react";
import taskStore from "./mobx/task-store";

export default class Navbar extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			title: config.title
		}
		document.title = config.title;
	}

	render() {
		let {title} = this.state;
		return (
			<div id="navbar" className="navbar navbar-default ace-save-state">
				<div className="navbar-container ace-save-state" id="navbar-container">
					<div className="navbar-header pull-left">
						<a href="index.html" className="navbar-brand">
							<small>
								<i className="fa fa-leaf"></i>&nbsp;
								{title}
							</small>
						</a>
					</div>

					<div className="navbar-buttons navbar-header pull-right" role="navigation">
						<button className="btn btn-sm btn-success btn-add-task" onClick={() => taskStore.addTask()}>
							<i className="ace-icon fa fa-plus"></i>
							添加任务
						</button>
					</div>
				</div>
			</div>
		)
	}
}
