const { Transform } = require('stream');

// Кастомний трансформ-стрім
class CustomStream extends Transform {
    constructor(options) {
        super(options);
    }

    _transform(chunk, encoding, callback) {
        const input = chunk.toString();
        let output = '';

        for (let char of input) {
            // Якщо літера — зробити великою, інакше залишити як є
            if (char.match(/[a-zа-яё]/i)) {
                output += char.toUpperCase();
            } else {
                output += char;
            }
        }

        this.push(output);
        callback();
    }
}

// Створення стріму
const customStream = new CustomStream();

// Зчитуємо з stdin, трансформуємо, виводимо в stdout
process.stdin.pipe(customStream).pipe(process.stdout);

// Для логування також:
customStream.on('data', (chunk) => {
    console.log(`\n[LOG]: ${chunk.toString()}`);
});

console.log('Enter text:');
