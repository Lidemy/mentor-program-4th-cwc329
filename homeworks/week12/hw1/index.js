const apiUrl = 'http://localhost:8080/cwc329/bulletin_V1_2_0/API/';
let userApi = 'users.php';
const commentApi = 'comments.php';


function getComments() {
  const request = new XMLHttpRequest();
  request.onload = () => {
    try {
      JSON.parse(request.response);
    } catch (err) {
      console.log(err);
    }
    const result = JSON.parse(request.response);
    console.log(result);
  };

  request.open('GET', apiUrl + commentApi, true);
  request.send();
}


function getUsers(id) {
  const request = new XMLHttpRequest();
  if (id) {
    userApi += `?id=${id}`;
  }
  request.onload = () => {
    try {
      JSON.parse(request.response);
    } catch (err) {
      console.log(err);
    }
    const result = JSON.parse(request.response);
    console.log(result);
  };

  request.open('GET', userApi, true);
  request.send();
}
getComments();
getUsers();
