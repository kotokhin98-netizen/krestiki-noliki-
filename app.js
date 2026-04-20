let step = ""; // Переменная для хранения текущего игрока ('krest' или 'circle')
let spanWho = document.getElementById('spanWho') // Получаем элемент, где пишется чей ход
let winner = "" // Переменная для имени победителя

const who =()=>{
    if (step == 'circle'){ // Если сейчас были нулики
        step = 'krest'; // Следующий ход - крестики
        spanWho.innerText = 'Крестики' // Обновляем текст на экране
    } else { // Иначе (если были крестики или начало игры)
        step = 'circle' // Следующий ход - нулики
        spanWho.innerText = 'Нулики'
    }
}

who() // Вызываем функцию сразу, чтобы установить первый ход (Нулики, так как step был пустой)

let blockItem = document.querySelectorAll('.blockItem') // Получаем все 9 ячеек
let counter = 0; // Счетчик сделанных ходов (для определения ничьей)

blockItem.forEach((item)=>{ // Для каждой ячейки
    item.addEventListener('click',()=>{ // Вешаем слушатель клика
        // Проверяем, пуста ли ячейка (нет классов krest или circle)
        if(!item.classList.contains('circle') && !item.classList.contains('krest')){
            
            item.classList.add(step) // Добавляем класс текущего игрока (krest или circle)
            
            // Рисуем символ в зависимости от хода
            if (step=='krest'){
                item.innerText = "X"
            }
            if (step=='circle'){
                item.innerText = "0"
            }

            counter++; // Увеличиваем счетчик ходов
            who() // Меняем очередь хода
            circleWin() // Проверяем, не выиграли ли нулики
            krestWin() // Проверяем, не выиграли ли крестики
            noWin() // Проверяем на ничью
        }
    })
})

// Индексы ячеек от 0 до 8. 
// 0 1 2
// 3 4 5
// 6 7 8
let win = 
[
    [0,1,2], // Верхняя горизонталь
    [0,4,8], // Диагональ \
    [2,4,6], // Диагональ /
    [3,4,5], // Средняя горизонталь
    [6,7,8], // Нижняя горизонталь
    [0,3,6], // Левая вертикаль
    [1,4,7], // Средняя вертикаль
    [2,5,8]  // Правая вертикаль
]

let circleWin = ()=>{
    for(let i =0; i<win.length; i++){ // Перебираем все выигрышные комбинации
        // Проверяем, есть ли у всех трех ячеек из комбинации класс 'circle'
        if(
        blockItem[win[i][0]].classList.contains('circle') &&
        blockItem[win[i][1]].classList.contains('circle') &&
        blockItem[win[i][2]].classList.contains('circle')
        ){
            // Если да, красим их в золотой цвет
            blockItem[win[i][0]].classList.add('winColor')
            blockItem[win[i][1]].classList.add('winColor')
            blockItem[win[i][2]].classList.add('winColor')
            
            winner = "Нулики" // Записываем победителя
            endGame(winner) // Завершаем игру
            return 1 // Выходим из функции
        }
    }
}

let krestWin = ()=>{
    for(let i =0; i<win.length; i++){
        // Аналогично проверяем класс 'krest'
        if(
        blockItem[win[i][0]].classList.contains('krest') &&
        blockItem[win[i][1]].classList.contains('krest') &&
        blockItem[win[i][2]].classList.contains('krest')
        ){
            blockItem[win[i][0]].classList.add('winColor')
            blockItem[win[i][1]].classList.add('winColor')
            blockItem[win[i][2]].classList.add('winColor')
            
            winner = "Крестики"
            endGame(winner)
            return 1
        }
    }
}

let noWin = () =>{
    // Если никто не выиграл (функции вернули undefined/false) и сделано 9 ходов
    if (!krestWin() && !circleWin() && (counter >=9)){
        winner = "Ничья"
        endGame(winner)
    }
}


let blockWinner = document.getElementById('blockWinner')
let spanWin = document.getElementById('spanWin')
let btnNewGame = document.getElementById('btnNewGame')
let blockArea = document.getElementById('blockArea')

let endGame = (winner)=>{
    blockArea.style.pointerEvents = 'none'; // Отключаем клики по полю
    blockWinner.style.display = 'flex' // Показываем блок с результатом
    spanWin.innerText = winner // Пишем имя победителя
}

btnNewGame.addEventListener('click',()=>{
    document.location.reload() // Перезагружаем страницу для новой игры
})
