// on change hash event we can capture the hash name and then add it as active make others inactive
window.addEventListener('hashchange',(e)=>{
    let hash = window.location.hash
    let hashString = String(hash)
    let main = document.getElementsByClassName('main')
    console.log(main)
    for(let i=0;i<main.length;i++){
        if(main[i].classList.contains('active')){
            main[i].classList.remove('active')
        }
    }
    let target = document.getElementById(hashString.slice(1,hashString.length))
    target.classList.add('active')
})