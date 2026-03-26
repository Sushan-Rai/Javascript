// fetch call is done to get the data 
const loadData = async () => {
    const response = await fetch(`https://picsum.photos/v2/list?page=1&limit=10`)
    const data = await response.json();
    console.log(data)
    renderData(data)
    document.getElementById('loader').style.display = 'none'
}
// to render the data as an image and add it to content
const renderData = (data) => {
    const content = document.getElementById('content')
    console.log(content)
    data.forEach((item) => {
        const img = document.createElement('img')
        img.src = item.download_url
        img.id = item.id
        img.style.width = '100%'
        content.appendChild(img)
    })
}
// initial load
window.onload = loadData;
// to avoid multiple calls isloading is used and page for reference to the next call
let page = 2;
let isLoading = false
const loadMoreData = async ()=>{
    if (isLoading === true){
        return
    }
    isLoading = true
    document.getElementById('loader').style.display = 'block'
    const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=10`)
    const newData = await response.json()
    renderData(newData)
    page++
    document.getElementById('loader').style.display = 'none'
    isLoading = false
}
// when the inner Height and the scrollY reference (top of the screen) add up to the offsetheight which is the end of the screen
// then we call the function
window.onscroll = ()=>{
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        loadMoreData(); 
    }
}