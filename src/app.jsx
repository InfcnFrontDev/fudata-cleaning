import React from "react";
import "../styles/index.scss";
import {observer} from "mobx-react";
import {enableLogging} from "mobx-logger";
import Navbar from "./navbar";
import MainContainer from "./main-container";

// 启用mobx日志输出
enableLogging({
	predicate: () => process.env.NODE_ENV !== 'production',
	action: true,
	reaction: true,
	transaction: true,
	compute: true
});

@observer
export default class App extends React.Component {
	render() {
		return (
			<div>
				<Navbar onAddTask={() => this.main.addTask()}/>
				<MainContainer ref={(e) => this.main = e}/>
			</div>
		)
	}

}
