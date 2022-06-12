// const deleteText = document.querySelectorAll('.fa-trash')
const thumbText = document.querySelectorAll('.fa-arrow-circle-up')

// Array.from(deleteText).forEach((element)=>{
//     element.addEventListener('click', deleteRapper)
// })

Array.from(thumbText).forEach((element)=>{
    element.addEventListener('click', addRank)
})



async function addRank(){
    // alert('rank up')
    const character = this.parentNode.childNodes[1].innerText
    const phrase = this.parentNode.childNodes[3].innerText
    const currentRank = Number(this.parentNode.childNodes[5].innerText)
    try{
        const response = await fetch('addOneRank', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'character': character,
              'phrase': phrase,
              'rank': currentRank
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

// async function deleteRapper(){
//     const sName = this.parentNode.childNodes[1].innerText
//     const bName = this.parentNode.childNodes[3].innerText
//     try{
//         const response = await fetch('deleteRapper', {
//             method: 'delete',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({
//               'stageNameS': sName,
//               'birthNameS': bName
//             })
//           })
//         const data = await response.json()
//         console.log(data)
//         location.reload()

//     }catch(err){
//         console.log(err)
//     }
// }