document.addEventListener("DOMContentLoaded", () => {
    const squares = document.querySelectorAll(".grid div");
    const scoreDisplay = document.querySelector("span");
    const startBtn = document.querySelector(".start");

    const width = 10;
    let currentIndex = 0; //first div within the grid
    let appleIndex = 0; //first div within the grid
    let currentSnake = [2, 1, 0];

    let direction = 1;
    let score = 0;
    let speed = 0.9;
    let intervalTime = 0;
    let interval = 0;

    //starting and restarting the game
    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove("snake"));
        squares[appleIndex].classList.remove("apple");
        clearInterval(interval);
        score = 0;

        // generating a random apple
        direction = 1;
        scoreDisplay.innerText = score;
        intervalTime = 1000;
        currentSnake = [2, 1, 0];
        currentIndex = 0;
        currentSnake.forEach(index => squares[index].classList.add("snake"));
        interval = setInterval(moveOutcomes, intervalTime);

        // Call randomApple to generate a new apple
    randomApple();
    }

    

    //functions for special outcomes
    function moveOutcomes() {
        //snake hitting border
        if (
            (currentSnake[0] + width >= width * width && direction === width) || //if snake hits bottom
            (currentSnake[0] % width === width - 1 && direction === 1) || // if snake hits right wall
            (currentSnake[0] % width === 0 && direction === -1) || // if snake hits left wall
            (currentSnake[0] - width < 0 && direction === -width) || // if snake hits the top
            squares[currentSnake[0] + direction].classList.contains("snake")
        ) {
            return clearInterval(interval); // this will clear the intervals if any of the above happen
        }

        const tail = currentSnake.pop();
        squares[tail].classList.remove("snake");
        currentSnake.unshift(currentSnake[0] + direction);

        //snake getting apple
        if (squares[currentSnake[0]].classList.contains("apple")) {
            squares[currentSnake[0]].classList.remove("apple");
            squares[tail].classList.add("snake");
            currentSnake.push(tail);

            //randomapple
            score++;
            scoreDisplay.textContent = score;
            clearInterval(interval);
            intervalTime = intervalTime * speed;
            interval = setInterval(moveOutcomes, intervalTime);
            // Call randomApple to generate a new apple
    randomApple();
        }
        squares[currentSnake[0]].classList.add("snake");

      
    }

    //generate new apple once apple is eaten
    function randomApple() {
        do {
            appleIndex = Math.floor(Math.random() * squares.length);
        } while (squares[appleIndex].classList.contains("snake")); //making sure apples dont appear on the snake
        squares[appleIndex].classList.add("apple");

    }

    //assign functions to keycodes
    function control(e) {
        squares[currentIndex].classList.remove("snake"); //removes the snake class from all the squares

        if (e.keyCode === 39) {
            direction = 1; // if the right arrow key is pressed,the snake will travel one square to the right
        } else if (e.keyCode === 38) {
            direction = -width; // if the up arrow key is pressed the snake will travel back ten divs (it appears to go up )
        } else if (e.keyCode === 37) {
            direction = -1; // if the left arrow key is pressed the snake will travel back 1 div (appearing to go left)
        } else if (e.keyCode === 40) {
            direction = width; // if the down arrow key is pressed the snake will travel 10 divs (appearing to go down)
        }
    }

    document.addEventListener("keyup", control);
    startBtn.addEventListener("click", startGame);
});
