let items = document.querySelectorAll('.container .box')
// the entry point of drag element
let dragSrcEl = null
// console.log(items)

items.forEach((item) => {
    // if an element is drag started then make the opacity less and point the dragSrc to this
    item.addEventListener('dragstart', function a(e) {
        this.style.opacity = '0.4'
        dragSrcEl = this
        e.dataTransfer.effectAllowed = 'move'
        // we set the data to this inner html and allow move
        e.dataTransfer.setData('text/html', this.innerHTML)
    })
    // return to the original and remove the over class from all the list items
    item.addEventListener('dragend', function b(e) {
        this.style.opacity = '1'
        items.forEach(function (item) {
            item.classList.remove('over')
        });
    })
    // when we enter the drag space of the other element indicate it is there
    item.addEventListener('dragenter', function c(e) {
        this.classList.add('over')
    })
    // when we leave the drag space then remove it
    item.addEventListener('dragleave', function d(e) {
        this.classList.remove('over')
    })
    // dropeffect will be set to none and we prevent this default behavior
    item.addEventListener('dragover', function f(e) {
        e.preventDefault()
        return false
    })
    // if it is the same element dont do anything if not swap the inner contents
    item.addEventListener('drop', function g(e) {
        e.stopPropagation() // stop redirect
        if (dragSrcEl !== this) {
            dragSrcEl.innerHTML = this.innerHTML
            this.innerHTML = e.dataTransfer.getData('text/html')
        }

        return false
    })
})