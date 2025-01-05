// Preguntas del quiz
const questions = [
    {
        id: 1,
        expression: "true && false",
        result: false,
        difficulty: "Básico",
        explanation: `
        1. El operador && (AND) devuelve true solo si ambos operandos son true
        2. En este caso: 
           - Primer operando: true
           - Segundo operando: false
        3. Como uno de los operandos es false, el resultado final es false
        `,
    },
    {
        id: 2,
        expression: "!false",
        result: true,
        difficulty: "Básico",
        explanation: `
        1. El operador ! (NOT) invierte el valor booleano
        2. En este caso:
           - Operando: false
           - Al aplicar NOT (!), se invierte a true
        3. Por lo tanto, !false es igual a true
        `,
    },
    {
        id: 3,
        expression: "true || false",
        result: true,
        difficulty: "Básico",
        explanation: `
        1. El operador || (OR) devuelve true si al menos uno de los operandos es true
        2. En este caso:
           - Primer operando: true
           - Segundo operando: false
        3. Como el primer operando es true, el resultado final es true
        4. El OR no necesita evaluar el segundo operando si el primero es true
        `,
    },
    {
        id: 4,
        expression: "(true && false) || true",
        result: true,
        difficulty: "Intermedio",
        explanation: `
        1. Primero se evalúa lo que está entre paréntesis: (true && false)
           - true && false = false (porque AND requiere que ambos sean true)
        2. Entonces la expresión queda: false || true
        3. El operador OR devuelve true si alguno es true
        4. Como el segundo operando es true, el resultado final es true
        `,
    },
    {
        id: 5,
        expression: "!(true && false) && true",
        result: true,
        difficulty: "Intermedio",
        explanation: `
        1. Primero se evalúa lo que está entre paréntesis: (true && false)
           - true && false = false
        2. Luego se aplica el NOT (!):
           - !(false) = true
        3. Finalmente: true && true
        4. Como ambos operandos son true, el resultado es true
        `,
    },
    {
        id: 6,
        expression: "(false || true) && !(false && true)",
        result: true,
        difficulty: "Avanzado",
        explanation: `
        1. Evaluamos (false || true):
           - Como uno es true, el resultado es true
        2. Evaluamos (false && true):
           - Como uno es false, el resultado es false
        3. Aplicamos NOT a ese resultado:
           - !(false) = true
        4. Finalmente: true && true = true
        `,
    },
    {
        id: 7,
        expression: "(true && !false) || (false && !true)",
        result: true,
        difficulty: "Avanzado",
        explanation: `
        1. Evaluamos !false y !true:
           - !false = true
           - !true = false
        2. La expresión queda: (true && true) || (false && false)
        3. Evaluamos los AND:
           - true && true = true
           - false && false = false
        4. Finalmente: true || false = true
        `,
    },
    {
        id: 8,
        expression: "(!true && false) || (!false && true)",
        result: true,
        difficulty: "Avanzado",
        explanation: `
        1. Evaluamos !true y !false:
           - !true = false
           - !false = true
        2. La expresión queda: (false && false) || (true && true)
        3. Evaluamos los AND:
           - false && false = false
           - true && true = true
        4. Finalmente: false || true = true
        `,
    },
    {
        id: 9,
        expression: "!(false || !true) && (true && !false)",
        result: true,
        difficulty: "Avanzado",
        explanation: `
        1. Evaluamos !true:
           - !true = false
        2. Evaluamos (false || false):
           - false || false = false
        3. Aplicamos NOT al resultado:
           - !(false) = true
        4. En la segunda parte, !false:
           - !false = true
        5. Evaluamos (true && true):
           - true && true = true
        6. Finalmente: true && true = true
        `,
    },
    {
        id: 10,
        expression: "(true || false || true) && (!true || !false)",
        result: true,
        difficulty: "Avanzado",
        explanation: `
        1. Evaluamos (true || false || true):
           - true || false = true (no necesita evaluar más)
           - El resultado es true
        2. Evaluamos (!true || !false):
           - !true = false
           - !false = true
           - false || true = true
        3. Finalmente: true && true = true
        `,
    },
    {
        id: 11,
        expression: "(!true && !false) || (true && true && false)",
        result: false,
        difficulty: "Avanzado",
        explanation: `
        1. Evaluamos !true y !false:
           - !true = false
           - !false = true
        2. Primera parte (false && true):
           - Como uno es false, el resultado es false
        3. Segunda parte (true && true && false):
           - true && true = true
           - true && false = false
        4. Finalmente: false || false = false
        `,
    },
];

// Estado global
let currentQuestion = 0;
let score = 0;
let answered = false;

// Elementos del DOM
const elements = {
    currentQuestionSpan: document.getElementById("current-question"),
    totalQuestionsSpan: document.getElementById("total-questions"),
    questionDifficulty: document.getElementById("question-difficulty"),
    expressionCode: document.getElementById("expression"),
    trueButton: document.getElementById("true-btn"),
    falseButton: document.getElementById("false-btn"),
    explanation: document.getElementById("explanation"),
    resultMessage: document.getElementById("result-message"),
    explanationText: document.getElementById("explanation-text"),
    nextButtonContainer: document.getElementById("next-button-container"),
    nextButton: document.getElementById("next-button"),
    currentScoreSpan: document.getElementById("current-score"),
    questionsAnsweredSpan: document.getElementById("questions-answered"),
    quizContainer: document.getElementById("quiz-container"),
    resultsContainer: document.getElementById("results-container"),
    finalScoreSpan: document.getElementById("final-score"),
    totalQuestionsFinalSpan: document.getElementById("total-questions-final"),
};

// Inicializar quiz
function initializeQuiz() {
    elements.totalQuestionsSpan.textContent = questions.length;
    elements.totalQuestionsFinalSpan.textContent = questions.length;
    updateQuestion();
}

// Actualizar pregunta actual
function updateQuestion() {
    const question = questions[currentQuestion];
    elements.currentQuestionSpan.textContent = currentQuestion + 1;
    elements.questionDifficulty.textContent = question.difficulty;
    elements.expressionCode.textContent = question.expression;
    elements.explanation.classList.add("hidden");
    elements.nextButtonContainer.classList.add("hidden");

    // Resetear estado de los botones
    elements.trueButton.disabled = false;
    elements.falseButton.disabled = false;
}

// Manejar respuesta
function handleAnswer(answer) {
    if (answered) return;

    const question = questions[currentQuestion];
    const isCorrect = answer === question.result;
    answered = true;

    if (isCorrect) {
        score++;
    }

    // Actualizar UI
    elements.explanation.classList.remove("hidden");
    elements.explanation.classList.toggle("incorrect", !isCorrect);
    elements.resultMessage.textContent = `${
        isCorrect ? "¡Correcto!" : "¡Incorrecto!"
    } La expresión ${question.expression} evalúa a ${question.result}`;
    elements.explanationText.textContent = question.explanation;
    elements.nextButtonContainer.classList.remove("hidden");
    elements.currentScoreSpan.textContent = score;
    elements.questionsAnsweredSpan.textContent = currentQuestion + 1;

    // Deshabilitar botones
    elements.trueButton.disabled = true;
    elements.falseButton.disabled = true;

    // Actualizar texto del botón siguiente
    elements.nextButton.textContent =
        currentQuestion === questions.length - 1
            ? "Ver resultados"
            : "Siguiente pregunta";
}

// Siguiente pregunta
function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        answered = false;
        updateQuestion();
    } else {
        showResults();
    }
}

// Mostrar resultados
function showResults() {
    elements.quizContainer.classList.add("hidden");
    elements.resultsContainer.classList.remove("hidden");
    elements.finalScoreSpan.textContent = score;
}

// Reiniciar quiz
function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    answered = false;
    elements.quizContainer.classList.remove("hidden");
    elements.resultsContainer.classList.add("hidden");
    elements.currentScoreSpan.textContent = "0";
    elements.questionsAnsweredSpan.textContent = "0";
    updateQuestion();
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", initializeQuiz);
