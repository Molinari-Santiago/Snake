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

    for (let i = 1; i < snakeBody.length; i++) {
        if (head.x === snakeBody[i].x && head.y === snakeBody[i].y) {
            return true;
        }
    }

    return false;
}

function checkSnakeVsSnake(activeSnake, otherSnake) {
    const head = activeSnake.body[0];

    return otherSnake.body.some((part) => {
        return head.x === part.x && head.y === part.y;
    });
}

function checkFoodCollision(head, food) {
    return head.x === food.x && head.y === food.y;
}