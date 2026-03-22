let addButton = document.querySelector("#addBtn")
let ul = document.getElementById("myUL")
let tasks = []
// tasks is used to record and keep track of the current tasks
function renderTasks() {
    // this function will be called multiple times so in order to not cause repitition we blank the ul
    ul.innerHTML = ""
    // for each task we create a list item with its corresponding update, status and delete buttons
    tasks.forEach(task => {
        let listElement = document.createElement('li')
        listElement.dataset.id = task.id

        let context = document.createTextNode(task.name)

        let div = document.createElement('div')
        div.style.display = 'flex'
        div.style.gap = '2px'

        const statusBtn = document.createElement('input')
        statusBtn.className = 'statusBtn'
        statusBtn.type = 'checkbox'
        statusBtn.checked = task.completed
        div.appendChild(statusBtn)

        const updateBtn = document.createElement('button')
        updateBtn.className = 'updateBtn'
        let updateBtnText = document.createTextNode('C')
        updateBtn.style.backgroundColor = 'blanchedalmond'
        updateBtn.style.borderRadius = '2px'
        updateBtn.appendChild(updateBtnText)
        div.appendChild(updateBtn)

        const closeBtn = document.createElement('button')
        closeBtn.className = 'closeBtn'
        let closeBtnText = document.createTextNode('X')
        closeBtn.style.backgroundColor = 'blanchedalmond'
        closeBtn.style.borderRadius = '2px'
        closeBtn.appendChild(closeBtnText)
        div.appendChild(closeBtn)

        listElement.style.display = 'flex'
        listElement.style.justifyContent = 'space-between'
        listElement.style.alignItems = 'center'
        listElement.style.backgroundColor = task.completed ? 'chartreuse' : 'navajowhite'

        listElement.appendChild(context)
        listElement.appendChild(div)
        ul.appendChild(listElement)
        // We add add event listeners to initiate any chnages or button clicks
        statusBtn.addEventListener("change", () => {
            task.completed = statusBtn.checked
            renderTasks()
        })

        updateBtn.addEventListener("click", () => {
            let newValue = prompt("Update the task:", task.name)
            if (newValue !== "") {
                task.name = newValue
                renderTasks()
            }
        })

        closeBtn.addEventListener("click", () => {
            tasks = tasks.filter(t => t.id !== task.id)
            renderTasks()
        })
    })
}
// add a task when the event listener captures a click 
addButton.addEventListener("click", (e) => {
    e.preventDefault()
    let content = document.getElementById('myInput')

    if (content.value.trim() === "") {
        alert('Please add a task!')
        return
    }

    let taskObject = {
        id: Date.now(),
        name: content.value,
        completed: false
    }

    tasks.push(taskObject)
    content.value = ''
    renderTasks()
})
// sample task 
tasks.push({
    id: Date.now(),
    name: 'workout',
    completed: false
})

renderTasks()