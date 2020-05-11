document.addEventListener('DOMContentLoaded', () => {
    snake = [2, 1, 0];

    var di = 0, dj = 1;
    var n = 20;

    let moved = true;

    let speed = 400, speedChg = 50;

    const control = ({key}) => {
        if(!moved)
            return ;
        console.log(key);
        if(key === 'w' || key === 'ArrowUp'){
            if (dj !== 0) {
                di = -1;
                dj = 0;
            }
        }
        else if(key === 'a' || key === 'ArrowLeft'){
            if(di !== 0) {
                di = 0;
                dj = -1;
            }
        }
        else if(key === 'd' || key === 'ArrowRight'){
            if(di !== 0){
                di = 0;
                dj = 1;
            }    
        }
        else if(key === 's' || key === 'ArrowDown'){
            if(dj !== 0) {
                dj = 0;
                di = 1;
            }
        }
        moved = false;
    };

    const pos = (i, j) => { return i*n + j; };

    const valid = (i, j) => {
        let sq = document.querySelectorAll(".grid div");
        let p = pos(i, j);
        return (i >= 0 && j >= 0 && i < n && j < n && !sq[p].classList.contains('snake'));
    };

    const replaceApple = () => {
        document.querySelectorAll('.apple').forEach(e => {
            e.classList.remove('apple');
        });
        let freeSquares = document.querySelectorAll(".grid div:not(.snake)");
        let idx = Math.floor(Math.random()*freeSquares.length);
        freeSquares[idx].classList.add('apple');
    };

    const increaseScore = () => {
        speed = speed - speedChg;
        speedChg = speedChg * 0.9;
        clearInterval(intervalId);
        intervalId = setInterval(move, speed);
        let score = document.getElementById('score');
        score.textContent = parseInt(score.textContent) + 1;
    };

    const move = () => {
        let i = Math.floor(snake[0]/n);
        let j = snake[0]%n;
        let ni = i + di;
        let nj = j + dj;
        moved = true;
        if(valid(ni, nj)){
            snake.unshift(pos(ni, nj));
            let sq = document.querySelectorAll(".grid div");
            sq[pos(ni, nj)].classList.add('snake');
            if(sq[pos(ni, nj)].classList.contains('apple')){
                increaseScore();    
                replaceApple();
            }
            else
                sq[snake.pop()].classList.remove('snake');
        }
        else{
            console.log("Lost game");
            clearInterval(intervalId);
        }
    };
    document.addEventListener('keyup', control);
    replaceApple();
    intervalId = setInterval(move, speed);
});