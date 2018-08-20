document.addEventListener('DOMContentLoaded', function() {

  const imageId = 8 //Enter your assigned imageId here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetchImage(imageId)

  document.querySelector('#like_button').addEventListener('click', addLike)
  document.querySelector('#comment_form').addEventListener('submit', addComment)

})

function fetchImage(id) {
  fetch(`https://randopic.herokuapp.com/images/${id}`)
    .then(r => r.json())
    .then(json => renderImage(json))
}

function renderImage(json) {
  let image = document.querySelector('#image')
  let likeEl = document.querySelector('#likes')
  let commentsUl = document.querySelector('#comments')
  let h4 = document.querySelector('#name')

  image.dataset.id = json.id
  h4.innerText = json.name
  image.src = json.url
  likeEl.innerText = json.like_count

  if (json.comments != []) {
    json.comments.forEach(comment => {
      renderComment(commentsUl, comment)
    })
  }
}

function renderComment(ul, comment) {
  let li = document.createElement('li')
  let deleteButton = document.createElement('button')

  deleteButton.addEventListener('click', deleteComment)
  deleteButton.innerText = "Delete Comment"
  li.innerText = comment.content
  li.dataset.id = comment.id
  li.append(deleteButton)
  ul.append(li)
}

function addLike() {
  let likeEl = document.querySelector('#likes')
  let imageId = document.querySelector('#image').dataset.id
  likeEl.innerText = parseInt(likeEl.innerText) + 1
  postLike(imageId, likeEl.innerText)
}

function postLike(imageId, likes) {
  fetch(`https://randopic.herokuapp.com/likes/`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: imageId
    })
  })
}

function addComment(e) {
  e.preventDefault()
  let commentInput = document.querySelector('#comment_input')
  if (commentInput.value=== "") {
    alert("Please enter text in the comment field")
  } else {
    fetchAndRenderComment(commentInput.value)
    document.querySelector('#comment_form').reset()
  }
}

function fetchAndRenderComment(text) {
  let imageId = document.querySelector('#image').dataset.id
  fetch('https://randopic.herokuapp.com/comments/', {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: imageId,
      content: text
    })
  }).then(r => r.json())
  .then(json => {
    renderComment(document.querySelector('#comments'), json)
  })
}

function deleteComment(e) {
  let li = e.currentTarget.parentNode
  let commentId = li.dataset.id
  fetch(`https://randopic.herokuapp.com/comments/${commentId}`, {
    method: "DELETE"
  }).then(r => {
    li.remove()
  })
}
