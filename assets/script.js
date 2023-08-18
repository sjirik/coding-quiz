var beginQuiz = document.querySelector(".begin button");
var containerOne = document.querySelector(".container_one");
var continueOne = containerOne.querySelector(".buttons .continue");
var containerTwo = document.querySelector(".container_two");
var results = document.querySelector(".results");
var option_list = document.querySelector(".answer_list");
var time_line = document.querySelector(".time_line");
var timeText = document.querySelector(".time_left");
var timeCount = document.querySelector(".timer .time_sec");

beginQuiz.onclick = ()=>{
    containerOne.classList.add("activeInfo"); 
    startTimer(60); 
    startTimerLine(0)
}


continueOne.onclick = ()=>{
    containerOne.classList.remove("activeInfo"); 
    containerTwo.classList.add("activeQuiz"); 
    showQuestion(0); 
    queCount(1); 
}

let timeV =  60;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

var restart_q = results.querySelector(".buttons .restart");
var quit_q = results.querySelector(".buttons .quit");

restart_q.onclick = ()=>{
    containerTwo.classList.add("activeQuiz"); 
    results.classList.remove("activeResult"); 
    timeV = 60; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuestion(que_count); 
    queCount(que_numb); 
    clearInterval(counter);
    startTimer(60);
    startTimerLine(0);
    timeText.textContent = "Time Left"; 
    next_button.classList.remove("show"); 
}


quit_q.onclick = ()=>{
    window.location.reload(); 
}

var next_button = document.querySelector(".next");
var ques_counter = document.querySelector(".questions_left");


next_button.onclick = ()=>{
    if(que_count < questions.length - 1){ 
        que_count++; 
        que_numb++; 
        showQuestion(que_count); 
        queCount(que_numb); 
        timeText.textContent = "Time Left"; 
        next_button.classList.remove("show"); 
    }else{
        showResults(); 
    }
}


function showQuestion(index){
    var que_text = document.querySelector(".question_text");
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; 
    option_list.innerHTML = option_tag; 
    var option = option_list.querySelectorAll(".option");
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionS(this)");
    }
}

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';


function optionS(answer){
    let userAns = answer.textContent;
    let correcAns = questions[que_count].answer; 
    var allOptions = option_list.children.length; 
    if(userAns == correcAns){ 
        userScore += 1; 
        answer.classList.add("correct"); 
        answer.insertAdjacentHTML("beforeend", tickIcon); 
    }else{
        answer.classList.add("incorrect"); 
        answer.insertAdjacentHTML("beforeend", crossIcon); 
        }
        
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); 
    }
    next_button.classList.add("show"); 
}

function showResults(){
    containerOne.classList.remove("activeInfo"); 
    containerTwo.classList.remove("activeQuiz"); 
    results.classList.add("activeResult"); 
    const scoreText = results.querySelector(".score_text");
    if (userScore > 1){ 
        let scoreTag = 'Hooray! You got '+ userScore +' out of '+ questions.length +'!';
        scoreText.innerHTML = scoreTag;
    }
    else{ 
        let scoreTag = 'Oops! You got only '+ userScore +' out of '+ questions.length +'!';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; 
        time--; 
        if(time < 9){ 
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; 
        }
        if(time < 0){ 
            clearInterval(counter); 
            timeText.textContent = "Time Off"; 
            const allOptions = option_list.children.length; 
            let correcAns = questions[que_count].answer; 
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); 
            }
            next_button.classList.add("show"); 
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 60);
    function timer(){
        time += 1;
        time_line.style.width = time + "px"; 
        if(time > 549){ 
            clearInterval(counterLine); 
        }
    }
}

function queCount(index){
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    ques_counter.innerHTML = totalQueCounTag;
}