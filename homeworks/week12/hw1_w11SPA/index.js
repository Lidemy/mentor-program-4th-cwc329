/* eslint no-undef: 0 */
/* eslint no-shadow: 0 */
/* eslint no-restricted-syntax: 0 */
$(document).ready(() => {
  user.checkLogStatus(pageInit);
});

$('.board__loadMoreBtn').click(() => {
  loadMoreComments();
});

$('#loginBtn').click(() => {
  $('.board__register').hide(500);
  $('.board__login').toggle(500);
  $('.login__form__username').focus();
});

$('#editNicknameBtn').click(() => {
  $('.board__editNickname').toggle(500);
  $('.board__editNickname__form__input').focus();
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

$('.board__editNickname__form').submit((e) => {
  e.preventDefault();
  const newNickname = $('.board__editNickname__form__input').val();
  user.changeProfile(() => {
    user.checkLogStatus(pageInit);
    $('.board__editNickname__form__input').val('');
  }, newNickname);
});

$('.board__addComment__form').submit((e) => {
  e.preventDefault();
  const newComment = $('.board__addComment__form__comment').val();
  comment.post(() => {
    comment.get((data) => {
      showComments(data, 'prepend');
      $('.board__addComment__form__comment').val('');
      offset += 1;
    }, null, 1, 0);
  }, newComment, userId);
});

$('.board__bulletin').submit((e) => {
  function getFormInputs(e) {
    const { children } = e.target;
    const result = {};
    for (const input of children) {
      const { name, defaultValue } = input;
      result[name] = defaultValue;
    }
    return result;
  }
  let inputs;
  e.preventDefault();
  if ($(e.target).hasClass('board__bulletin__card__deleteCommentform')) {
    inputs = getFormInputs(e);
    comment.delete(() => {
      $(e.target.closest('.board__bulletin__card')).hide(500);
    }, inputs.post_id);
  } else if ($(e.target).hasClass('board__bulletin__card__editCommentform')) {
    inputs = getFormInputs(e);
    const commentInfo = $($(e.target).closest('.board__bulletin__card__top').children()[0]).text();
    $('.board__editComment').show();
    $('.board__addComment').hide(500);
    $('.board__editComment__form__info').text(`${commentInfo.trim()} > Editing`);
    $('.board__editComment__form__comment').val(inputs.comment.trim());
    $('.board__editComment__form__userId').val(inputs.user_id);
    $('.board__editComment__form__postId').val(inputs.post_id);
    $('.board__editComment__form__comment').focus();
  }
});

$('.board__editComment__form').submit((e) => {
  e.preventDefault();
  const newComment = $('.board__editComment__form__comment').val();
  const pId = $('.board__editComment__form__postId').val();
  comment.edit(() => {
    comment.get((data) => {
      $(`.board__bulletin__card__comment.${data[0].id}`).text(data[0].comment);
    }, pId, 1, 0);
    $('.board__editComment').hide(500);
    $('.board__addComment').show(500);
    $('.board__editComment__form__info').text('');
    $('.board__editComment__form__comment').val('');
    $('.board__editComment__form__userId').val('');
    $('.board__editComment__form__postId').val('');
    $(`.${pId}[name="comment"]`).val(newComment);
  }, pId, userId, newComment);
});

$('.board__editComment__form__cancel').click(() => {
  $('.board__editComment').hide(500);
  $('.board__addComment').show(500);
  $('.board__editComment__form__info').text('');
  $('.board__editComment__form__comment').val('');
  $('.board__editComment__form__userId').val('');
  $('.board__editComment__form__postId').val('');
});
