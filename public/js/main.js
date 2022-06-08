// const deleteText = document.querySelectorAll('.fa-trash')
const thumbText = document.querySelectorAll('.fa-arrow-circle-up')

// Array.from(deleteText).forEach((element)=>{
//     element.addEventListener('click', deleteRapper)
// })

Array.from(thumbText).forEach((element)=>{
    element.addEventListener('click', addLike)
})



async function addLike(){
    const sName = this.parentNode.childNodes[1].innerText
    const bName = this.parentNode.childNodes[3].innerText
    const tLikes = Number(this.parentNode.childNodes[5].innerText)
    try{
        const response = await fetch('addOneRank', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'character': sName,
              'phrase': bName,
              'season': season,
              'episode': episode,
              'time': time
              'rank': tLikes
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function deleteRapper(){
    const sName = this.parentNode.childNodes[1].innerText
    const bName = this.parentNode.childNodes[3].innerText
    try{
        const response = await fetch('deleteRapper', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'stageNameS': sName,
              'birthNameS': bName
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}