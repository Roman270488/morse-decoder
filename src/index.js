const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

function decode(expr) {

    let userData = []
    let result = ''

   // взяли из объекта все ключи/значения и сделали из каждого ключи/значения массив
   let arrKeyVal = Object.entries(MORSE_TABLE).map(elem => elem.map(elem => elem.split(''))) // ['.', '-'], ['a'] ...

   // просчитываем каждый элемент и меняем в нем точки/тире на 1,0/1,1
   arrKeyVal.map(elem => { // [Array(2), Array(1)]

      elem.map(elem => { // ['.', '-'] => 
         for (let i = 0; i < elem.length; i++){
            if(elem[i] == '.') elem.splice(i, 1, '1', '0')
            if(elem[i] == '-') elem.splice(i, 1, '1', '1') 
         }     
      }) // => ['1', '0', '1', '1']

      // добавили недостающие нули
      for(let i = elem[0].length; elem[0].length < 10; i++){
         elem[0].unshift('0')
      }

    })

    // объеденили нули и еденицы
    let newArr = arrKeyVal.map(elem => elem.map(elem => elem.join('').split(',')))

    // разбили входные данные по десять символов
    for (let i = 0; i < expr.length/10; i++) {
        userData.push(expr.slice(i * 10, (i * 10) + 10))
    }

    // сравниваем есть ли совпадения между входными данными и списком цифр
    userData.map(elem => {
        for(let i = 0; i < newArr.length; i++){
            if(elem == newArr[i][0].join('')) result += newArr[i][1].join('');
        }
        if(elem == '**********') result += ' '
    })

    return result
    
}

module.exports = {
    decode
}