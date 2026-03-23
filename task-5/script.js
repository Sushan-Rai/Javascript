// quiz array contains all the information required
let quiz = [
    {
        "question": "What is the output of console.log(typeof null) in JavaScript?",
        "options": ["null", "object", "undefined", "number"],
        "answer": "object",
        "points": 1,
        "explanation": "This is a historical bug in JavaScript. Even though null represents no value, typeof null returns 'object'."
    },
    {
        "question": "Which data structure is used in recursion?",
        "options": ["Queue", "Stack", "Heap", "Graph"],
        "answer": "Stack",
        "points": 1,
        "explanation": "Recursion uses the call stack to store function calls. Each call is pushed and popped as execution progresses."
    },
    {
        "question": "What is the time complexity of accessing an array element by index?",
        "options": ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
        "answer": "O(1)",
        "points": 1,
        "explanation": "Arrays allow direct access using an index, so retrieving an element takes constant time."
    },
    {
        "question": "Which of the following is NOT a programming language?",
        "options": ["Python", "Java", "HTML", "C++"],
        "answer": "HTML",
        "points": 1,
        "explanation": "HTML is a markup language used for structuring web pages, not a programming language."
    },
    {
        "question": "What will be the output of this Python code: print(2 ** 3 ** 2)?",
        "options": ["64", "512", "256", "16"],
        "answer": "512",
        "points": 1,
        "explanation": "Exponentiation in Python is right-associative, so 2 ** (3 ** 2) = 2 ** 9 = 512."
    }
]

let slides = document.getElementsByClassName("slides")
// populating the questions with options and points
for (let i = 0; i < quiz.length; i++) {
    for (const key in quiz[i]) {
        if (key === "explanation" || key === "answer") continue

        let element = document.createElement('div')
        element.classList.add(key)

        if (key === "options") {
            for (let j = 0; j < quiz[i][key].length; j++) {
                let btn = document.createElement('button')
                btn.textContent = quiz[i][key][j]

                btn.addEventListener("click", () => {
                    handleAnswer(i, btn.textContent)
                })

                element.appendChild(btn)
            }
        } else {
            element.textContent = `${key}: ${quiz[i][key]}`
        }

        slides[i].appendChild(element)
    }
}

let points = 0
let explanations = []
let currentSlide = 0
// This function handles the answers for the question posed
function handleAnswer(i, selectedOption) {
    if (quiz[i]["answer"] === selectedOption) {
        points += quiz[i]["points"]
    } else {
        explanations.push(quiz[i]["explanation"])
    }

    slides[i].style.display = "none"
    currentSlide++

    if (currentSlide >= quiz.length){
        showResult()
    }
}
// show result handles the result after get the acquired points and explanations
function showResult() {
    let resultSlide = slides[quiz.length]

    let totalPoints = document.createElement('p')
    totalPoints.textContent = 'Total Points: ' + points + '/' + quiz.length
    resultSlide.appendChild(totalPoints)

    if (explanations.length > 0) {
        let explanationsEnd = document.createElement('div')

        explanations.forEach(exp => {
            let p = document.createElement('p')
            p.textContent = exp
            explanationsEnd.appendChild(p)
        })

        resultSlide.appendChild(explanationsEnd)
    }
}
