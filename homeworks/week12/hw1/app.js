/* eslint no-undef: 0 */
/* eslint no-shadow: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-use-before-define: 0 */
/* eslint prefer-destructuring: 0 */
const limit = 5;
let offset = 0;
const apiUrl = 'http://localhost:8080/cwc329/bulletin_V1_2_0/API/';
const userApi = 'users.php';
const commentApi = 'comments.php';
const membershipApi = 'membership.php';
let userId = null;
let userData;

const comment = {
  get:
    (cb = null, commentId = null, limit = 5, offset = 0) => {
      let url;
      if (commentId) {
        url = `${apiUrl + commentApi}?id=${commentId}`;
      } else {
        url = `${apiUrl + commentApi}?limit=${limit}&offset=${offset}`;
      }
      $.ajax(url)
        .done((data) => {
          if (cb) {
            cb(data);
          }
        });
    },
  post:
    (cb, newComment, userId) => {
      $.post(
        apiUrl + commentApi,
        {
          newComment,
          userId,
        },
      ).done((data) => {
        if (cb) {
          cb(data);
        }
      });
    },
  edit:
    (cb = null, commentId, userId) => {
      const queryString = `?id=${commentId}`;
      $.post(
        apiUrl + commentApi + queryString,
        {
          comment,
          userId,
        },
      ).done(() => {
        if (cb) {
          cb();
        }
      });
    },
  delete:
    (cb = null, commentId) => {
      const queryString = `?id=${commentId}`;
      $.ajax(
        {
          url: apiUrl + commentApi + queryString,
          method: 'DELETE',
        },
      ).done(() => {
        if (cb) {
          cb();
        }
      });
    },
};

function pageInit(data, cb = comment.get) {
  offset = 0;
  $('.board__bulletin').text('');
  $('#registerBtn').hide();
  $('#loginBtn').hide();
  $('#editNicknameBtn').hide();
  $('#logoutBtn').hide();
  $('.board__addComment').hide();
  $('.hide').hide();
  const errOfComment = $('.board__pleaseLogin');
  [userData] = data;
  if (userId) {
    $('#registerBtn').hide();
    $('#loginBtn').hide();
    $('#editNicknameBtn').show();
    $('#logoutBtn').show();
    $('.board__addComment').show();
    $('.board__addComment__form__info')
      .text(`mtr04 > group${userData.groupNo} > ${userData.nickname} >`);
    if (userData.userType === 99) {
      $('#adminBtn').show();
    } else if (userData.userType === 1) {
      errOfComment
        .text('You Are Banned From Commenting!');
      $('.board__addComment').hide();
    }
  } else {
    $('#registerBtn').show();
    $('#loginBtn').show();
    errOfComment
      .text('Log in to post comment');
  }
  comment.get(showComments, null, limit, offset);
  offset += limit;
}


const user = {
  get:
    (cb = null, userId = null) => {
      let url;
      if (userId) {
        url = `${apiUrl + userApi}?id=${userId}`;
      } else {
        url = apiUrl + userApi;
      }
      $.ajax(url)
        .done((data) => {
          userData = data;
          if (cb) {
            cb(userData);
          }
        });
    },
  register:
    (username, nickname, password, groupNo, cb) => {
      $.post(
        apiUrl + userApi,
        {
          username,
          nickname,
          password,
          groupNo,
        },
      ).done((data) => {
        cb(data);
      });
    },
  changeProfile:
    (userId, nickname) => {
      $.post(
        apiUrl + userApi,
        {
          nickname,
          userId,
        },
      );
    },
  login:
    (username, password, cb) => {
      $.post(
        apiUrl + membershipApi,
        {
          username,
          password,
        },
      ).done((data) => {
        if (data.id) {
          document.cookie = `${data.name}=${data.id}`;
          isLogin = true;
          userId = data.userId;
        }
        cb();
      });
    },
  logout:
    (cb) => {
      $.post(apiUrl + membershipApi)
        .done((data) => {
          isLogin = false;
          userId = null;
          userData = null;
          cb(pageInit);
        });
    },
  checkLogStatus:
    (cb) => {
      $.ajax(apiUrl + membershipApi)
        .done((data) => {
          if (data.result) {
            userId = data.userId;
            isLogin = true;
          }
          user.get(cb, userId);
        });
    },
};

function escapeHtml(unsafe) {
  return !unsafe ? unsafe : unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function showComments(data, method = 'append') {
  data.forEach((e) => {
    const commentCardTemplate = `
      <div class="board__bulletin__card">
        <div class="board__bulletin__card__top">
          <div class="board__bulletin__card__nickname">
            mtr04&nbsp;&gt;&nbsp;group$groupNo&nbsp;&gt;&nbsp;$nickname
          </div>
          <div class="board__bulletin__card__actions">
            <form class="board__bulletin__card__editCommentform $postId hide" method="POST" action="API/comments.php?id=$postId">
              <input type="hidden" name="user_id" value=$userId />
              <input type="hidden" name="post_id" value=$postId />
              <input type="submit" value="&gt; Edit" />
            </form>
            &nbsp;
            <form class="board__bulletin__card__deleteCommentform $postId hide" method="POST" action="comments.php?id=$postId">
            <input type="hidden" name="user_id" value=$userId />
              <input type="hidden" name="post_id" value=$postId />
              <input type="submit" value="&gt; Delete" />
            </form>
          </div>
        </div>
        <p class="board__bulletin__card__comment">
          $comment
        </p>
        <div class="board__bulletin__card__time">
          $created_at
        </div>
      </div>
    `;
    const commentCard = commentCardTemplate
      .replace('$groupNo', String(e.groupNo))
      .replace('$nickname', escapeHtml(e.nickname))
      .replaceAll('$postId', String(e.id))
      .replaceAll('$userId', String(e.user_id))
      .replace('$comment', escapeHtml(e.comment))
      .replace('$created_at', escapeHtml(e.created_at));
    if (method === 'append') {
      $('.board__bulletin').append(commentCard);
    } else {
      $('.board__bulletin').prepend(commentCard);
    }
    if (userData) {
      if (userData.id === e.user_id || userData.userType === 99) {
        $(`.board__bulletin__card__editCommentform.${e.id}`).show();
        $(`.board__bulletin__card__deleteCommentform.${e.id}`).show();
      } else if (userData.userType === 98) {
        $(`.board__bulletin__card__editCommentform.${e.id}`).show();
      }
    }
  });
  if (data.length < 5) {
    $('.board__loadMoreBtn').hide();
  }
}

function loadMoreComments(cb = showComments) {
  comment.get(cb, null, limit, offset);
  offset += limit;
}
