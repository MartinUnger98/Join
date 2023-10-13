let numberOfTasks = 0;
let tasksInProgress = 0;
let taskAwaitingFeedback = 0;
let urgentTasks = 0;
let toDos = 0;
let done = 0;
const monthsInEnglish = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let deadlines = [];

/**
 * This function switches the img of the tabs
 * @param {string} path - img path
 */
function changeIcon(path){
    if (path === '../img/pencil-white-summary.svg') {
        let img = document.getElementById('toDoImg');
        img.src = path;
    }
    else if (path === '../img/check_white_summary.svg') {
        let img = document.getElementById('doneImg');
        img.src = path;
    }
}


/**
 * This function switches the img of the tabs back
 * @param {string} path - img path
 */
function changeIconBack(path){
    if (path === '../img/pencil-blue-summary.svg') {
        let img = document.getElementById('toDoImg');
        img.src = path;
    }
    else if (path === '../img/check-blue-summary.svg') {
        let img = document.getElementById('doneImg');
        img.src = path;
    }
}


/**
 * This function updates the greeting phrase of each logged in user
 */
function updateGreeting() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const greetingDiv = document.getElementById('greetingContainer');   

    if (currentHour >= 0 && currentHour < 12) {
        greetingDiv.innerHTML = 'Good morning,';
    } else if (currentHour >= 12 && currentHour < 18) {
        greetingDiv.innerHTML = 'Good afternoon,';
    } else {
        greetingDiv.innerHTML = 'Good evening,';
    }
}

/**
 * This function initializes the whole summary page
 */
async function summaryInit(){
    await init();
    updateGreeting();
    showUser();
    countTasksInBoard();
    countTasks('numberOftaskInProgress', 'inProgress', tasksInProgress, 'status');
    countTasks('numberOftaskFeedback', 'awaitFeedback', taskAwaitingFeedback, 'status');
    countTasks('numberOfToDO', 'toDo', toDos, 'status');
    countTasks('numberOfDone', 'taskDone', done, 'status');
    countTasks('numberOfUrgent', 'Urgent', urgentTasks, 'priority'); 
    changeDeadline();
}


/**
 * This function counts the amount of existing tasks in board.html
 */
function countTasksInBoard(){
    let taskInBoardContainer = document.getElementById('numberOftaskInBoard');
    numberOfTasks = tasks.length;
    taskInBoardContainer.innerHTML = `${numberOfTasks}`;
}


/**
 * This function shows the logged in user
 */
function showUser(){
    let userBox = document.getElementById('greetLoggedInUser');
    userBox.innerHTML = loggedInUser;
}


/**
 * This function counts the specific tasks 
 * @param {string} containerId - id of summary counter
 * @param {string} status -id of column in board
 * @param {string} taskNumber - tasks in each column
 * @param {array} arrayCategory - array of status of each task
 */
function countTasks(containerId, status, taskNumber, arrayCategory){
    let container = document.getElementById(containerId);
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        if (task[arrayCategory] == status) {
            taskNumber++
        }
    }
    container.innerHTML = taskNumber;
}


/**
 * This function updates the deadline of the next task
 */
function changeDeadline(){
    for (let i = 0; i < tasks.length; i++) {
        const date = tasks[i]['date'];
        deadlines.push(date);
    }
    deadlines = sortDates(deadlines);
    changeDeadlineFormat();
}


/**
 * This function sorts the dates of each task
 * @param {string} dates - all dedalines of each task
 */
function sortDates(dates) {
    return dates.sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
  
      if (dateA < dateB) {
        return -1;
      }
      if (dateA > dateB) {
        return 1;
      }
      return 0;
    });
  }


  /**
   * This function changes the format of each deadline
   */
  function changeDeadlineFormat(){
    let deadLineContainer = document.getElementById('upcomingDeadline');
    let upcomigDeadline = deadlines[0];
    let date = new Date(upcomigDeadline)
    let day = date.getDate();
    let monthNumber = date.getMonth();
    let year = date.getFullYear();
    let month = monthsInEnglish[monthNumber];
    deadLineContainer.innerHTML = `${month} ${day}, ${year}`;

  }