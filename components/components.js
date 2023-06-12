function buildElement(tag, classList) {
	const element = document.createElement(tag);
	element.classList.add(...classList);
	return element;
}

function buildImage(src, classList) {
	const image = buildElement('img', classList);
	image.setAttribute('src', src);
	return image;
}

function buildAddNewButton(title) {
	const button = buildElement('div', ['create-btn']);
	button.innerHTML = `
    <img src="assets/icons/plus.png" alt="" class="small-icon">
    <p>${title}</p>
    `;
	return button;
}

function buildTask(_task) {
	const _taskTitle = _task.title;
	const _status = _task.status;
	const _id = _task.id;
	// create all building block
	const task = buildElement('div', ['task']);
	const listMenu = buildElement('div', ['list-menu']);
	const listMenuLeft = buildElement('div', ['list-menu-left']);
	const listMenuRight = buildElement('div', ['list-menu-right']);

	const checkbox = buildElement('input', ['task-checkbox']);

	const taskTitle = buildElement('span', ['task-title']);
	const editIcon = buildImage('assets/icons/pencil.png', ['small-icon']);

	const option = buildImage('assets/icons/option.png', [
		'small-icon',
		'option',
	]);

	// changes according to the task status
	// if the task is completed then add some classes and attribute to change the ui
	if (_status) {
		checkbox.setAttribute('checked', true);
		task.classList.add('completed-task');
	}

	// assemble list-menu-left
	checkbox.setAttribute('type', 'checkbox');
	taskTitle.innerText = _taskTitle;
	taskTitle.setAttribute('contenteditable', true);
	listMenuLeft.append(checkbox, taskTitle, editIcon);

	// assemble list-menu-right
	listMenuRight.append(option);

	// assemble list-menu
	listMenu.append(listMenuLeft, listMenuRight);

	//assemble task
	task.setAttribute('task-id', _id);
	task.append(listMenu);

	return task;
}

// ========================================================================

function buildSubjectListMenu(_subjectName, _status) {
	// create all building block
	const listMenu = buildElement('div', ['list-menu']);
	const listMenuLeft = buildElement('div', ['list-menu-left']);
	const listMenuRight = buildElement('div', ['list-menu-right']);

	const checkbox = buildElement('input', ['subject-checkbox']);
	const subjectName = buildElement('span', ['category-name']);
	const editIcon = buildImage('assets/icons/pencil.png', ['small-icon']);

	const addTask = buildImage('assets/icons/add.png', [
		'small-icon',
		'add-task',
	]);
	const doc = buildImage('assets/icons/doc.png', ['small-icon', 'doc']);
	const arrow = buildImage('assets/icons/arrow.png', ['arrow', 'small-icon']);
	const option = buildImage('assets/icons/option.png', [
		'small-icon',
		'option',
	]);

	// changes according to the status
	// if the subject task is completed then add some classes and attribute to change the ui
	if (_status) {
		checkbox.setAttribute('checked', true);
		listMenu.classList.add('completed-subject');
	}

	// assemble list-menu-left
	checkbox.setAttribute('type', 'checkbox');
	subjectName.innerText = _subjectName;
	listMenuLeft.append(checkbox, subjectName, editIcon);

	// assemble list-menu-right
	arrow.setAttribute('accordion-trigger', true);
	listMenuRight.append(addTask, doc, arrow, option);

	// assemble list-menu
	listMenu.setAttribute('accordion-trigger', true);
	listMenu.append(listMenuLeft, listMenuRight);

	return listMenu;
}

// ========================================================================

export function buildCategoryListMenu(_categoryName) {
	// creating all building block
	const listMenu = buildElement('div', ['list-menu']);
	const listMenuLeft = buildElement('div', ['list-menu-left']);
	const listMenuRight = buildElement('div', ['list-menu-right']);

	const ListIcon = buildImage('assets/icons/category.png', ['medium-icon']);
	const categoryName = buildElement('span', ['category-name']);
	const editIcon = buildImage('assets/icons/pencil.png', ['small-icon']);

	const addTask = buildImage('assets/icons/add.png', [
		'medium-icon',
		'add-task',
	]);
	const arrow = buildImage('assets/icons/arrow.png', ['arrow', 'medium-icon']);
	const option = buildImage('assets/icons/option.png', [
		'medium-icon',
		'option',
	]);

	// assemble list-menu-left
	categoryName.innerText = _categoryName;
	listMenuLeft.append(ListIcon, categoryName, editIcon);

	// assemble list-menu-right
	arrow.setAttribute('accordion-trigger', true);
	listMenuRight.append(addTask, arrow, option);

	// assemble list-menu
	listMenu.setAttribute('accordion-trigger', true);
	listMenu.append(listMenuLeft, listMenuRight);

	return listMenu;
}

// ===================================================
// ============= Building Subject with all of its TASKS =======
//=======================================================

export function buildSubject(_subject) {
	const subject = buildElement('div', ['subject']);
	subject.setAttribute('data-target', _subject.id);
	subject.setAttribute('accordion-header', true);
	subject.setAttribute('close', true);
	// subject.setAttribute('accordion-open', true);

	const listMenu = buildSubjectListMenu(_subject.name, _subject.status);
	const subjectContent = buildElement('div', [
		'list-content',
		'subject-content',
		'accordion-content',
	]);
	subjectContent.setAttribute('data-value', _subject.id);

	_subject.tasks.forEach((task) => {
		subjectContent.appendChild(buildTask(task));
	});

	// assemble subject
	subject.setAttribute('subject-id', _subject.id);
	subject.append(listMenu, subjectContent);
	return subject;
}

// ===================================================
// ============= Building Category with all of its SUBJECTS =======
//=======================================================

export function buildCategory(_category) {
	const category = buildElement('div', ['category']);
	category.setAttribute('data-target', _category.id);
	category.setAttribute('accordion-header', true);
	category.setAttribute('close', true);

	const listMenu = buildCategoryListMenu(_category.name);
	const categoryContent = buildElement('div', [
		'list-content',
		'category-content',
		'accordion-content',
	]);
	categoryContent.setAttribute('data-value', _category.id);

	categoryContent.appendChild(buildAddNewButton('Create New Subject'));
	_category.subjects.forEach((subject) => {
		categoryContent.appendChild(buildSubject(subject));
	});

	// assemble category
	category.setAttribute('category-id', _category.id);
	category.append(listMenu, categoryContent);

	return category;
}

// ===============================================
// ================= Updating UI=====================
//==================================

export function updateSubjectUI(
	_categoryElement,
	_OldsubjectElement,
	_subjectData
) {
	const subject = buildSubject(_subjectData);
	subject.setAttribute('open', _OldsubjectElement.getAttribute('open'));
	subject.setAttribute('close', _OldsubjectElement.getAttribute('close'));

	const categoryContent = _categoryElement.querySelector('.category-content');

	categoryContent.insertBefore(subject, _OldsubjectElement);
	categoryContent.removeChild(_OldsubjectElement);
}

export function updateTaskUI(_subjectElement, _oldTaskElement, _taskData) {
	const task = buildTask(_taskData);
	const subjectContentElement =
		_subjectElement.querySelector('.subject-content');

	subjectContentElement.classList.add('paused');
	subjectContentElement.style.animationPlayState = 'paused';
	subjectContentElement.insertBefore(task, _oldTaskElement);
	subjectContentElement.removeChild(_oldTaskElement);
}
