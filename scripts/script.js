$(document).ready(function()
{
    const question = $('#question span');
    const first_answer = $('#description-a');
    const second_answer = $('#description-b');
    const third_answer = $('#description-c');
    const fourth_answer = $('#description-d');
    let index = 1;
    let score = 0;

    function updateInformation(data)
    {
        question.text(data.question);
        first_answer.text(data.answers[0]);
        second_answer.text(data.answers[1]);
        third_answer.text(data.answers[2]);
        fourth_answer.text(data.answers[3]);
    }

    const checkAnswer = (correctAnswer, userAnswer) => {(userAnswer==correctAnswer) ? score+=1 : score+=0;}

    $.getJSON('questions.json', data => 
    {
        const number_of_questions = Object.keys(data).length;
        updateInformation(data[0]);

        $('button').click(event =>
        {
            if(index <= number_of_questions)
            {
                checkAnswer(data[index-1].correct_answer_index, event.target.id);
                console.log(score);

                if(index < number_of_questions)
                    updateInformation(data[index]);
                index++;
            }
        });
    });
});