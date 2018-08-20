document.addEventListener('DOMContentLoaded', function() {

  const imageId = 2 //Enter your assigned imageId here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`


  const likeButton = document.querySelector('#like_button')

  const form = document.querySelector('#comment_form')
  const submit = form.elements.submit
   form.addEventListener('submit', ()=>commentsHandler(event))
  console.log(form.elements)
  getPicture(imageURL,imageId)
   likeButton.addEventListener('click', ()=>handleLikes())


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

function handleLikes() {
  let span = document.querySelector('#likes')

  let likes = parseInt(span.innerHTML)

  likes ++
  span.innerHTML = likes
  likesPost(likes)
}

function likesPost(likes) {
  fetch(`https://randopic.herokuapp.com/likes/`,{
    method: 'POST',

    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({
        image_id: 2
    })
  })
}

function commentsHandler(event) {
  event.preventDefault()
  let li = document.createElement('li')
  let ul = document.querySelector('#comments')

  li.innerHTML = document.querySelector('#comment_input').value
  ul.append(li)
}
