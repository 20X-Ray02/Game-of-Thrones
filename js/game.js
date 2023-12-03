//Gолучениt ссылок на HTML-элементы с определенными идентификаторами, чтобы в дальнейшем обеспечивать взаимодействие с содержимым веб-страницы через JavaScript.
const gameContainer = document.getElementById("game-container");
const storyElement = document.getElementById("story");
const choicesElement = document.getElementById("choices");

//Отслеживание текущего состояния
let gameState = {
    questionIndex: 0, //индекс текущего вопроса в массиве
    answers: [],      //хранение ответов
};


//Массив вопросов и вариантов ответов.
const storyQuestions = [
    {
        question: "Выберите замок своего дома:",
        image: "img/castle.jpg",
        options: ["Утёс Кастерли", "Винтерфелл", "Хайгарден"],
    },
    {
        question: "После рождения драконов магия во всём мире, которую все считали угасшей, стала становиться сильнее. Это заметили Колдуны Кварта, чья сила после появления в их городе Дейнерис и драконов начала расти. Реакция на прибытие драконов:",
        image: "img/dragons.jpg",
        options: ["Подчиниться Матери Драконов", "Остаться в стороне", "Попытаться использовать драконов"],
    },
    {
        question: "Выбор союзника:",
        image: "img/homes.jpg",
        options: ["Ланнистеры", "Тиреллы", "Баратеоны"],
    },
    {
        question: "Какой бы вы использовали подход к войне:",
        image: "img/change.jpg",
        options: ["Дипломатия", "Сила", "Смешанный подход"],
    },
    {
        question: "Вашего союзника обвиняют в измене, что будем делать?:",
        image: "img/traitor.jpeg",
        options: ["Защитить его и разоблачить предателя", "Покинуть его и заключить союз с обвинителем", "Взять сторону того, кто обещает больше выгод"],
    },
    {
        question: "Выберите стиль правления:",
        image: "img/style.png",
        options: ["Справедливый и милосердный", "Жестокий и беспощадный", "Хитрый и изворотливый"],
    },
    {
        question: "Отношение к новому претенденту на престол:",
        image: "img/thron.jpeg",
        options: ["Присягнуть на верность", "Организовать заговор против него", "Поддержать его, чтобы использовать в своих интересах"],
    },
    {
        question: "Отношение к религиозным вопросам?:",
        image: "img/religia.jpeg",
        options: ["Стать последователем религии", "Использовать религию для достижения своих целей", "Остаться равнодушным к религиозным делам"],
    },
    {
        question: "Реакция на вражескую атаку:",
        image: "img/war.jpg",
        options: ["Организовать оборону и сражаться до последнего", "Попыться найти компромисс и избежать войны", "Найти поддержку у других домов и объединить усилия"],
    },
    {
        question: "Итоговый выбор:",
        image: "img/end.jpeg",
        options: ["Бороться за власть", "Поддаться силе драконов и стать верным слугой", "Остаться в тени, управляя из тени", "Отправиться за стену, ища новые приключения"],
    },
];

//Отображение текущего вопроса и вариантов ответов
function renderQuestion() {
    const currentQuestion = storyQuestions[gameState.questionIndex]; //получает текущий вопрос из массива на основе текущего индекса вопроса.
    storyElement.innerHTML = "";                                     //очищает содержимое блока
  
    // Добавим изображение к вопросу
    const questionImage = document.createElement("img");
    questionImage.src = currentQuestion.image;
    questionImage.style.maxWidth = "100%";
    storyElement.appendChild(questionImage);
  
    // Добавим текст вопроса
    const questionText = document.createElement("p");               //создает элемент абзаца (<p>), который будет содержать текст вопроса
    questionText.textContent = currentQuestion.question;            //устанавливает текст вопроса в содержимое элемента абзаца
    storyElement.appendChild(questionText);                         //добавляет элемент абзаца с текстом вопроса в storyElement
  
    choicesElement.innerHTML = "";
  
    //Создание кнопки для каждого варианта ответа
    currentQuestion.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.addEventListener("click", () => handleChoice(index));
      choicesElement.appendChild(button);
    });
}

//Функция для выбора
function handleChoice(index) {
    gameState.answers.push(index); //Записываем выбранный ответ

    //проверяет, не является ли текущий вопрос последним в массиве вопросов. Если не является, то увеличивает индекс вопроса и вызывает функцию renderQuestion(), чтобы отобразить следующий вопрос.
    if (gameState.questionIndex < storyQuestions.length - 1) {
        gameState.questionIndex++;
        renderQuestion();
    } 
    else {
        displayEnding();
    }
}


//Функции для отображения различных концовок
function showEndingA() {
    storyElement.textContent = "Конец игры. Вы стали правителем, славным за свою справедливость.";
    choicesElement.innerHTML = "";
}

function showEndingB() {
    storyElement.textContent = "Конец игры. Вы поддались силе драконов и стали верным слугой.";
    choicesElement.innerHTML = "";
}

function showEndingC() {
    storyElement.textContent = "Конец игры. Вы остались в тени, манипулируя событиями из тени.";
    choicesElement.innerHTML = "";
}

function showEndingD() {
    storyElement.textContent = "Конец игры. Вы бросили свое владение и отправились в изгнание, ища новые приключения.";
    choicesElement.innerHTML = "";
}

function showEndingDefault() {
    storyElement.textContent = "Конец игры. Ваши действия оставили след в истории, но их последствия остаются неясными.";
    choicesElement.innerHTML = "";
}


//Отображение концовок игры
function displayEnding() {
    switch (true) {
        case (gameState.answers[0] === 1 || gameState.answers[0] === 2) && (gameState.answers[3] === 1 || gameState.answers[3] === 2) && (gameState.answers[5] === 0 || gameState.answers[5] === 2) && gameState.answers[9] === 0:
            showEndingA();
            break;

        case gameState.answers[0] === 0 && gameState.answers[1] === 2:
        case gameState.answers[3] === 1 && gameState.answers[1] === 2:
        case gameState.answers[9] === 1 && (gameState.answers[1] === 2 || gameState.answers[0] === 1):
            showEndingB();
            break;

        case gameState.answers[2] === 0 && gameState.answers[3] === 0:
        case gameState.answers[2] === 0 && gameState.answers[3] === 1:
        case gameState.answers[2] === 0 && gameState.answers[3] === 2:
        case gameState.answers[5] === 0 && gameState.answers[6] === 1:
        case gameState.answers[7] === 2 && gameState.answers[8] === 1:
        case gameState.answers[9] === 1 && gameState.answers[1] === 0:
            showEndingC();
            break;

        case gameState.answers[2] === 1 && gameState.answers[4] === 2:
        case gameState.answers[2] === 1 && gameState.answers[4] === 1:
        case gameState.answers[5] === 1 && gameState.answers[6] === 2:
        case gameState.answers[7] === 0 && gameState.answers[8] === 0:
        case gameState.answers[9] === 2 && gameState.answers[1] === 1: 
            showEndingD();
            break;

        default:
            showEndingDefault();
    }
}


renderQuestion();