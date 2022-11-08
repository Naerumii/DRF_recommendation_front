const urlParams = new URLSearchParams(window.location.search);
const article_id = urlParams.get("id");
let liked = false;

async function loadDetailArticles(article_id) {
  article = await getArticleDetail(article_id);

  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const image = document.getElementById("image");
  const restaurant = document.getElementById("restaurant");
  const content = document.getElementById("content");
  const like = document.getElementById("like");
  const time = document.getElementById("time");

  title.innerText = article.title;
  author.innerText = article.user;
  image.setAttribute("src", `${backend_base_url}${article.image}`);
  content.innerText = article.content;
  restaurant.innerText = article.restaurants;
  time.innerText = article.created_at;
  like.innerText = article.likes;

  const comment_section = document.getElementById("comment_section");
  comment_section.innerHTML = "";

  for (let i = 0; i < article.comment_set.length; i++) {
    const old_comment = document.createElement("span");
    const new_comment = document.createElement("p");
    old_comment.innerText = article.comment_set[i].user;
    new_comment.innerText = article.comment_set[i].content;
    comment_section.appendChild(new_comment);
    comment_section.appendChild(old_comment);
  }

  const update_button = document.getElementById("update_button");
  const delete_button = document.getElementById("delete_button");
  update_button.style.visibility = "";
  delete_button.style.visibility = "";
}

function updateMode() {
  const title = document.getElementById("title");
  const content = document.getElementById("content");
  title.style.visibility = "hidden";
  content.style.visibility = "hidden";

  const input_title = document.createElement("textarea"); // 수정할 수 있는 입력창만들기
  input_title.setAttribute("id", "input_title");
  input_title.innerText = title.innerHTML; // 안하면 공란처리됨

  const input_content = document.createElement("textarea"); // 수정할 수 있는 입력창만들기 title,content 둘다 해줘야함. 안그러면 안생김
  input_content.setAttribute("id", "input_content");
  input_content.innerText = content.innerHTML; // 안하면 공란처리됨
  input_content.rows = 3;

  const body = document.body;
  body.insertBefore(input_title, title);
  body.insertBefore(input_content, content);

  const update_button = document.getElementById("update_button");
  update_button.setAttribute("onclick", "updateArticle()");
  // 업데이트 버튼을 가져오고 클릭시 updateArticle 함수 실행
}
//  구글링할때 Element hide

async function updateArticle() {
  let input_title = document.getElementById("input_title");
  let input_content = document.getElementById("input_content");
  console.log(input_title.value, input_content.value);

  const article = await patchArticle(
    article_id,
    input_title.value,
    input_content.value
  ); //>>api.js에서 마저 작성

  input_title.remove();
  input_content.remove(); // 수정하기 눌러서 기존 내용없애주기.

  const title = document.getElementById("title"); // 35.36코드에 title.style.visibility = "hidden" 없애놨으니까
  const content = document.getElementById("content"); // 불러서
  title.style.visibility = "visible"; // 다시 보이게 !
  content.style.visibility = "visible";

  update_button.setAttribute("onclick", "updateMode()"); // 다시 클릭하면 위의 코드 38 부분이 실행됨

  loadDetailArticles(article_id); // 다시 한 번. 맨 위의 함수 실행
}

async function removeArticle() {
  await deleteArticle(article_id);
}

////////////댓글작성///////////////////////////////////////////////////////
async function writeComment() {
  const comment_content = document.getElementById("comment_content");
  const comment = await postComment(article_id, comment_content.value);
  loadDetailArticles(article_id);
  comment_content.value = "";
}

loadDetailArticles(article_id);
