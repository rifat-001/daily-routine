import { buildSubject } from '../components/components.js';

import { routine } from '../Ripository/RoutineRipository.js';

class SubjectHandler {
	init(_subjectElem) {
		this.subjectElem = _subjectElem;
		this.categoryElem = this.subjectElem.closest('.category');

		this.subject_id = this.subjectElem.getAttribute('subject-id');
		this.category_id = this.categoryElem.getAttribute('category-id');

		this.subjectData = routine.getSubject(this.category_id, this.subject_id);
		return this;
	}

	updateSubjectUI() {
		const newSubjectElem = buildSubject(this.subjectData);

		console.log(newSubjectElem);

		if (this.subjectElem.hasAttribute('open')) {
			newSubjectElem.setAttribute('open', true);
			newSubjectElem.removeAttribute('close');
		}

		console.log(newSubjectElem);

		const categoryContent =
			this.categoryElem.querySelector('.category-content');

		categoryContent.insertBefore(newSubjectElem, this.subjectElem);
		categoryContent.removeChild(this.subjectElem);

		this.subjectElem = newSubjectElem;
	}

	subjectCheckBoxHandler() {
		this.subjectData = routine.getSubject(this.category_id, this.subject_id);
		this.subjectData.status = !this.subjectData.status;

		this.subjectData.tasks = this.subjectData.tasks.map((task) => {
			task.status = this.subjectData.status;
			return task;
		});

		this.updateSubjectUI();
	}

	updateSubjectStatus() {
		let pendingTask = this.subjectData.tasks.reduce((cnt, task) => {
			return cnt + !task.status;
		}, 0);

		const prevStatus = this.subjectData.status;
		if (pendingTask == 0) this.subjectData.status = true;
		else this.subjectData.status = false;

		if (prevStatus != this.subjectData.status) this.updateSubjectUI();
	}
}

export const subjectHandler = new SubjectHandler();
