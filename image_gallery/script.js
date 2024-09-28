const apiKey = "ykWPRzplJUs71JXAadgQwSjwajzcN8BQPrL2SPaXx7Q";
const gallery = document.getElementById('gallery');
const input = document.getElementById('searchInput');
const button = document.getElementById('searchButton');


input.focus();
input.setAttribute('autocomplete', 'off');

// oтображения изображений
const displayImages = (images) => {
    gallery.innerHTML = '';

    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.urls.small;
        imgElement.alt = image.alt_description || 'Image';
        gallery.appendChild(imgElement);
    });
};

// поиска изображений
const searchImages = async (keyword) => {
    const url = `https://api.unsplash.com/search/photos?query=${keyword}&per_page=30&orientation=landscape&client_id=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayImages(data.results);
    } catch (error) {
        console.error('Error fetching images:', error);
    }
};

// Загрузка изображений при старте приложения 
window.onload = () => {
    searchImages('pink');
};

// Обработчик для кнопки поиска
button.addEventListener('click', () => {
    const keyword = input.value.trim();
    if (keyword) {
        searchImages(keyword);
    }
});

// Отправка запроса нажатием Enter
input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const keyword = input.value.trim();
        if (keyword) {
            searchImages(keyword);
        }
    }
});

// Добавление крестика для очистки поля
const addClearButton = () => {
    const clearButton = document.createElement('span');
    clearButton.innerHTML = '✖';
    clearButton.classList.add('clear-button');
    clearButton.style.color = 'rgb(251, 155, 201)';
    clearButton.style.cursor = 'pointer';
    clearButton.style.position = 'absolute';
    clearButton.style.right = '10px';
    clearButton.style.top = '25%';
    clearButton.style.transform = 'translateY(-50%)';
    clearButton.style.display = 'none'; 

    
    input.addEventListener('input', () => {
        if (input.value.trim() !== '') {
            clearButton.style.display = 'block';
        } else {
            clearButton.style.display = 'none';
        }
    });

    // Удаление текста
    clearButton.addEventListener('click', () => {
        input.value = '';
        input.focus();
        clearButton.style.display = 'none';
        searchImages('pink'); 
    });

    document.querySelector('.header__container').appendChild(clearButton);
};


addClearButton();