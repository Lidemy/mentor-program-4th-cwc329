/* eslint no-undef: 0 */
/* eslint no-restricted-syntax: 0 */
/* eslint no-restricted-globals: 0 */
apiUrl = 'http://mentor-program.co/mtr04group6/cwc329/bulletin/V1_0_1/API/discussions.php';
siteKey = 'test';
let cursor = Infinity;
let minCommentId = Infinity;
const commentCardTemplate = `
<div class="card" id="%id">
  <div class="card-header">
    <div class="row">
      <div class="col-sm-5 col-md-6">
        <h5 class="card-title">%nickname</h5>
      </div>
      <div class="col-sm-5 offset-sm-2 col-md-6 offset-md-0 align-self-end">
        <h6 class="card-title text-muted text-right">%createdAt</h6>
      </div>
    </div>
  </div>
  <div class="card-body">
    <p class="card-text" style="overflow-wrap:break-word;white-space: pre-line;">%comment</p>
  </div>
</div>`;

function escapeHtml(unsafe) {
  return !unsafe ? unsafe : unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function addComment(comment, nickname, key, cb = null) {
  $.post(
    apiUrl,
    {
      comment,
      nickname,
      siteKey: key,
    },
  ).done((d) => {
    ({ err } = d);
    if (err) {
      alert('invalid inputs');
    } else {
      cb(d.discussions);
    }
  });
}

function getComments(key, before, cb) {
  let queryStr = `?siteKey=${key}`;
  if (isFinite(before)) {
    queryStr += `&before=${before}`;
  }
  $.ajax(apiUrl + queryStr)
    .done((d) => {
      ({ discussions, minId } = d);
      minCommentId = minId;
      cb(discussions);
    });
}

function showComments(discussions) {
  $('.comments__loadbtn').hide();
  if (discussions.length === 0) {
    return;
  }
  let temp = cursor;
  for (const discussion of discussions) {
    newCard = commentCardTemplate
      .replace('%id', discussion.id)
      .replace('%nickname', escapeHtml(discussion.nickname))
      .replace('%createdAt', escapeHtml(discussion.created_at))
      .replace('%comment', escapeHtml(discussion.comment));
    if (discussion.id <= temp) {
      temp = discussion.id;
      $('.comments').append(newCard);
    } else {
      $('.comments').prepend(newCard);
      newComment = $('#addCommentCotent').val('');
      nickname = $('#addCommentNickname').val('');
    }
    $(`#${cursor}`).scrollTop();
    cursor = temp;
  }
  if (cursor > minCommentId) {
    $('.comments__loadbtn').show();
  }
}

$(document).ready(() => {
  getComments(siteKey, cursor, showComments);
});

$('.comments__loadbtn').click(() => {
  getComments(siteKey, cursor, showComments);
});

$('.addCommentForm').submit((e) => {
  e.preventDefault();
  const newComment = $('#addCommentCotent').val();
  const nickname = $('#addCommentNickname').val();
  addComment(newComment, nickname, siteKey, showComments);
});
