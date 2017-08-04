import React from "react";
import _ from "lodash";

/**
 * 任务
 */
export default class Task extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			// 输入文本
			inputText: "",
			filterText: "",
			outputText: "",

			// 结果文本
			resultText: "",

			// 设置参数
			settings: {
				parameter1: 'aaaa',
				parameter2: 'bbbb'
			},

			// 是否运行中
			isRunning: false,
			// 当前活动Tab
			activeTab: 'task',

		}

	}

	render() {
		let {task} = this.props;
		let {inputOptions, filterOptions, outputOptions} = window.config;
		let {inputText, filterText, outputText, resultText, isRunning, activeTab} = this.state;

		// widget-box class style
		let widgetBoxClass = "widget-box ui-sortable-handle";
		if (isRunning) {
			widgetBoxClass += " position-relative";
		}

		return (
			<div className="row">
				<div className={widgetBoxClass}>
					<div className="widget-header widget-header-flat">
						<h5 className="widget-title smaller float-left">{"#Task_" + task.id}</h5>
						<div className="widget-toolbar no-border float-left">
							<ul className="nav nav-tabs" id="myTab">
								<li className={activeTab === "task" ? "active" : ""}>
									<a data-toggle="tab" href={"#task_" + task.id}>任务</a>
								</li>
								<li className={activeTab === "result" ? "active" : ""}>
									<a data-toggle="tab" href={"#result_" + task.id}>结果</a>
								</li>
							</ul>
						</div>

						<div className="widget-toolbar">
							<a href="#" data-action="settings" onClick={() => this.openSettings()}>
								<i className="ace-icon fa fa-cog"></i>
							</a>

							<a href="#" data-action="settings" onClick={() => this.run()}>
								<i className="ace-icon fa fa-play"></i>
							</a>

							<a href="#" data-action="fullscreen" className="orange2">
								<i className="ace-icon fa fa-expand"></i>
							</a>

							<a href="#" data-action="collapse">
								<i className="ace-icon fa fa-chevron-up"></i>
							</a>

							<a href="#" data-action="close">
								<i className="ace-icon fa fa-times"></i>
							</a>
						</div>
					</div>

					<div className="widget-body">
						<div className="widget-main padding-6">
							<div className="tab-content">
								<div id={"task_" + task.id}
									 className={activeTab === "task" ? "tab-pane active" : "tab-pane"}>
									<div className="row">
										<div className="col-lg-4">
											<select className="form-control"
													onChange={(e) => this.selectChanged(e.target.value, inputOptions, "inputText")}>
												<option value=""></option>
												{_.keys(inputOptions).map((k) => (
													<option key={k} value={k}>{inputOptions[k].text}</option>
												))}
											</select>
											<textarea className="form-control task-textarea" placeholder="Default Text"
													  value={inputText}/>
										</div>
										<div className="col-lg-4">
											<select className="form-control"
													onChange={(e) => this.selectChanged(e.target.value, filterOptions, "filterText")}>
												<option value=""></option>
												{_.keys(filterOptions).map((k) => (
													<option key={k} value={k}>{filterOptions[k].text}</option>
												))}
											</select>
											<textarea className="form-control task-textarea" placeholder="Default Text"
													  value={filterText}/>
										</div>
										<div className="col-lg-4">
											<select className="form-control"
													onChange={(e) => this.selectChanged(e.target.value, outputOptions, "outputText")}>
												<option value=""></option>
												{_.keys(outputOptions).map((k) => (
													<option key={k} value={k}>{outputOptions[k].text}</option>
												))}
											</select>
											<textarea className="form-control task-textarea" placeholder="Default Text"
													  value={outputText}/>
										</div>
									</div>
								</div>
								<div id={"result_" + task.id}
									 className={activeTab === "result" ? "tab-pane active" : "tab-pane"}>
									<textarea className="form-control result-textarea" placeholder="No result"
											  value={resultText}/>
								</div>
							</div>
						</div>
					</div>

					{isRunning &&
					<div className="widget-box-overlay">
						<i className="ace-icon loading-icon fa fa-spinner fa-spin fa-2x white"></i>
					</div>
					}
				</div>
			</div>
		)
	}

	// 下拉列表改变事件
	selectChanged(selected, options, textName) {
		let newState = {};
		console.log(selected, options, textName)
		if (options[selected]) {
			let template = options[selected].template;
			try {
				template = JSON.stringify(JSON.parse(template), null, 2);
			} catch (e) {
				console.log(e)
			}
			newState[textName] = template;
			this.setState(newState)
		} else {
			newState[textName] = "";
			this.setState(newState)
		}
	}

	// 打开设置对话框
	openSettings() {
		let {settings} = this.state;
		let message = `
			<div class="settings-row">
				<label>Parameter1：</label>
				<input id="parameter1" class="form-control" placeholder="Default Text" value="${settings.parameter1}"/>
			</div>
			<div class="settings-row">
				<label>Parameter2：</label>
				<input id="parameter2" class="form-control" placeholder="Default Text" value="${settings.parameter2}"/>
			</div>
		`;

		// eslint-disable-next-line no-undef
		bootbox.dialog({
			message,
			buttons: {
				"success": {
					"label": "<i class='ace-icon fa fa-check'></i> 确定",
					"className": "btn-sm btn-success",
					"callback": function () {
						this.setState({
							settings: {
								parameter1: $('#parameter1').val(),
								parameter2: $('#parameter2').val()
							}
						})
					}.bind(this)
				},
				"danger": {
					"label": "<i class='ace-icon fa fa-close'></i> 取消",
					"className": "btn-sm btn-danger"
				}
			}
		});
	}

	// 运行
	run() {
		let {inputText, filterText, outputText, settings} = this.state;

		this.showMask();

		// TODO 改成Ajax数据请求

		console.log(inputText, filterText, outputText, settings);

		setTimeout(() => {
			this.hideMask();
			this.showResultTab();
			console.log('run');
		}, 2000);

	}

	// 显示遮罩
	showMask() {
		this.setState({
			isRunning: true
		})
	}

	// 隐藏遮罩
	hideMask() {
		this.setState({
			isRunning: false
		})
	}

	// 显示结果Tab
	showResultTab() {
		this.setState({
			activeTab: 'result'
		})
	}

}
