import {
	buildSubject,
	buildCategory,
	updateCategory,
} from '../components/components.js';

import { routine } from '../Ripository/RoutineRipository.js';

class SubjectHandler {
	init(_subjectElem) {
		this.subjectElem = _subjectElem;
		this.categoryElem = this.subjectElem.closest('.category');

		this.subject_id = this.subjectElem.getAttribute('subject-id');
		this.category_id = this.categoryElem.getAttribute('category-id');

		this.subjectData = routine.getSubject(this.category_id, this.subject_id);
		// console.log(this.category_id, this.subject_id, this.subjectData);
		console.log('from init');
		console.log(routine.getAll());
		return this;
	}

	updateSubjectUI() {
		const newSubjectElem = buildSubject(this.subjectData);

		if (this.subjectElem.hasAttribute('open')) {
			newSubjectElem.setAttribute('open', true);
			newSubjectElem.removeAttribute('close');
		}

		const categoryContent =
			this.categoryElem.querySelector('.category-content');

		categoryContent.insertBefore(newSubjectElem, this.subjectElem);
		categoryContent.removeChild(this.subjectElem);

		this.subjectElem = newSubjectElem;
	}

	subjectCheckBoxHandler() {
		this.subjectData.status = !this.subjectData.status;

		this.subjectData.tasks = this.subjectData.tasks.map((task) => {
			task.status = this.subjectData.status;
			return task;
		});

		this.subjectData = routine.updateSubject(
			this.category_id,
			this.subject_id,
			this.subjectData
		);

		this.updateSubjectUI();
	}

	updateSubjectStatus() {
		let pendingTask = this.subjectData.tasks.reduce((cnt, task) => {
			return cnt + !task.status;
		}, 0);

		const prevStatus = this.subjectData.status;
		if (pendingTask == 0) this.subjectData.status = true;
		else this.subjectData.status = false;

		if (prevStatus != this.subjectData.status) {
			routine.updateSubject(
				this.category_id,
				this.subject_id,
				this.subjectData
			);
			this.updateSubjectUI();
		}
	}

	addSubject(_category, _data) {
		const subjectData = { tasks: [] };

		_data.inputs.forEach((input) => {
			if (input.type == 'checkbox') subjectData[input.name] = input.status;
			else subjectData[input.name] = input.value;
		});

		routine.insertSubject(_category.id, subjectData);
		const newCategory = buildCategory(_category);
		updateCategory(_category.id, newCategory);
		// console.log(_category);
	}

	prepareSubjectModal(_category_id, _modalType) {
		const category = routine.getCategory(_category_id);
		const instance = this;
		const data = {
			modalTitle: `Add New Subject To <b>${category.name} <b>`,
			saveButtonHandler: this.addSubject.bind(instance, category),
			inputs: [
				{
					name: 'name',
					type: 'text',
					title: 'Subject Name',
					value: _modalType == 'edit' ? this.subjectData.name : '',
				},
				{
					name: 'makeItPermanent',
					type: 'checkbox',
					title: 'Make it permanent',
					status: false,
				},
				{
					name: 'status',
					type: 'checkbox',
					title: 'Mark as done',
					status: false,
				},
			],
		};

		return data;
	}
}

export const subjectHandler = new SubjectHandler();
