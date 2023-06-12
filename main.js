import {
	buildCategory,
	buildSubject,
	updateTaskUI,
} from './components/components.js';
import { RoutineRipository } from './Ripository/RoutineRipository.js';
import { subjectHandler } from './Controllers/SubjectController.js';

const routine = new RoutineRipository();

const categoryContainer = document.querySelector('.category-container');

const accordionHandler = (e) => {
	let target;
	if (e.target.hasAttribute('accordion-trigger')) {
		target = e.target.closest('div[accordion-header]');
	}

	if (!target) return;

	const targetValue = target.getAttribute('data-target');
	const targetListContainer = target.querySelector(
		`div[data-value="${targetValue}"]`
	);

	const accordionContent = target.querySelector('.accordion-content');
	console.log(accordionContent);
	if (!accordionContent) return;

	if (target.hasAttribute('close')) {
		target.removeAttribute('close');
		target.setAttribute('open', '');

		// testing
		accordionContent.classList.add('slide-down');
	} else {
		target.setAttribute('close', '');
		target.removeAttribute('open');
	}
};

function taskCheckBoxHandler(_task) {
	//console.log(_task);
	const subjectElem = _task.closest('.subject');
	const categoryElem = subjectElem.closest('.category');

	const subject_id = subjectElem.getAttribute('subject-id');
	const category_id = categoryElem.getAttribute('category-id');
	const task_id = _task.getAttribute('task-id');
	//console.log(task_id);

	// updating task data
	let newTask = routine.getTask(category_id, subject_id, task_id);
	newTask.status = !newTask.status;
	newTask = routine.updateTask(category_id, subject_id, task_id, newTask);

	//
	subjectHandler.init(subjectElem).updateSubjectStatus();
}

function checkboxHandler(e) {
	if (e.target.classList.contains('task-checkbox'))
		taskCheckBoxHandler(e.target.closest('.task'));
	else if (e.target.classList.contains('subject-checkbox')) {
		const subjectElem = e.target.closest('.subject');
		subjectHandler.init(subjectElem);
		subjectHandler.subjectCheckBoxHandler();
	}
}

categoryContainer.addEventListener('click', accordionHandler);
categoryContainer.addEventListener('change', checkboxHandler);

function init() {
	const data = routine.getAll();

	data.forEach((category) => {
		categoryContainer.appendChild(buildCategory(category));
	});
}

init();

document.addEventListener(
	'mousedown',
	function (event) {
		if (event.detail > 1) {
			event.preventDefault();
			// of course, you still do not know what you prevent here...
			// You could also check event.ctrlKey/event.shiftKey/event.altKey
			// to not prevent something useful.
		}
	},
	false
);
