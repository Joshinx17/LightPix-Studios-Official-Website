// scripts.js
document.addEventListener('DOMContentLoaded', function () {
    const stars = document.querySelectorAll('.stars');

    stars.forEach(starContainer => {
        starContainer.addEventListener('click', function (event) {
            const target = event.target;
            if (target.tagName === 'SPAN') {
                const allStars = target.parentNode.querySelectorAll('span');
                let rating = Array.from(allStars).indexOf(target) + 1;
                allStars.forEach((star, index) => {
                    if (index < rating) {
                        star.style.color = '#ff0';
                    } else {
                        star.style.color = '#ccc';
                    }
                });
            }
        });
    });
});
