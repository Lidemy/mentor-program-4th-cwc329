/* eslint no-undef: 0 */
/* eslint no-restricted-syntax: 0 */
/* eslint no-restricted-globals: 0 */
/* eslint import/prefer-default-export: 0 */

export function init(option) {
  const { apiUrl, siteKey, bulletinContainer } = option;
  let cursor = Infinity;
  let minCommentId = Infinity;
  const commentCardTemplate = `
  <div class="card mb-2" id="%id">
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

  const bulletinTemplate = `
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand">Bulletin</a>
  </nav>
    <div class="col align-items-center">
      <form class="addCommentForm mb-3">
        <div class="form-group">
          <label for="addCommentNickname">Nickname</label>
          <input type="text" class="form-control" id="addCommentNickname" required>
        </div>
        <div class="form-group">
          <label for="addCommentCotent">Comments</label>
          <textarea class="form-control" id="addCommentCotent" rows="3" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Post</button>
      </form>
    <div class="comments">
    </div>
    <button type="button" class="btn btn-secondary btn-lg btn-block comments__loadbtn">
      Load More
    </button>
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
      const { err } = d;
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
        const { discussions, minId } = d;
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
      const newCard = commentCardTemplate
        .replace('%id', discussion.id)
        .replace('%nickname', escapeHtml(discussion.nickname))
        .replace('%createdAt', escapeHtml(discussion.created_at))
        .replace('%comment', escapeHtml(discussion.comment));
      if (discussion.id <= temp) {
        temp = discussion.id;
        $('.comments').append(newCard);
      } else {
        $('.comments').prepend(newCard);
        $('#addCommentCotent').val('');
        $('#addCommentNickname').val('');
      }
      $(`#${cursor}`).scrollTop();
      cursor = temp;
    }
    if (cursor > minCommentId) {
      $('.comments__loadbtn').show();
    }
  }

  $(`.${bulletinContainer}`).append($(bulletinTemplate));
  getComments(siteKey, cursor, showComments);

  $('.comments__loadbtn').click(() => {
    getComments(siteKey, cursor, showComments);
  });

  $('.addCommentForm').submit((e) => {
    e.preventDefault();
    const newComment = $('#addCommentCotent').val();
    const nickname = $('#addCommentNickname').val();
    addComment(newComment, nickname, siteKey, showComments);
  });
}
