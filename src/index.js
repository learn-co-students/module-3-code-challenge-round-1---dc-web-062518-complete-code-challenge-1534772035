document.addEventListener('DOMContentLoaded', function() {

  const imageId = 2 //Enter your assigned imageId here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`


  getPicture(imageURL,imageId)
})


function getPicture(imageURL,imageId) {
  fetch(imageURL)
  .then(res=>res.json())
  .then(json=> renderImage(json))
}

function renderImage(json) {
  console.log(json)
  let img = document.querySelector('#image')
  let h4 = document.querySelector('#name')
  let span = document.querySelector('#likes')
  let ul = document.querySelector('#comments')

  img.src = json.url
  h4.innerHTML = json.name
  span.innerHTML = json.like_count

  json.comments.forEach(comment=>{
    let li = document.createElement('li')
    li.id = `comment-${comment.id}`
    li.innerHTML = comment.content
    ul.append(li)
  })

}
