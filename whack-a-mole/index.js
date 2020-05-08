var intervalId = null;

const resetMoles = (cnt = 1) => {
    const moleDivs = document.querySelectorAll(".mole");
    moleDivs.forEach(moleDiv => {
        moleDiv.classList.remove('mole');
        moleDiv.removeEventListener('click', clickCell);
    });

    var time = document.getElementById('time');
    time.textContent = parseInt(time.textContent) - 1;
    if(time.textContent === '0'){
        clearInterval(intervalId);
        alert("Fim de jogo, " + document.getElementById('score').textContent + " pontos")
        return ;
    }

    placeMoles(cnt);
};

const placeMoles = (cnt = 1) => {
    var divs = document.querySelectorAll(".cell");
    var newDivs = shuffle(divs);
    for(let i=0;i<cnt;i++){
        newDivs[i].classList.add('mole');
        newDivs[i].addEventListener('click', clickCell);
    }
};

const shuffle = (arr) => {
    newArray = [];
    const n = arr.length;
    for(let i=0;i<n;i++){
        newArray.push(i);
    }
    for(let i=0;i<n;i++){
        let j = i + Math.floor((Math.random()*(n - i - 1) + 0.5));
        let aux = newArray[i];
        newArray[i] = newArray[j];
        newArray[j] = aux;
    }
    for(let i=0;i<n;i++){
        newArray[i] = arr[newArray[i]];
    }
    return newArray;
};

const clickCell = () => {
    var score = document.getElementById('score');
    score.textContent = parseInt(score.textContent) + 1;
};

intervalId = setInterval(resetMoles, 1000, 1);