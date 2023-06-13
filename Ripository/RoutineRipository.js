export class RoutineRipository {
	constructor() {
		const defaultData = [
			{
				name: 'Math',
				id: 1,
				subjects: [
					{
						name: 'Algebra',
						id: 1,
						status: true,
						tasks: [
							{
								title: 'Chapter 4',
								id: 1,
								status: false,
							},
							{
								title: 'Chapter 5',
								id: 2,
								status: true,
							},
						],
					},
					{
						name: 'Coding',
						id: 2,
						status: true,
						tasks: [
							{
								title: 'Chapter 4',
								id: 1,
								status: false,
							},
							{
								title: 'Chapter 5',
								id: 2,
								status: true,
							},
						],
					},
				],
			},
			{
				name: 'English',
				id: 2,
				subjects: [
					{
						name: 'Algebra',
						id: 1,
						status: true,
						tasks: [
							{
								title: 'Chapter 4',
								id: 1,
								status: false,
							},
							{
								title: 'Chapter 5',
								id: 2,
								status: true,
							},
						],
					},
					{
						name: 'Coding',
						id: 2,
						status: true,
						tasks: [
							{
								title: 'Chapter 4',
								id: 1,
								status: false,
							},
							{
								title: 'Chapter 5',
								id: 2,
								status: true,
							},
						],
					},
				],
			},
		];

		if (!localStorage.routine)
			localStorage.setItem('routine', JSON.stringify(defaultData));
		this.data = JSON.parse(localStorage.routine);
		console.log(this.data);
	}
	getAll() {
		return this.data;
	}

	updateState() {
		localStorage.setItem('routine', JSON.stringify(this.data));
	}

	getCategory(_id) {
		let category = -1;
		this.data.forEach((_category, _idx) => {
			if (_category.id == _id) {
				category = _category;
				return;
			}
		});
		return category;
	}

	getSubject(_category_id, _subject_id) {
		const category = this.getCategory(_category_id);
		if (category == -1) return -1;

		let subject = -1;
		console.log(category.subjects);
		category.subjects.forEach((_subject, _idx) => {
			if (_subject.id == _subject_id) {
				subject = _subject;
				return;
			}
		});
		// console.log(category, subject);
		return subject;
	}

	getTask(_category_id, _subject_id, _task_id) {
		const subject = this.getSubject(_category_id, _subject_id);

		if (subject == -1) return -1;

		let task;

		subject.tasks.forEach((_task, _idx) => {
			if (_task.id == _task_id) {
				_task.idx = _idx;
				task = _task;
				return;
			}
		});

		return task;
	}

	updateTask(_category_id, _subject_id, _task_id, _newTask) {
		//get subject by reference
		const subject = this.getSubject(_category_id, _subject_id);

		if (subject == -1) return -1;

		// assign new task id with the previous one
		_newTask.id = _task_id;

		if (subject.tasks != undefined) {
			subject.tasks = subject.tasks.map((_task) => {
				if (_task.id == _task_id) {
					return _newTask;
				}
				return _task;
			});
		}
		this.updateState();
		return _newTask;
	}

	updateSubject(_category_id, _subject_id, _newSubject) {
		const category = this.getCategory(_category_id);

		if (category == -1) return -1;

		_newSubject.id = _subject_id;
		_newSubject.tasks = _newSubject.tasks.map((task) => {
			task.status = _newSubject.status;
			return task;
		});

		category.subjects = category.subjects.map((_subject) => {
			if (_subject.id == _subject_id) {
				return _newSubject;
			}
			return _subject;
		});

		this.updateState();
		return { ..._newSubject };
	}

	insertSubject(_category_id, _subjectData) {
		const category = this.getCategory(_category_id);
		_subjectData.id = category.subjects.length + 1;

		category.subjects.push(_subjectData);
		this.updateState();

		return _subjectData;
	}
}

export const routine = new RoutineRipository();
