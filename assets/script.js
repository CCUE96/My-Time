const currentDayEl = document.querySelector('#currentDay');
const plannerEl = document.querySelector('#planner');
const dailyMessageEl = document.querySelector('#dailyMessage');


// sources the current date and time
function updateTime() {
    let currentDate = dayjs();
// array for daily messages
    let messages = [
        'Happy Sunday',
        'Happy Monday ',
        'Happy Tuesday',
        'Happy Wednesday',
        'Happy Thursday',
        'Happy Friday',
        'Happy Saturday'
    ];
    const dayIndex = currentDate.day();
    dailyMessageEl.textContent = messages[dayIndex];
    // set the time with Month, Day, Years. Hours, Minutes, Seconds AM PM took out 
    currentDayEl.textContent = currentDate.format('MMMM DD YYYY hh:mm A');
}

// call the function and set the interval
updateTime();
setInterval(updateTime, 1000);

// array for different times meridian and a blank string for the reminders text box
let timeList = [


    { numberTime:9,
        time: '9:00', 
    meridian: 'am', 
    reminders: '' },

    { numberTime:10,
        time: '10:00',
     meridian: 'am',
      reminders: '' },

    { numberTime:11,
        time: '11:00',
     meridian: 'am',
      reminders: '' },

    { numberTime:12,
        time: '12:00',
     meridian: 'pm',
      reminders: '' },

    { numberTime:13,
        time: '1:00', 
    meridian: 'pm', 
    reminders: '' },
    
    {numberTime:14,
        time: '2:00',
     meridian: 'pm',
     reminders: '' },
    
    { numberTime:15,
      time: '3:00', 
      meridian: 'pm', 
      reminders: '' },
    
   {numberTime:16,
    time: '4:00', 
    meridian: 'pm',
    reminders: '' },
    
     { numberTime:17,
        time: '5:00',
      meridian: 'pm',
      reminders: '' },
     
];

function createTimeRows() {

    for (let i = 0; i < timeList.length; i++) {
        const timeIndex = timeList[i];

        const plannerList = document.createElement('div');
        plannerList.classList.add('time-block', 'row', 'no-gutters');

        // Create column for the time label
        const timeLabelColumn = document.createElement('div');
        timeLabelColumn.classList.add('col-lg-1', 'hour', 'justify-content-sm-end', 'pr-3', 'pt-3');
        timeLabelColumn.classList.add('time-label')
        // concatnates the 
        timeLabelColumn.textContent = timeIndex.time + ' ' + timeIndex.meridian;

        // Create column for the text area
        const textAreaColumn = document.createElement('div');
        textAreaColumn.classList.add('col');
        const plannerInput = document.createElement('textarea');
        plannerInput.classList.add('form-control', 'blockColor');
        // sets the planner input to the time index reminders ''
        plannerInput.value = timeIndex.reminders;
        plannerInput.setAttribute('data-time', timeIndex.time);
        textAreaColumn.appendChild(plannerInput);

 // Color coding based on time
const currentTime = dayjs().hour();
console.log(currentTime)
// event time =  dayjs(current time)timeindex time and merdian
const eventTime = dayjs(`${timeIndex.numberTime} ${timeIndex.meridian}`, 'h:mm A');
console.log(eventTime)
const hourDifference =currentTime - timeIndex.numberTime
console.log(hourDifference)
// if statement for coloring time boxes according to time
if (currentTime < timeIndex.numberTime) {
    console.log('hourDifference')
    plannerInput.style.backgroundColor = 'lightgreen';
    // console log the current time to test only present is working i will resubmit once working
    console.log("Future");
} else if (currentTime > timeIndex.numberTime ) {
    plannerInput.style.backgroundColor = 'violet'; 
    console.log("Past");
} else {
    plannerInput.style.backgroundColor = 'lightpink';
    console.log("Present");
}

        // Create column for the button
        const buttonColumn = document.createElement('div');
        // added bootstrap classes 
        buttonColumn.classList.add('col-auto');
        const saveButton = document.createElement('button');
        saveButton.classList.add('saveBtn', 'btn-block');
        saveButton.type = 'submit';
        // added a floppy to my button
        saveButton.textContent = '💾'; 

        // adds event listner to the current time
        saveButton.addEventListener('click', function () {
            const plannerReminder = plannerInput.value;
            alert('Reminder Set');
            const plannerTime = timeIndex.time;
            localStorage.setItem(plannerTime, plannerReminder);
        });

        buttonColumn.appendChild(saveButton);

        // Appends time text and buttons to the planner list
        plannerList.appendChild(timeLabelColumn);
        plannerList.appendChild(textAreaColumn);
        plannerList.appendChild(buttonColumn);

        // Appends the plannerlist to the html
        plannerEl.appendChild(plannerList);
    } 
}
// invoke function
createTimeRows();
// function to get Item from Local Storage
function getReminders() {
    for (let i = 0; i < timeList.length; i++) {
        const timeIndex = timeList[i];
        const plannerInput = document.querySelector(`textarea[data-time="${timeIndex.time}"]`);
        // local storage get item
        const savedReminder = localStorage.getItem(timeIndex.time);
        // if savedreminder value doesnt = nothing the planner input value = the saved reminder
        if (savedReminder !== null) {
            plannerInput.value = savedReminder;
        }
    }
}

// Call the function to populate saved reminders when the page loads
getReminders()