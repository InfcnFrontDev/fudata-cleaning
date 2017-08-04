import {action, autorun, computed, observable, reaction, runInAction} from "mobx";
import _ from "lodash";

/**
 * 存储Task状态
 */
class TaskStore {
	@observable tasks = [{
		id: 0
	}];

	@action addTask() {
		this.tasks.push({
			id: _.uniqueId()
		})
	}
}

const taskStore = new TaskStore();
export default taskStore
