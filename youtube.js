let youtubeHTML='';
youtubeVideos.forEach((video)=>{
youtubeHTML+=`<div class="video">
<div class="video-thumbnail">
    <a href="${video.video.videoLink}"><img class="thumbnail" src="${video.video.thumbNail}"></a>
    <div class="timestamp">
        ${video.video.time}
    </div>
</div>
<div class="channel-and-stats">
    <div class="channels">
        <a href="${video.channel.channelLink}"><img class="profile" src="${video.channel.channelProfile}"></a>
    </div>
    <div class="video-info">
        <p class="title">${video.videoInfo.title}</p>
        <p class="author">${video.videoInfo.author}</p>
        <p class="stats">${video.videoInfo.stats}</p>
    </div>
</div>
</div>`
})
document.querySelector('.video-grid').innerHTML=youtubeHTML;