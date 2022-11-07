async function profile_update(){
    // email과 password를 변경 불가능한 객체로 지정하고 값 받아오기
    const username = document.getElementById("profileusername").value
    const password = document.getElementById("profilepassword").value
    console.log(username, password)
    // async와 await으로 해당 반응이 올때까지 대기 signup이 오면 content-type을 json형식으로 받아서
    // body부분을 JSON.stringify json글씨 형식으로 바꿔서 post한다
    const response = await fetch('http://127.0.0.1:8000/users/<int:user_id>/', {
        headers:{
            'content-type':'application/json',
        },
        method:'POST',
        body: JSON.stringify({
            "username":username,
            "email":email,
            "password":password
        })
    })

    console.log(response)

}