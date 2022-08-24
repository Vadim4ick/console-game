(function () {
  const Question = function (question, answer, correct) {
    (this.question = question),
      (this.answer = answer),
      (this.correct = correct);
  };

  const questions = [];

  function makeQuestion(question, answer, correct) {
    const task = new Question(question, answer, correct);
    questions.push(task);
    return task;
  }

  makeQuestion(
    "Как зовут нашего куратора (Поток JS 19) ?)",
    {
      0: "Юрий",
      1: "Андрей",
      2: "Антон",
      3: "Павел",
    },
    0
  );

  makeQuestion(
    "Какой самый популярный вид спорта?",
    {
      0: "бокс",
      1: "футбол",
      2: "баскетбол",
      3: "волейбол",
    },
    1
  );

  makeQuestion(
    "Какой js фреймворк считается самым сложным?",
    {
      0: "Vue js",
      1: "React",
      2: "Angular",
      3: "Node.js",
    },
    2
  );

  makeQuestion(
    "Какого года открылась школа webcademy.ru",
    {
      0: 2010,
      1: 2011,
      2: 2012,
      3: 2013,
    },
    2
  );

  Question.prototype.displayAnswer = function () {
    console.log("%c " + this.question, "background-color: blue; color: white");
    for (let key in this.answer) {
      console.log(`${key}. ${this.answer[key]}`);
    }
  };

  Question.prototype.checkAnswer = function (request, callback) {
    //Счетчик правильных ответов.
    let score = 0;

    //Счетчик который нужен для перебора всех ответов текущего вопроса для дальнейшей проверки, если введено число от 0 до максимального значения текущего вопроса!
    let count = 0;
    for (let key in this.answer) {
      count++;
    }

    if (parseInt(request) >= 0 && parseInt(request) < count) {
      if (parseInt(request) === this.correct) {
        console.log("%c Вы ответили правильно!!", "background-color: green");
        score = callback(true);
      } else {
        console.log(
          "%c Вы ответили не правильно. Попробуйте еще раз!!",
          "background-color: orange"
        );
        score = callback(false);
      }
      this.displayScore(score);
    } else {
      if (request !== null && request !== "exit") {
        console.log(
          "%c У меня нет такого варианта ответа, будь внимательнее.",
          "background-color: yellow"
        );
      } else {
        console.log("%c Выхожу из игры", "background-color: yellow");
      }
    }
  };

  Question.prototype.displayScore = function (score) {
    console.log(
      `%c Ваш счет равен ${score}`,
      "background-color: red; color: white"
    );
  };

  function score() {
    let scoreValue = 0;
    return function (correct) {
      if (correct) {
        scoreValue++;
      } else {
        scoreValue--;
      }
      return scoreValue;
    };
  }

  const keepScore = score();

  function nextQuestions() {
    const n = Math.floor(Math.random() * questions.length);

    questions[n].displayAnswer();

    const request = prompt("Введите номер правильного ответа.");

    questions[n].checkAnswer(request, keepScore);

    if (request !== null && request !== "exit") {
      nextQuestions();
    }
  }

  nextQuestions();
})();

function startGame() {
  // Получаем случайное число для вывода случайного вопроса из массива вопросов
  let randomIndex = Math.floor(Math.random() * arrayOfQuestions.length);
  // показываем случайный вопрос
  arrayOfQuestions[randomIndex].showQuestion();
  // Создаем переменную для записи ответа от пользователя
  let answerOfUser = prompt("Введите номер верного ответа:");
  // Запускаем у случайного объекта проверку на правильный ответ
  arrayOfQuestions[randomIndex].checkAnswer(answerOfUser);
  if (answerOfUser === "exit" || !answerOfUser) {
    startGame();
  }
}
startGame();
