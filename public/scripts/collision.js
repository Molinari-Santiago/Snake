<<<<<<< HEAD
// collision.js — Funciones para detectar choques
// Se separan las colisiones para que el código del juego sea más fácil de leer.

=======
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
function checkWallCollision(head, cols, rows) {
    return (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= cols ||
        head.y >= rows
    );
}

function checkSelfCollision(snakeBody) {
    const head = snakeBody[0];

<<<<<<< HEAD
    // Empieza desde 1 porque la posición 0 es la cabeza.
=======
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
    for (let i = 1; i < snakeBody.length; i++) {
        if (head.x === snakeBody[i].x && head.y === snakeBody[i].y) {
            return true;
        }
    }

    return false;
}

function checkSnakeVsSnake(activeSnake, otherSnake) {
    const head = activeSnake.body[0];

<<<<<<< HEAD
    // Comprueba si la cabeza de la serpiente activa choca con el cuerpo de la otra.
=======
>>>>>>> 3e2c6283ed0b685975ca27d0846ae9e60c85a027
    return otherSnake.body.some((part) => {
        return head.x === part.x && head.y === part.y;
    });
}

function checkFoodCollision(head, food) {
    return head.x === food.x && head.y === food.y;
}