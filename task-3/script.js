let rowEvent = document.querySelector(".row")
// event delegation for the images
rowEvent.addEventListener('click',(e)=>{
    e.preventDefault();
    // enable the transition by adding the active class
    document.getElementById('myModal').classList.add('active')
    let slides = document.getElementsByClassName('mySlides');
    // get all the slides and make the display as none
    for(let i=0; i<slides.length; i++){
        slides[i].style.display = 'none'
    }
    // slide number is taken into account taking the target's id
    let slideNumber = Number(e.target.id);
    // display the particular slide via 0 indexing
    slides[slideNumber-1].style.display = 'block'
})

let closeBtn = document.querySelector(".close")
closeBtn.addEventListener("click",(e)=>{
    e.preventDefault()
    // disable the modal 
    document.getElementById('myModal').classList.remove('active')
})