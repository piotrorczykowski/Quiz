$(document).ready(function()
{
    const question = $('#question span');
    const first_answer = $('#description-a');
    const second_answer = $('#description-b');
    const third_answer = $('#description-c');
    const fourth_answer = $('#description-d');
    const which_question = $('#which-question');
    const max_question = $('#max-question');
    let score = 0;

    function updateInformation(data)
    {
        question.text(data.question);
        first_answer.text(data.answers[0]);
        second_answer.text(data.answers[1]);
        third_answer.text(data.answers[2]);
        fourth_answer.text(data.answers[3]);
    }

    const updateProgress = (index, maxOfQuestion) => { which_question.text(index); max_question.text(maxOfQuestion); }
    const checkAnswer = (correctAnswer, userAnswer) => { (userAnswer==correctAnswer) ? score+=1 : score+=0; }

    $.getJSON('questions.json', data => 
    {
        let index = 1;
        const number_of_questions = Object.keys(data).length;
        updateInformation(data[0]);
        updateProgress(index, number_of_questions);

        $('button').click(event =>
        {
            if(index <= number_of_questions)
            {
                checkAnswer(data[index-1].correct_answer_index, event.target.id);
                console.log(index);
                console.log(score);

                if(index < number_of_questions)
                {
                    updateInformation(data[index]);
                    index++;
                    updateProgress(index, number_of_questions);
                }
            }
        });
    })
    .fail(function()
    {
        console.log('File not found!');
    });
});