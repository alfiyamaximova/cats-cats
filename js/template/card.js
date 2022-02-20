export function buildCard(cat) {
    const ratingStarImages = buildRatingStarImages(cat.rate);

    return `<div class="card container-shadow">
                <div class="card__image"
                    style="background-image: url(${cat.img_link})">
                </div>
                <h3>${cat.name}</h3>
                <div class="card__rating">
                    ${ratingStarImages}
                </div>
            </div>`;
}

const max_rate = 10;

function buildRatingStarImages(rate) {
    let result = '';

    // cat-fill.svg
    for (let i = 1; i <= rate; i++) {
        result += `<img class="card__rating_star-image" src="img/cat-fill.svg">\n`
    }

    // cat-stroke.svg
    for (let i = rate + 1; i <= max_rate; i++) {
        result += `<img class="card__rating_star-image" src="img/cat-stroke.svg">\n`
    }

    return result;
}