document.addEventListener('DOMContentLoaded', function () {
    const generateHand = function () {
        var random = Math.floor(Math.random() * 3);
        const compHand = document.querySelector('#comp-hand');
        switch (random) {
            case 0:
                compHand.textContent = '✊';
                return 'rock';
            case 1:
                compHand.textContent = '🖐️';
                return 'paper';
            case 2:
                compHand.textContent = '✌️';
                return 'scissors';
        }
    };

    const gameForm = document.querySelector('#game-form');

    gameForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const userHand = document.querySelector('input[name="hand"]:checked');
        if (userHand) {
            var result = await playGame(userHand.value);
            console.log(result);
            var resultAlert = document.querySelector('#result');
            var resultText = document.querySelector('#result p');
            switch (result) {
                case -1:
                    resultText.textContent = 'Game Tied !';
                    break;
                case 0:
                    resultText.textContent = 'You Lost !';
                    break;
                case 1:
                    resultText.textContent = 'You Won !';
                    break;
            }
            resultAlert.style.display = 'block';
        } else
            alert('Pick your hand first !');
    });

    async function playGame(userHand) {
        const interval = 100;
        const iterations = 20;
        let count = 0;
        var compHand;

        for (let i = 0; i < iterations; i++) {
            count++;
            compHand = generateHand();
            await sleep(interval);
        }

        if (userHand == compHand)
            return -1;
        else {
            switch (userHand) {
                case 'rock':
                    switch (compHand) {
                        case 'paper':
                            return 0;
                        case 'scissors':
                            return 1;
                    }
                case 'paper':
                    switch (compHand) {
                        case 'rock':
                            return 1;
                        case 'scissors':
                            return 0;
                    }
                case 'scissors':
                    switch (compHand) {
                        case 'rock':
                            return 0;
                        case 'paper':
                            return 1;
                    }
            }
        }
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
});

function select(hand) {
    document.querySelectorAll('#buttons label').forEach(label => {
        label.classList.remove('selected');
    });
    document.querySelector(`label[for="${hand}"]`).classList.add('selected');
    const userHand = document.querySelector('#user-hand');
    userHand.textContent = document.querySelector(`label[for="${hand}"]`).textContent;
}

function clearResult() {
    document.querySelector('#result').style.display = 'none';
    document.querySelector('#user-hand').textContent = '';
    document.querySelector('#comp-hand').textContent = '';
    document.querySelectorAll('#buttons label').forEach(label => label.classList.remove('selected'));
    document.querySelector('input[name="hand"]:checked').checked = false;
}
