document.addEventListener("DOMContentLoaded", () => {
    const cover = 'img/snake.png';
    const figs = [
        {
            'path': 'img/dog.png'
        },
        {
            'path': 'img/cat.png'
        },
        {
            'path': 'img/elephant.png'
        },
        {
            'path': 'img/cow.png'
        },
        {
            'path': 'img/horse.png'
        },
        {
            'path': 'img/goat.png'
        }
    ];
    var cards = [];
    var clicked = [];

    const increaseScore = () => {
        console.log("increase score");
        var scoreText = document.getElementById('score');
        console.log(scoreText);
        var score = parseInt(scoreText.innerText) + 1;
        scoreText.innerText = score;
        if(score === cards.length/2){
            alert('You won! Resetting grid...');
            initBoard();
        }
    }

    const checkMatch = () => {
        console.log(clicked);
        var ci = clicked[0], cj = clicked[1];
        if(ci.src === cj.src){
            ci.removeEventListener('click', clickCard);
            cj.removeEventListener('click', clickCard);
            increaseScore();
        }
        else{
            ci.setAttribute('src', cover);
            cj.setAttribute('src', cover);
        }
        clicked = [];
    };

    const clickCard = ({target}) => {
        var id = target.dataset.id;
        console.log("clicou " + id)
        clicked.push(target); 
        target.setAttribute('src', cards[id].path);
        if(clicked.length == 2){
            setTimeout(checkMatch, 500);
        }
    };

    const shuffle = (arr) => {
        const n = arr.length;
        for(var i=0;i<n;i++){
            var j = i + Math.floor((Math.random()*(n - i - 1) + 0.5));
            var aux = arr[i];
            arr[i] = arr[j];
            arr[j] = aux;
        }
    };

    const initBoard = () => {
        cards = figs.concat(figs);     
        shuffle(cards);

        var grid = document.getElementsByClassName('grid')[0];
        grid.innerHTML = "";
        document.getElementById('score').innerText = 0;
        for(var i=0;i<cards.length;i++){
            var card = document.createElement('img');
            card.setAttribute('src', cover);
            card.setAttribute('data-id', i);
            card.addEventListener('click', clickCard);
            grid.appendChild(card);
        }
    };

    initBoard();
});