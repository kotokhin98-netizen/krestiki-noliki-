document.addEventListener('DOMContentLoaded', () => {
    // 1. Создаем основные контейнеры
    const mainContainer = document.createElement('main');
    const whoTurnContainer = document.createElement('div');
    const winnerContainer = document.createElement('div');
    
    // Элементы текста
    const spanWho = document.createElement('span');
    const textWinLabel = document.createElement('div');
    const spanWin = document.createElement('span');
    const btnNewGame = document.createElement('button');

    // 2. Настройка структурных элементов и классов
    whoTurnContainer.className = 'blockWho';
    whoTurnContainer.innerHTML = 'Ход: ';
    whoTurnContainer.appendChild(spanWho);
    spanWho.id = 'spanWho';
    spanWho.textContent = 'X'; // Начальный ход

    winnerContainer.className = 'blockWinner';
    winnerContainer.style.display = 'none'; // Скрыт по умолчанию
    
    textWinLabel.className = 'TextWin';
    textWinLabel.textContent = 'Победитель: ';
    
    spanWin.id = 'spanWin';
    
    btnNewGame.className = 'btnNewGame';
    btnNewGame.textContent = 'Новая игра';

    winnerContainer.appendChild(textWinLabel);
    winnerContainer.appendChild(spanWin);
    winnerContainer.appendChild(btnNewGame);

    // 3. Создание игрового поля (9 ячеек)
    const cells = [];
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'blockItem';
        cell.dataset.index = i; // Сохраняем индекс для логики
        mainContainer.appendChild(cell);
        cells.push(cell);
    }

    // Добавляем всё в body
    document.body.appendChild(whoTurnContainer);
    document.body.appendChild(mainContainer);
    document.body.appendChild(winnerContainer);

    // 4. Применение стилей (аналог style.css)
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        body {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-family: Arial, sans-serif;
            background-color: #fff;
        }
        main {
            display: grid;
            grid-template-columns: repeat(3, 100px);
            grid-auto-rows: 100px;
            justify-content: center;
            gap: 0; /* Убираем отступы, если нужны границы */
        }
        .blockItem {
            width: 100px;
            height: 100px;
            border: 1px solid #111;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 40px;
            font-weight: bold;
            cursor: pointer;
            background: #f9f9f9;
            box-sizing: border-box; /* Важно для границ */
        }
        .blockItem:hover {
            background: #e0e0e0;
        }
        .blockWho {
            text-align: center;
            margin: 20px 0;
            font-size: 20px;
        }
        #spanWho {
            color: rgb(116, 246, 116);
            font-weight: 600;
            font-size: 24px;
        }
        .krest {
            color: rgb(135, 220, 250);
        }
        .circle {
            color: rgb(148, 255, 124);
        }
        .winColor {
            color: rgb(21, 168, 21) !important;
            background: gold !important;
            font-size: 50px;
        }
        .blockWinner {
            display: none;
            flex-direction: column;
            align-items: center;
            margin-top: 20px;
        }
        .TextWin {
            font-size: 25px;
            margin-bottom: 12px;
        }
        #spanWin {
            font-size: 24px;
            color: rgb(0, 21, 255);
        }
        .btnNewGame {
            padding: 12px 24px;
            background: rgb(55, 196, 55);
            border-radius: 12px;
            color: white;
            font-weight: 600;
            text-align: center;
            cursor: pointer;
            border: none;
            font-size: 16px;
        }
        .btnNewGame:hover {
            background: rgb(82, 229, 82);
        }
    `;
    document.head.appendChild(styleSheet);

    // 5. Логика игры
    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ["", "", "", "", "", "", "", "", ""];

    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Горизонтали
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Вертикали
        [0, 4, 8], [2, 4, 6]             // Диагонали
    ];

    function handleCellClick(clickedCellEvent) {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
        }

        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
    }

    function handleCellPlayed(clickedCell, clickedCellIndex) {
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        
        // Добавляем класс для цвета (крестик или нолик)
        if (currentPlayer === 'X') {
            clickedCell.classList.add('krest');
        } else {
            clickedCell.classList.add('circle');
        }
    }

    function handleResultValidation() {
        let roundWon = false;
        let winningLine = [];

        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];

            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                winningLine = winCondition;
                break;
            }
        }

        if (roundWon) {
            announceWinner(currentPlayer, winningLine);
            gameActive = false;
            return;
        }

        let roundDraw = !gameState.includes("");
        if (roundDraw) {
            announceWinner("Ничья", []);
            gameActive = false;
            return;
        }

        handlePlayerChange();
    }

    function handlePlayerChange() {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        spanWho.textContent = currentPlayer;
        
        // Меняем цвет индикатора хода
        if (currentPlayer === 'X') {
            spanWho.style.color = 'rgb(135, 220, 250)'; // Цвет крестика
        } else {
            spanWho.style.color = 'rgb(148, 255, 124)'; // Цвет нолика
        }
    }

    function announceWinner(winner, winningLine) {
        winnerContainer.style.display = 'flex';
        if (winner === "Ничья") {
            textWinLabel.textContent = "Результат: ";
            spanWin.textContent = "Ничья!";
            spanWin.style.color = "gray";
        } else {
            textWinLabel.textContent = "Победитель: ";
            spanWin.textContent = winner;
            
            // Подсветка победной линии
            winningLine.forEach(index => {
                cells[index].classList.add('winColor');
            });
        }
    }

    function restartGame() {
        gameActive = true;
        currentPlayer = "X";
        gameState = ["", "", "", "", "", "", "", "", ""];
        spanWho.textContent = "X";
        spanWho.style.color = 'rgb(116, 246, 116)'; // Исходный цвет
        
        winnerContainer.style.display = 'none';
        
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove('krest', 'circle', 'winColor');
        });
    }

    // Навешиваем обработчики событий
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    btnNewGame.addEventListener('click', restartGame);
});
