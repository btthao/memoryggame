const allCards = [{
        name: 'frenchie',
        img: './images/frenchie.png'
    },
    {
        name: 'frenchie',
        img: './images/frenchie.png'
    },
    {
        name: 'corgy',
        img: './images/corgy.png'
    },
    {
        name: 'corgy',
        img: './images/corgy.png'
    },
    {
        name: 'husky',
        img: './images/husky.png'
    },
    {
        name: 'husky',
        img: './images/husky.png'
    },
    {
        name: 'poodle',
        img: './images/poodle.png'
    },
    {
        name: 'poodle',
        img: './images/poodle.png'
    },
    {
        name: 'labrador',
        img: './images/labrador.png'
    },
    {
        name: 'labrador',
        img: './images/labrador.png'
    },
    {
        name: 'golden retriever',
        img: './images/golden.png'
    },
    {
        name: 'golden retriever',
        img: './images/golden.png'
    }
]


const grid = document.querySelector('.grid-space');
const result = document.querySelector('#result');
let playerChoice = [];
let choiceId = [];
let points = 0;
const reset = document.querySelector('.reset');

function gameBoard() {
    reset.innerHTML = 'Reset';
    allCards.sort(() => 0.5 - Math.random());
    for (var i = 0; i < allCards.length; i++) {
        let card = document.createElement('img');
        card.setAttribute('src', './images/balloon.png');
        card.setAttribute('data-id', i);
        grid.appendChild(card);
    }
    play();
}

function play() {
    let allImg = document.querySelectorAll('img');
    let lock = false;

    allImg.forEach(function(singlecard) {
        singlecard.addEventListener('click', function() {
            if (!lock) {
                let cardId = this.getAttribute('data-id');
                singlecard.src = allCards[cardId].img;
                if (!choiceId.includes(cardId)) {
                    playerChoice.push(allCards[cardId].name);
                    choiceId.push(cardId);
                }

                if (choiceId.length === 2) {
                    lock = true;
                    setTimeout(compare, 500);
                }
            }

        })
    })


    function compare() {
        let choice1 = playerChoice[0];
        let choice2 = playerChoice[1];

        if (choice1 === choice2) {

            allImg[choiceId[0]].src = './images/pink.png';
            allImg[choiceId[1]].src = './images/pink.png';
            allImg[choiceId[0]].style.pointerEvents = 'none';
            allImg[choiceId[1]].style.pointerEvents = 'none';
            points++;

        } else {
            allImg[choiceId[0]].src = './images/balloon.png';
            allImg[choiceId[1]].src = './images/balloon.png';

        }
        playerChoice = [];
        choiceId = [];

        result.innerHTML = points;
        if (points === allCards.length / 2) {
            result.innerHTML = '6! You won';
            reset.innerHTML = 'New game';
        }
        lock = false;

    }

}

gameBoard();


reset.onclick = () => {
    grid.innerHTML = '';
    result.innerHTML = '0';
    points = 0;
    gameBoard();

}