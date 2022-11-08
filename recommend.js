async function loadRecommends() {
    recommends = await handleRecommend()
    console.log(recommends)
    const recommend_list = document.getElementById("recommend_container")

    recommends.forEach(recommend => {
        const newRecommend = document.createElement("div")
        newRecommend.classList.add('grid-product')

        const recommendImage = document.createElement("img")
    
        const bodyRecommend = document.createElement("div")
        bodyRecommend.classList.add('grid-detail')

        const bodyName = document.createElement("p")
        const bodyContent = document.createElement("p")

        recommendImage.setAttribute("src", `${recommend.store_image}`)
        newRecommend.setAttribute("id", recommend.id)
        bodyName.innerText = recommend.store_name
        bodyContent.innerText = recommend.store_rating
        bodyContent.innerText = recommend.store_address
        
        bodyRecommend.appendChild(bodyName)
        bodyRecommend.appendChild(bodyContent)
        newRecommend.appendChild(bodyRecommend)
        newRecommend.appendChild(recommendImage)
        newRecommend.setAttribute("onclick", "")
        recommend_list.appendChild(newRecommend)
    });
}