document.addEventListener('DOMContentLoaded', function () {
    const sliderContainer = document.querySelector('.projects-slider__container');
    const leftControl = document.querySelector('.projects-left');
    const rightControl = document.querySelector('.projects-right');
    const activeThumb = document.querySelector('.active-project__thumb');
    const indicatorsContainer = document.querySelector('.projects-slider__indicators');
    const projectItems = document.querySelectorAll('.project__icon');

    let currentProjectIndex = 0;

    function showProject(index) {

        const indicators = document.querySelectorAll('.projects-indicator__label');
        const numbers = document.querySelectorAll('.projects-indicator__text');

        activeThumb.src = projectItems[index].src;

        indicators.forEach((ind, i) => {
            ind.classList.remove('activeProjectLabel');
        });

        indicators[index].classList.add('activeProjectLabel');

        activeThumb.src = projectItems[index].src;

        numbers.forEach((num, i) => {
            num.classList.remove('activeProjectNumber');
        });

        numbers[index].classList.add('activeProjectNumber');
    }

    function changeProject(index) {
        currentProjectIndex = index;
        showProject(currentProjectIndex);
    }

    leftControl.addEventListener('click', function () {
        changeProject((currentProjectIndex - 1 + projectItems.length) % projectItems.length);
    });

    rightControl.addEventListener('click', function () {
        changeProject((currentProjectIndex + 1) % projectItems.length);
    });

    projectItems.forEach((el, index ) => {
        const indicator = document.createElement('div');
        indicator.classList.add('projects-indicator');

        const label = document.createElement('div');
        label.classList.add('projects-indicator__label');

        const text = document.createElement('div');
        text.classList.add('projects-indicator__text');
        number = index + 1;
        number < 10 ? number = '0' + number : number = number;
        text.innerText = number;

        indicator.appendChild(text);
        indicator.appendChild(label);
        indicatorsContainer.appendChild(indicator);
    });

    showProject(currentProjectIndex);
});



document.addEventListener('DOMContentLoaded', function () {
    const sliderContainer = document.querySelector('.reviews-slider__container');
    const reviewsData = document.querySelector('.reviews-data');
    const reviews = reviewsData.querySelectorAll('.review');
    const indicatorsContainer = document.querySelector('.reviews-slider__indicators');
    const headerAvatar = document.querySelector('.reviews-slider__header_avatar img');
    const captionName = document.querySelector('.reviews-slider__caption_name');
    const captionProfession = document.querySelector('.reviews-slider__caption_profession');
    const contentText = document.querySelector('.reviews-slider__content_text');
    let currentReviewIndex = 0;
    let intervalId;

    function showReview(index) {
        const currentReview = reviews[index];
        headerAvatar.src = currentReview.querySelector('.review-foto').src;
        captionName.textContent = currentReview.querySelector('.review-name').textContent;
        captionProfession.textContent = currentReview.querySelector('.review-profession').textContent;
        contentText.textContent = currentReview.querySelector('.review-text').textContent;

        reviews.forEach(review => review.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('activeReview'));

        reviews[index].classList.add('active');
        indicators[index].classList.add('activeReview');
    }

    function nextReview() {
        currentReviewIndex = (currentReviewIndex + 1) % reviews.length;
        showReview(currentReviewIndex);
    }

    function startSlider() {
        intervalId = setInterval(nextReview, 4000);
    }

    function stopSlider() {
        clearInterval(intervalId);
    }

    sliderContainer.addEventListener('mouseenter', stopSlider);
    sliderContainer.addEventListener('mouseleave', startSlider);

    for (let i = 0; i < reviews.length; i++) {
        const indicator = document.createElement('div');
        indicator.classList.add('reviews-slider__indicator');
        indicator.addEventListener('click', () => {
            currentReviewIndex = i;
            showReview(currentReviewIndex);
        });
        indicatorsContainer.appendChild(indicator);
    }

    const indicators = document.querySelectorAll('.reviews-slider__indicator');

    showReview(0);
    startSlider();
});