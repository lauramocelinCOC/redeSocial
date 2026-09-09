document.addEventListenen("DOMContentLoaded", ()=>{
    const likeBtn = document.querySelector(".like-btn");
    const pstMedia = document.querySelector("post-media");
    if (!likeBtn) return;

    const likesCountSpan = likeBtn.querySelector(".likes-count");
    const bookmarkBtn = document.querySelector(".bookmark-btn");

    let isLiked = false;
    let baseLikes = 0;
    
})