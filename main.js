const hours_display = document.querySelector('.hours');
const minutes_display = document.querySelector('.minutes');
const seconds_display = document.querySelector('.seconds');
const session_time_display = document.querySelector('#session-time');
const break_time_display = document.querySelector('#break-time');
const session_up = document.querySelector('#session-up');
const break_up = document.querySelector('#break-up');
const session_down = document.querySelector('#session-down');
const break_down = document.querySelector('#break-down');
const status = document.querySelector('#status');
const play_button = document.querySelector('#play-btn');
const pause_button = document.querySelector('#pause-btn');
const stop_button = document.querySelector('#stop-btn');
const ticker = new Audio('beep.mp3');




let session_length = 1200;
let break_length = 600;

let time = session_length;
let time_running = false;

let on_break = false;
let on_pause = false;
let on_stop = false;

let current_session_time;
let current_break_time;
let timer_id;

function display_time(){
  // represents the time to screen board
  let hours = Math.floor(time/3600);
  let mins = Math.floor((time%3600)/60);
  let secs = time%60;
  if (hours<10){hours = convert_single_digit(hours)}
  if (mins<10){mins = convert_single_digit(mins)}
  if (secs<10){secs = convert_single_digit(secs)}
  hours_display.textContent = hours;
  minutes_display.textContent = mins;
  seconds_display.textContent = secs;

}

function display_time_options(){
  //represent timing of control options
  session_time_display.textContent = Math.floor(session_length/60)
  break_time_display.textContent = Math.floor(break_length/60);
}
display_time_options();

function convert_single_digit(num){
  // adds a zero before a single digit
  return "0"+num;
}

function set_time(){
  //set session and break timings
  
  //increase session time
  session_up.addEventListener('click',()=>{
    if(time_running)return;
    session_length += 60;
    display_time_options();
    if(!on_break && !on_pause){
      time = session_length;
      display_time();
    }
  });

  //increase break time
    break_up.addEventListener('click',()=>{
    if(time_running)return;
    break_length += 60;
    display_time_options();
    if(on_break && !on_pause){
      time = break_length;
      display_time();
    }  
  });

  //decrease session time
    session_down.addEventListener('click',()=>{
    if(time_running || time <= 61)return;
    session_length -= 60;
    display_time_options();
    if(!on_break && !on_pause){
      time = session_length;
      display_time();
    }
  });

  //decrease break time
    break_down.addEventListener('click',()=>{
    if(time_running || break_length <= 61)return;
    break_length -= 60;
    display_time_options();
    if(on_break && !on_pause){
      time = break_length;
      display_time();
    } 
  });
}

function count_down(){
  time_running = true;
  time--;
  display_time();
  if (time <= 5){ticker.play();}
  if (time === 0 && on_break == false)take_a_break();
  if (time === 0 && on_break == true ){
    time = current_session_time;
    on_break = false;
    set_status();
  }
}

function take_a_break(){
  time = current_break_time;
  on_break = true;
  set_status();
}

function set_status(){
  if(on_break){
    status.textContent = 'Break Time'
  }else{
    status.textContent = 'Work Time'
  }
}

function play(){
    current_session_time = session_time_display.textContent*60;
    current_break_time = break_time_display.textContent*60;
    on_pause = false;
    on_stop = false;
    run_time();
    play_button.classList.add("active_blue");
    pause_button.classList.remove('active_blue');
    stop_button.classList.remove('active_red');
    // play_button.style.backgroundColor = 'blue';
    // pause_button.style.backgroundColor = 'yellow';
    // stop_button.style.backgroundColor = 'yellow';

}

function pause(){
  if(time_running){
    clearInterval(timer_id);
    time_running = false;
    on_pause = true;
    on_stop = false;
    // play_button.style.backgroundColor = 'yellow';
    // pause_button.style.backgroundColor = 'blue';
    // stop_button.style.backgroundColor = 'yellow';
    play_button.classList.remove("active_blue");
    pause_button.classList.add('active_blue');
    stop_button.classList.remove('active_red');
  }
}

function stop(){
  clearInterval(timer_id);
  time_running = false;
  on_pause = false;
  on_stop = true;
  if (on_break){
    time = break_time_display.textContent*60;    
  }else{
    time = session_time_display.textContent*60;
  }
  // play_button.style.backgroundColor = 'yellow';
  // pause_button.style.backgroundColor = 'yellow';
  // stop_button.style.backgroundColor = 'red';
  play_button.classList.remove("active_blue");
  pause_button.classList.remove('active_blue');
  stop_button.classList.add('active_red');
  display_time();
  set_status();
}

function run_time(){
  if(time_running)return;
  timer_id = setInterval(count_down,1000);
}



display_time();
set_time();
play_button.addEventListener('click',play);
pause_button.addEventListener('click',pause);
stop_button.addEventListener('click',stop);

