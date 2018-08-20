document.addEventListener('DOMContentLoaded', function() {

  const imageId = 1 //Enter your assigned imageId here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

getFetch()
let button = document.getElementById('submitComment')
button.addEventListener('click', comment)
})

function getFetch() {
  fetch('https://randopic.herokuapp.com/images/6')
  .then(response => response.json())
  .then(json => render(json))
}

function render(json) {
  let imgDiv = document.getElementById('image_card')
  let img = document.getElementById('image')
  let h4 = document.getElementById('name')
  let likes = document.getElementById('likes')
  let comments = document.getElementById('comments')
  let button = document.getElementById('like_button')
  button.addEventListener('click', like)

  img.src = json.url
  img.id = json.id
  h4.innerText = json.name
  likes.innerText = json.like_count
  for(let comment of json.comments) {
    let li = document.createElement('li')
    comments.appendChild(li)
    li.innerText = comment.content
  }
}

function like(event){
  let image = event.currentTarget.parentNode
  let id = image.querySelector('img').id
  let numLikes = ++document.getElementById('likes').innerText
  patchFetch(id, numLikes)
}

function patchFetch(id, numLikes) {

  fetch(`https://randopic.herokuapp.com/likes`, {
    method: "POST",
    headers: {'Accept': 'application/json',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify ({
      image_id: id,
      like_count: ++numLikes
    })
  }).then(response => response.json())
  .then(json => { console.log(json)
  })
}

function comment(event) {
  event.preventDefault()
  let form = document.getElementById('comment_form')
  let commentInput = form.querySelector('input').value
  let input = document.getElementById('comment_input')
  let ul = document.getElementById('comments')
  let li = document.createElement('li')

  ul.appendChild(li)
  li.innerText = commentInput
  commentPatch(commentInput)
  input.value = ""
}

function commentPatch(commentInput) {
  let div = event.currentTarget.parentNode.parentNode
  let id = div.querySelector('img').id
  fetch('https://randopic.herokuapp.com/comments',{
    method: 'POST',
    headers: {'Accept': 'application/json',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify ({
      image_id: id,
      content: commentInput
    })
  }).then(response => response.json())
  .then(json => console.log(json))
}
