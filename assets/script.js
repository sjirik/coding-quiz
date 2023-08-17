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
    showQuetions(0); 
    queCounter(1); 
}

let timeV =  60;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;


next_button.onclick = ()=>{
    if(que_count < questions.length - 1){ 
        que_count++; 
        que_numb++; 
        showQuetions(que_count); 
        queCounter(que_numb); 
        startTimer(timeV); 
        startTimerLine(widthValue); 
        timeText.textContent = "Time Left"; 
        next_button.classList.remove("show"); 
    }else{
        showResult(); 
    }
}


function showQuetions(index){
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
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';


function optionSelected(answer){
    let userAns = answer.textContent;
    let correcAns = questions[que_count].answer; 
    var allOptions = option_list.children.length; 
    if(userAns == correcAns){ 
        userScore += 1; 
        answer.classList.add("correct"); 
        answer.insertAdjacentHTML("beforeend", tickIconTag); 
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); 
        answer.insertAdjacentHTML("beforeend", crossIconTag); 
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){  
                option_list.children[i].setAttribute("class", "option correct"); 
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); 
    }
    next_button.classList.add("show"); 
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

function queCounter(index){
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    ques_counter.innerHTML = totalQueCounTag;
}