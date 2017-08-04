import React from "react";
import {observer} from "mobx-react";
import Footer from "./footer";
import Task from "./task";
import _ from "lodash";
import taskStore from "./mobx/task-store";

@observer
export default class MainContainer extends React.Component {

	render() {
		let {tasks} = taskStore;
		return (
			<div className="main-container ace-save-state" id="main-container">
				<div className="main-content">
					<div className="main-content-inner">
						<div className="page-content">
							<div className="row">
								<div className="col-xs-12">
									{tasks.map((t) => <Task key={t.id} task={t}/>)}
								</div>
							</div>
						</div>
					</div>
				</div>
				<Footer/>
			</div>
		)
	}

}
