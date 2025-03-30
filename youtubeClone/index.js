import {contentInfo} from './content.js';

function renderContents(){
    let video_grid_Elem = document.querySelector(`.video-grid`);

    contentInfo.forEach(content => {
        let duration = getDuration(content.duration.days, content.duration.hours,
            content.duration.minutes, content.duration.seconds
        );
        let publishDate = getPublishDate(content.publish_date.years,
            content.publish_date.months,
            content.publish_date.days,
            content.publish_date.hours,
            content.publish_date.minutes,
            content.publish_date.seconds
        );

        video_grid_Elem.innerHTML += 
        `
            <div class="content-container">
                <div class="top-section">
                    <a href="${content.content_link}"><img src="${content.image}" alt="image"></a>
                    <p>${duration}</p>
                </div>

                <div class="bottom-section">
                    <div class="profile-container">
                        <a href="${content.profile_link}"><img src="${content.profile_picture}" alt="image1"></a>
                    </div>

                    <div class="about-video">
                        <a href="${content.content_link}" class="title">${content.title}</a>
                        <a href="${content.profile_link}" class="about-text content_creator_name">${content.content_creator_name}</a>
                        <p class="about-text">${content.views} views &middot ${publishDate}</p>
                    </div>
                </div>
            </div>
        `
    })
}

function getDuration(days, hours, minutes, seconds) {
    days = days.toString().padStart(2, '0');
    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');

    if (days !== "00") return `${days}:${hours}:${minutes}:${seconds}`;
    if (hours !== "00") return `${hours}:${minutes}:${seconds}`;
    if (minutes !== "00") return `${minutes}:${seconds}`;
    return `${seconds}`;
}

function getPublishDate(years, months, days, hours, minutes, seconds){
    if(years) return years == 1 ? `${years} year ago` : `${years} years ago`;
    if(months) return months == 1 ? `${months} month ago` : `${months} months ago`;
    if(days) return days == 1 ? `${days} day ago` : `${days} days ago`;
    if(hours) return hours == 1 ? `${hours} hour ago` : `${hours} hours ago`;
    if(minutes) return minutes == 1 ? `${minutes} minute ago` : `${minutes} minutes ago`;
    return seconds == 1 ? `${seconds} second ago` : `${seconds} seconds ago`;



}

renderContents();