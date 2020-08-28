const apiUrl = 'http://localhost:8080/cwc329/bulletin_V1_2_0/API/bulletin_api.php';
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

request.open('GET', apiUrl, true);
request.send();
