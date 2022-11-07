const backend_base_url = "http://127.0.0.1:8000";
const frontend_base_url = "http://127.0.0.1:5500";

//회원가입
async function handleSignup() {
  const signupData = {
    username: document.getElementById("sigupusername").value,
    password: document.getElementById("siguppassword").value,
    password2: document.getElementById("CheckPassword").value,
    email: document.getElementById("email").value,
  };

  console.log(signupData);

  const response = await fetch("http://127.0.0.1:8000/users/signup/", {
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(signupData),
  });

  console.log(response);

  if (response.status == 201) {
    window.location.replace("http://127.0.0.1:5500/sign.html");
  } else {
    alert(response.status);
  }
}

//로그인
async function handleSignin() {
  const signinData = {
    username: document.getElementById("loginusername").value,
    password: document.getElementById("loginpassword").value,
  };

  const response = await fetch("http://127.0.0.1:8000/users/api/token/", {
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(signinData),
  });

  const response_json = await response.json();
  console.log(response_json);

  localStorage.setItem("access", response_json.access);
  localStorage.setItem("refresh", response_json.refresh);

  const base64Url = response_json.access.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  localStorage.setItem("payload", jsonPayload);
  window.location.replace("http://127.0.0.1:5500/");

  // if (response.status==200){
  //     window.location.replace('http://127.0.0.1:8000/users/signup/');
  // } else {
  //     alert(response.status)
  // }
}

//로그아웃
async function handleLogout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("payload");
  alert("로그아웃 되었습니다");
  location.reload();
}

//게시글 생성
async function createArticle() {
  const payload = localStorage.getItem("payload");
  const parsed_payload = await JSON.parse(payload);
  console.log(parsed_payload);

  content = document.getElementById("article_content").value;
  title = document.getElementById("article_title").value;
  restaurant = document.getElementById("article_restaurant").value;
  image = document.getElementById("formFile").files[0];
  console.log(image);

  const formData = new FormData();

  formData.append("title", title);
  formData.append("restaurants", restaurant);
  formData.append("content", content);
  formData.append("image", image);

  const response = await fetch("http://127.0.0.1:8000/articles/", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "POST",
    body: formData,
  });

  if (response.status == 200) {
    alert("게시물 등록");
    window.location.replace("http://127.0.0.1:5500/");
  }
  // if (response.status==200){
  //     window.location.replace('http://127.0.0.1:8000/users/signup/');
  // } else {
  //     alert(response.status)
  // }
}

//사용자 정보 보내기
async function handleMock() {
  const response = await fetch("http://127.0.0.1:8000/users/", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "GET",
  });
  response_json = await response.json();
  return response_json;
}

//게시물 가져오기
async function getArticles() {
  const response = await fetch("http://127.0.0.1:8000/articles/", {
    method: "GET",
  });
  response_json = await response.json();
  return response_json;
}

//특정 게시물 가져오기
function articleDetail(article_id) {
  console.log(article_id);
  const url = `${frontend_base_url}/article_detail.html?id=${article_id}`;
  location.href = url;
}

//추천가게 받아오기
async function handleRecommend() {
  const response = await fetch("http://127.0.0.1:8000/recommends/", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "GET",
  });
  response_json = await response.json();
  return response_json;
}

async function getArticleDetail(article_id) {
  const response = await fetch(`${backend_base_url}/articles/${article_id}/`, {
    method: "GET",
  });
  response_json = await response.json();
  console.log(response_json);
  // 받아온 값을 json화 시키고 콘솔로그 확인
  // getArticleDetail() 안에 article_id 써주고, article_detail.js에도 getArticleDetail(article_id);실행

  return response_json;
}



//게시글 수정
async function patchArticle(article_id, title, content) {
  const articleData = {
    title: title,
    content: content,
  };
  console.log(article_id);
  const response = await fetch(`${backend_base_url}/articles/${article_id}/`, {
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "PATCH",
    body: JSON.stringify(articleData),
  });

  if (response.status == 200) {
    response_json = await response.json();
    return response_json;
  } else {
    alert(response.status);
  }
}

async function deleteArticle() {
  const response = await fetch(`${backend_base_url}/articles/${article_id}/`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "DELETE",
  });

  if (response.status == 204) {
    window.location.replace(`${frontend_base_url}/`); // 삭제가 되고나면 인덱스로 다시 이동하게함
  } else {
    alert(response.status);
  }
}

async function postComment(article_id, comment_content) {
  const commentData = {
    content: comment_content,
  };
  const response = await fetch(
    `${backend_base_url}/articles/${article_id}/comment/`,
    {
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
      method: "POST",
      body: JSON.stringify(commentData),
    }
  );

  if (response.status == 200) {
    return response;
  } else {
    alert(response.status);
  }
}

async function postLike(article_id) {
  const response = await fetch(
    `${backend_base_url}/articles/${article_id}/like/`,
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      method: "POST",
    }
  );

  if (response.status == 200) {
    response_json = await response.json();
    return response_json;
  } else {
    alert(response.status);
  }
}

async function deleteLike(article_id) {
  const response = await fetch(
    `${backend_base_url}/articles/${article_id}/like/`,
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      method: "DELETE",
    }
  );

  if (response.status == 200) {
    response_json = await response.json();
    return response_json;
  } else {
    alert(response.status);
  }
}

async function getLike(article_id) {
  const response = await fetch(
    `${backend_base_url}/articles/${article_id}/like/`,
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      method: "GET",
    }
  );

  if (response.status == 200) {
    response_json = await response.json();
    return response_json;
  } else {
    alert(response.status);
  }
}
