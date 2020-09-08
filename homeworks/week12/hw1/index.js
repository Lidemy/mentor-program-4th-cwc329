/* eslint no-undef: 0 */
user.checkLogStatus(pageInit);

$('.board__loadMoreBtn').click(() => {
  loadMoreComments();
});

$('#loginBtn').click(() => {
  $('.board__register').hide(500);
  $('.board__login').toggle(500);
  $('.login__form__username').focus();
});

$('#registerBtn').click(() => {
  $('.board__register').toggle(500);
  $('.board__login').hide(500);
  $('.register__form__groupNo').focus();
});

$('#logoutBtn').click(() => {
  user.logout(user.checkLogStatus);
});

$('.board__login__form').submit((e) => {
  e.preventDefault();
  const username = $('.login__form__username').val();
  const password = $('.login__form__password').val();
  user.login(username, password, () => {
    if (isLogin) {
      $('.login__form__username').val('');
      $('.login__form__password').val('');
      user.checkLogStatus(pageInit);
    } else {
      alert('wrong username or password');
    }
  });
});

$('.register__form').submit((e) => {
  e.preventDefault();
  const username = $('.register__form__username').val();
  const groupNo = $('.register__form__groupNo').val();
  const nickname = $('.register__form__nickname').val();
  const password = $('.register__form__password').val();
  user.register(username, nickname, password, groupNo, (data) => {
    if (data.includes('Duplicate')) {
      if (data.includes('nickname')) {
        alert('Duplicate nickname');
      } else if (data.includes('username')) {
        alert('Duplicate username');
      }
    } else if (data.includes('failed')) {
      alert('Invalid inputs');
    } else {
      $('.register__form__username').val('');
      $('.register__form__groupNo').val('');
      $('.register__form__nickname').val('');
      $('.register__form__password').val('');
      user.login(username, password, () => {
        user.checkLogStatus(pageInit);
      });
    }
  });
});

$('.board__addComment__form').submit((e) => {
  e.preventDefault();
  const newComment = $('.board__addComment__form__comment').val();
  comment.post(() => {
    comment.get((data) => {
      insertNewComment(data);
    }, null, 1, 0);
  }, newComment, userId);
});
