console.log("로딩되었습니다.");

window.onload = async function checkLogin() {
  const payload = localStorage.getItem("payload");
  const parsed_payload = await JSON.parse(payload);
  const username = document.getElementById("username");
  const loginoutButton = document.getElementById("loginout");

  if (parsed_payload) {
    console.log("2");
    username.innerText = parsed_payload.username;
    loginoutButton.innerText = "로그아웃";
    loginoutButton.setAttribute("onclick", "handleLogout()");
  } else {
    console.log("3");
    console.log(loginoutButton);
    username.innerText = "로그인해주세요";
    loginoutButton.innerText = "로그인";
    loginoutButton.setAttribute("onclick", "location.href='/sign.html'");
  }
};

// 상세보기 모달
function Modal() {
  function onClick() {
    document.querySelector(".modal_box").style.display = "block";
    loadDetailArticles();
  }
  function offClick() {
    document.querySelector(".modal_box").style.display = "none";
  }

  document.getElementById("img_modal").addEventListener("click", onClick);
  document.querySelector(".modal_close").addEventListener("click", offClick);
}
// 상세보기 모달 끝
