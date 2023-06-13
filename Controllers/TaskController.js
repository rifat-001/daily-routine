import { buildTask } from '../components/components.js';

import { routine } from '../Ripository/RoutineRipository.js';

import { subjectHandler } from './SubjectController.js';

class TaskHandler {
	init(_taskElem) {
		this.taskElem = _taskElem;
		this.subjectElem = this.taskElem.closest('.subject');
		this.categoryElem = this.subjectElem.closest('.category');

		this.subject_id = this.subjectElem.getAttribute('subject-id');
		this.category_id = this.categoryElem.getAttribute('category-id');
		this.task_id = this.taskElem.getAttribute('task-id');

		this.taskData = routine.getTask(
			this.category_id,
			this.subject_id,
			this.task_id
		);
	}

	updateTaskUI() {
		if (this.taskData == undefined) return;
		const newTask = buildTask(this.taskData);
		const subjectContentElement =
			this.subjectElem.querySelector('.subject-content');

		subjectContentElement.insertBefore(newTask, this.taskElem);
		subjectContentElement.removeChild(this.taskElem);
	}

	taskCheckBoxHandler() {
		if (this.taskData == undefined) return;
		this.taskData.status = !this.taskData.status;

		// updating ui
		subjectHandler.init(this.subjectElem);
		this.updateTaskUI();
		subjectHandler.updateSubjectStatus();
	}
}

export const taskHandler = new TaskHandler();
