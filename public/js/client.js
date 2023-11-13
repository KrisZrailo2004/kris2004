// Клієнтський JavaScript для обробки взаємодії зі сторінками

// Функція для отримання списку постів


// Обробник для форми додавання поста
document.getElementById('addPostForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;

    // Відправити дані на сервер для створення поста
    fetch('/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body }),
    })
        .then((response) => response.json())
        .then((newPost) => {
            // Оновити список постів або перенаправити на сторінку зі списком
            console.log('Створено новий пост:', newPost);
            window.location.href = `/posts`;
            getPosts(); // Оновити список постів після створення
        })
        .catch((error) => {
            console.error('Помилка при створенні поста:', error);
        });
});

