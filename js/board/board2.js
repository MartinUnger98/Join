let isDragging = false;
let startX;
let scrollLeft;

/**
 * This function pushes the detailed Task from right to the middle
 */
function pushDetailedTaskToMiddle() {
    let task = document.getElementById('detailedTask');
    task.classList.remove('d-none');
    setTimeout(function () {
        task.classList.add('show-task');
    }, 50); 
    showHiddenBackground();
    scrollToTop();
}


/**
 * This function shows the dark bachground by removing d-none
 */
function showHiddenBackground() {
    let bg = document.getElementById('bg');
    bg.classList.remove('d-none');
    document.body.classList.add('no-scroll');
}


/**
 * This function hides the dark background by adding d-none
 */
function hideBackground() {
    let bg = document.getElementById('bg');
    bg.classList.add('d-none');
    document.body.classList.remove('no-scroll');
}


/**
 * This function pushes the detailed Task back to the left
 */
function hideTasksOfBoard() {
    let task = document.getElementById('detailedTask');
    let boardAddTask = document.getElementById('board-addTask');
    if (task.classList.contains('show-task')) {
        task.classList.remove('show-task');
        hideDetailedTask();
    } else if (boardAddTask.classList.contains('show-task')) {
        boardAddTask.classList.remove('show-task');
        hideAddTask();
    }
}


/**
 * This function pushes the addTask-card to the right
 */
function hideAddTask() {
    let boardAddTask = document.getElementById('board-addTask');
    boardAddTask.classList.remove('show-task');
    setTimeout(function () {
        boardAddTask.classList.add('d-none');
    }, 200); 
    hideBackground();
    allMightyClear();
}


/**
 * This function pushes the detailed task card to the right
 */
function hideDetailedTask() {
    let task = document.getElementById('detailedTask');
    task.classList.remove('show-task');
    setTimeout(function () {
        task.classList.add('d-none');
    }, 200); 
    hideBackground();
}


/**
 * This function makes sure that the detailed Task is still clickable
 * @param {symbol} event 
 */
function doNotClose(event) {
    event.stopPropagation();
}


/**
 * This function is used to scroll up to the top of each detailed task
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}


/**
 * This function deletes the specifif task from the toDo-column und updates the local Storage
 * @param {number} i - specific number of detailed task (task) - used as id
 */
function deleteNote(i) {
    hideDetailedTask();
    tasks.splice(i, 1);
    saveTasks();
    loadBoard();
}


/**
 * This function starts the dragging-function a task
 * @param {*} id - id of task
 */
function startDragging(id) {
    currentDraggedElement = id;
    rotateTask(id);
    getCurrentdragObjektStatus(id);
}


/**
 * This function stops the dragging-function of a task
 * @param {number} id - id of task
 */
function stopDragging(id) {
    stopRotateTask(id);
    searchTask();
}


/**
 * This function gets the dragging position of a task
 * @param {number} id - id of task
 */
function getCurrentdragObjektStatus(id) {
    let position = idToPosition(tasks, id);
    let currentDragObjektStatus = tasks[position]['status'];
    showEmptyTasks(currentDragObjektStatus);
}


/**
 * This function shows the hidden tasks while dragging
 * @param {string} currentDragObjektStatus - task position status
 */
function showEmptyTasks(currentDragObjektStatus) {
    statusTasks.forEach(sTask => {
        if (currentDragObjektStatus !== sTask) {
            document.getElementById("emptyTask" + sTask).classList.remove("d-none");
        }
    });
}


/**
 * This function rotates a task while dragging
 * @param {number} id - id of task
 */
function rotateTask(id) {
    document.getElementById("task-" + id).classList.add("rotateTask");
}


/**
 * This function stops the rotation of a task
 * @param {number} id - id of task
 */
function stopRotateTask(id) {
    document.getElementById("task-" + id).classList.remove("rotateTask");
    statusTasks.forEach(sTask => {
        document.getElementById("emptyTask" + sTask).classList.add("d-none");
    });
}


/**
 * This function allows the dragging
 * @param {symbol} event 
 */
function allowDrop(event) {
    event.preventDefault();
}


/**
 * This function sets the move position of a dragged task
 * @param {string} status - status of task
 */
function moveTo(status) {
    let position = idToPosition(tasks, currentDraggedElement);
    tasks[position]['status'] = status;
    allMightyRender();
    saveTasks();
}


/**
 * This function pushes the addTask-card to the left
 */
function showHiddenAddTask() {
    let boardAddTask = document.getElementById('board-addTask');
    boardAddTask.classList.remove('d-none');
    setTimeout(function () {
        boardAddTask.classList.add('show-task');
    }, 50); 
    showHiddenBackground();
    scrollToTop();
}
document.addEventListener('DOMContentLoaded', function () {
    enableHorizontalScroll('scrollContainer1');
    enableHorizontalScroll('scrollContainer2');
    enableHorizontalScroll('scrollContainer3');
    enableHorizontalScroll('scrollContainer4');

});


/**
 * This function allows the horizontal scroll of tasks. 
 * Used for responsive
 * @param {string} containerId - id of columns
 * @returns 
 */
function enableHorizontalScroll(containerId) {
    const scrollContainer = document.getElementById(containerId);
    if (!scrollContainer) {
        console.error(`Element with ID '${containerId}' not found.`);
        return;
    }
    useMouseDown(scrollContainer);
    useMouseLeave(scrollContainer);
    useMouseUP(scrollContainer);
    useMouseMove(scrollContainer);
}


/**
 * Attaches a mousedown event listener to a scrollable container, enabling dragging behavior.
 *
 * @param {HTMLElement} scrollContainer - The scrollable container element.
 */
function useMouseDown(scrollContainer) {
    scrollContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - scrollContainer.offsetLeft;
        scrollLeft = scrollContainer.scrollLeft;
        scrollContainer.style.cursor = 'grabbing';
    });
}


/**
 * Attaches a mouseleave event listener to a scrollable container, enabling dragging behavior.
 *
 * @param {HTMLElement} scrollContainer - The scrollable container element.
 */
function useMouseLeave(scrollContainer) {
    scrollContainer.addEventListener('mouseleave', () => {
        isDragging = false;
        scrollContainer.style.cursor = 'grab';
    });
}


/**
 * Attaches a mouseup event listener to a scrollable container, enabling dragging behavior.
 *
 * @param {HTMLElement} scrollContainer - The scrollable container element.
 */
function useMouseUP(scrollContainer) {
    scrollContainer.addEventListener('mouseup', () => {
        isDragging = false;
        scrollContainer.style.cursor = 'grab';
    });
}


/**
 * Attaches a mousemove event listener to a scrollable container, enabling dragging behavior.
 *
 * @param {HTMLElement} scrollContainer - The scrollable container element.
 */
function useMouseMove(scrollContainer) {
    scrollContainer.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const x = e.pageX - scrollContainer.offsetLeft;
        const scrollSpeed = 1;
        const walk = (x - startX) * scrollSpeed;
        scrollContainer.scrollLeft = scrollLeft - walk;
    });
}


/**
 * This function searches the specific task
 */
function searchTask() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    if (input.length !== 0) {
        filterTasksByTitle(input);
    } else {
        allMightyRender();
    }
}


/**
 * This function filters the task titles
 * @param {string} input - id of input
 */
function filterTasksByTitle(input) {
    for (let i = 0; i < tasks.length; i++) {
        const taskTitle = tasks[i]['title'].toLowerCase();
        const taskDescription = tasks[i]['description'].toLowerCase();
        const id = tasks[i].id;
        const taskContainer = document.getElementById(`task-${id}`);
        if (!taskTitle.includes(input.toLowerCase()) && !taskDescription.includes(input.toLowerCase())) {
            hideTask(taskContainer);
        } else {
            showTask(taskContainer);
        }
    }
}

/**
 * This function hides all task, which are not matching
 * @param {string} taskContainer - id of task
 */
function hideTask(taskContainer) {
    if (taskContainer !== null) {
        taskContainer.classList.remove('d-flex');
        taskContainer.style.display = 'none';
    }
}


/**
 * This function show the matching tasks
 * @param {string} taskContainer - id of task
 */
function showTask(taskContainer) {
    if (taskContainer !== null) {
        taskContainer.classList.add('d-flex');
    }
}


/**
 * This function moves a task to the next column below
 * @param {number} id - id of task-card
 */
function getTaskBelow(id){
    currentDraggedElement = id;
    let currentStatus = tasks[idToPosition(tasks, id)].status;
    let status = statusTasks[statusTasks.indexOf(currentStatus) + 1];
    moveTo(status);
}


/**
 * This function moves a task card to the next column above
 * @param {*} id - id of task-card
 */
 function getTaskAbove(id) {
    currentDraggedElement = id;
    let currentStatus = tasks[idToPosition(tasks, id)].status;
    let status = statusTasks[statusTasks.indexOf(currentStatus) - 1];
    moveTo(status);
 }

