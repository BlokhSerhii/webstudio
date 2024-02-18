
// обробник перемикача логотипа
const homePage = document.getElementById("home");
const toggleLogoIcon = document.querySelector(".navbar__logo_icon");
const toggleLogoCaption = document.querySelector(".navbar__logo_caption");
const toggleLan = document.querySelector(".menubar__lang");

window.addEventListener("scroll", function() {
  const rect = homePage.getBoundingClientRect();

  if(rect.bottom <= 0) {

    toggleLogoIcon.classList.add('showLogoIcon');
    toggleLogoCaption.classList.add('hiddenLogoCaption');
    toggleLan.classList.add('hiddenLang');

    // if(window.innerWidth > 1000) toggleLan.classList.add('hidden-lan');
  } 
  else {
    toggleLogoIcon.classList.remove('showLogoIcon');
    toggleLogoCaption.classList.remove('hiddenLogoCaption');
    toggleLan.classList.remove('hiddenLang');
  }
});
// ------------------------------


// обробник зміни вистоти header
document.addEventListener('DOMContentLoaded', function () {
  
  const startPage = document.querySelector('.start-page');
  const startBtn = document.querySelector('.start-page__btn');

  startBtn.addEventListener('click', function () {
    startPage.style.display = 'none';
  });
});
// ------------------------------

// обробник показника курсора миші
document.addEventListener('DOMContentLoaded', function () {
  const rectangle = document.getElementById('rectangle');

  document.addEventListener('mousemove', function (event) {
      const x = event.clientX;
      const y = event.clientY;

      const scrollX = window.scrollX || window.pageXOffset;
      const scrollY = window.scrollY || window.pageYOffset;

      rectangle.style.left = x + scrollX + 'px';
      rectangle.style.top = y + scrollY + 'px';

      rectangle.style.display = 'block';
  });

  document.addEventListener('mouseleave', function () {

      rectangle.style.display = 'none';
  });
});
// ------------------------------

// обробник зміни вистоти header
function setHeaderHeight() {
  
  const header = document.querySelector('.header');
  let viewportHeight = window.innerHeight;
  let viewportWidth = window.innerWidth;
  let headerHeight = Math.max(viewportHeight, viewportWidth);

  if(viewportWidth < 800 && (viewportWidth < 800 || viewportHeight < 800)) {
    header.style.height = headerHeight + 'px';
  } 
    else {
      header.style.height = '';
    }
}

window.addEventListener('load', setHeaderHeight);
window.addEventListener('orientationchange', setHeaderHeight);
// ------------------------------

// обробник додавання класу active копкам menubar
document.addEventListener("DOMContentLoaded", function() {
  const sections = document.querySelectorAll(".page");
  const menubarLinks = document.querySelectorAll(".menubar__link");
  let currentSectionIndex = 0;

  window.addEventListener("scroll", function() {

    sections.forEach(function(section, index) {
      const rect = section.getBoundingClientRect();

      if (
        rect.top <= window.innerHeight / 2 &&
        rect.bottom >= window.innerHeight / 2
      ) {
        currentSectionIndex = index;
      }
      opacityPage(currentSectionIndex);
    });

    menubarLinks.forEach(function(link, index) {
      link.classList.remove("menuActive");
      if (index === currentSectionIndex) {
        link.classList.add("menuActive");
      }
    });

    function opacityPage(index) {

      if(index != 0) {

        sections.forEach(function(section, index) {
          section.classList.remove("pageActive");
          if (index === currentSectionIndex) {
            section.classList.add("pageActive");
          }
        });
      }
      else {
        sections.forEach(function(section, index) {
          section.classList.remove("pageActive");
        });
      };
    }
  });

  // Обробка переходу по пунктах меню menubar
  menubarLinks.forEach(function(link, index) {
    link.addEventListener("click", function(event) {

      // Прокручуємо до відповідньої секції
      sections[index].scrollIntoView({ behavior: "smooth" });

      menubarLinks.forEach(function(menuLink) {
        menuLink.classList.remove("menuActive");
      });

      link.classList.add("menuActive");
    });
  });
});
// ------------------------------

// обробник перемикача мови
const toggleLang = document.querySelector('.toggle-lang');
const thumbLangList = document.querySelector('.select-lang__thumb');
const langList = document.querySelector('.select-lang__list');

toggleLang.addEventListener('click', function (event) {

  event.stopPropagation();
  langList.classList.toggle('langListOpen');
  thumbLangList.classList.toggle('activelangThumb');
});

document.addEventListener('click', function () {

  langList.classList.remove('langListOpen');
  thumbLangList.classList.toggle('activelangThumb');
});
// ------------------------------

// обробник перемикача бургера
const toggleButton = document.querySelector('.toggle-burger');
const overlay = document.querySelector('.overlay');

toggleButton.addEventListener('click', function() {

  toggleButton.classList.toggle('burgerActive');
  overlay.classList.toggle('overlayOpen');
});


overlay.addEventListener('click', function(event) {

  if (overlay.contains(event.target)) {

    toggleButton.classList.toggle('burgerActive');
    overlay.classList.toggle('overlayOpen');
  }
});
// ------------------------------

// обробник виведення модального вікна портфоліо  
const portfolioBtn = document.querySelector('.projects-slider__loop');

portfolioBtn.addEventListener('click', function() {

    const src = portfolioBtn.closest('.projects-slider__container').querySelector('.active-project__thumb');
    
    showMessageIcon(src);
});

// ------------------------------

// обробка відправки повідомленяя
document.addEventListener('DOMContentLoaded', function () {

  const form = document.getElementById('form');

  form.addEventListener('submit', formSend);

  async function formSend(event) {

    event.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);
    formData.append('file', formFile.files[0]);

    if (error === 0 ) {
      showSending();

      let response = await fetch ('sendmail.php', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        let result = await response.json();

        alert(result.message);
        formPreview.innerHTML = '';
        form.reset();
        removeSending();
      }
        else {
          alert.apply('Error sending email!');
        };
    }
      else {
        alert('Fill in the required fields!');
      };
  }


  function formValidate(form) {

    let error = 0;
    let formReq = document.querySelectorAll('.req');

    for (let index = 0; index < formReq.length; index++) {

      const input = formReq[index];
      formRemoveError(input);

      if (input.classList.contains('email')) {

        if (emailTest(input)) {
          formAddError(input);
          error++;
        };
      }
        else {
          if (input.value === '') {
            formAddError(input);
            error++;
          };
        }
    }

    return error;
  }

  function formAddError(input) {
    input.classList.add('error');
  }

  function formRemoveError(input) {
    input.classList.remove('error');
  }

  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }

  const formFile = document.getElementById('file');
  const formPreview = document.getElementById('preview');

  formFile.addEventListener('change', function () {

    var reader = new FileReader();

    reader.onload = function (event) {
      formPreview.textContent = formFile.files[0].name;
    };

    reader.onerror = function (event) {
      alert ("Error upload file!");
    };

    reader.readAsDataURL(formFile.files[0]);
  })
})
// ------------------------------

//обробка виведення тексту заголовку
document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('.header-title__headline');
  const headLines = document.querySelectorAll('.headLine');
  let currentIndex = 0;

  function animateLetters(element) {
      const letters = element.textContent.trim().split('');
      header.textContent = '';

      return new Promise((resolve, reject) => {
          let letterIndex = 0;
          const intervalLetter = setInterval(() => {
              if (letterIndex < letters.length) {
                  header.textContent += letters[letterIndex];
                  letterIndex++;
              } else {
                  clearInterval(intervalLetter);
                  resolve();
              }
          }, 150);
      });
  }

  function hideLetters() {
      return new Promise((resolve, reject) => {
          let letters = header.textContent.trim().split('');
          let letterIndex = letters.length - 1;
          const intervalLetter = setInterval(() => {
              if (letterIndex >= 0) {
                  header.textContent = header.textContent.slice(0, -1);
                  letterIndex--;
              } else {
                  clearInterval(intervalLetter);
                  resolve();
              }
          }, 100);
      });
  }

  function animateHeadlines() {
      animateLetters(headLines[currentIndex])
          .then(() => {
              return new Promise((resolve, reject) => {
                  setTimeout(() => {
                      hideLetters()
                          .then(() => {
                              currentIndex = (currentIndex + 1) % headLines.length;
                              resolve();
                          });
                  }, 1500);
              });
          })
          .then(() => {
              animateHeadlines();
          });
  }

  setTimeout(() => {
    animateHeadlines();
  }, 1500)
});
// ------------------------------