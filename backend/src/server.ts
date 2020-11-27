import app from'./app';
import database from './databse';

database.sync();
console.log('Banco de dados rodando')

app.listen(3002);

console.log('Rodando na porta 3000');