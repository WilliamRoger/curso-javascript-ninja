/*
Crie uma variável qualquer, que receba um array com alguns valores aleatórios
- ao menos 5 - (fica por sua conta os valores do array).
*/

var myArray = [1988, 'William Roger', true, ['Jé', 'Cris', 'Will'], null];

/*
Crie uma função que receba um array como parâmetro, e retorne esse array.
*/

function retornaArray(arr) {
  return arr;
}

/*
Imprima o segundo índice do array retornado pela função criada acima.
*/

console.log(retornaArray(myArray)[1]); // William Roger

/*
Crie uma função que receba dois parâmetros: o primeiro, um array de valores; e o
segundo, um número. A função deve retornar o valor de um índice do array que foi passado
no primeiro parâmetro. O índice usado para retornar o valor, deve ser o número passado no
segundo parâmetro.
*/

function retornaIndex(arr, index) {
  return arr[index];
}

/*
Declare uma variável que recebe um array com 5 valores, de tipos diferentes.
*/

var myArray2 = [2002, 'Brasil Campeão', true, ['Copa', 'do', 'Mundo'], null];

/*
Invoque a função criada acima, fazendo-a retornar todos os valores do último
array criado.
*/

console.log(retornaIndex(myArray2, 0));
console.log(retornaIndex(myArray2, 1));
console.log(retornaIndex(myArray2, 2));
console.log(retornaIndex(myArray2, 3));
console.log(retornaIndex(myArray2, 4));

/*
Crie uma função chamada `book`, que recebe um parâmetro, que será o nome do
livro. Dentro dessa função, declare uma variável que recebe um objeto com as
seguintes características:
- esse objeto irá receber 3 propriedades, que serão nomes de livros;
- cada uma dessas propriedades será um novo objeto, que terá outras 3
propriedades:
    - `quantidadePaginas` - Number (quantidade de páginas)
    - `autor` - String
    - `editora` - String
- A função deve retornar o objeto referente ao livro passado por parâmetro.
- Se o parâmetro não for passado, a função deve retornar o objeto com todos
os livros.
*/

function book(nomeLivro) {
  var livros = {
    'JavaScript Ninja': {
      quantidadePaginas: 900,
      autor: 'Fernando Daciuk',
      editora: 'Código Impresso'
    },
    'Programador Quântico': {
      quantidadePaginas: 665,
      autor: 'Filipe Deschamps',
      editora: 'Ideia Impressa'
    },
    'Código Limpo': {
      quantidadePaginas: 1098,
      autor: 'Robert Cecil Martin',
      editora: 'Amazon Books'
    }
  }

  return (!nomeLivro) ? livros : livros[nomeLivro];
}

/*
Usando a função criada acima, imprima o objeto com todos os livros.
*/

console.log(book());

/*
Ainda com a função acima, imprima a quantidade de páginas de um livro qualquer,
usando a frase:
"O livro [NOME_DO_LIVRO] tem [X] páginas!"
*/

var nomeLivro1 = 'JavaScript Ninja';
console.log('O livro ' + nomeLivro1 + ' tem ' + book(nomeLivro1).quantidadePaginas + ' páginas!');

/*
Ainda com a função acima, imprima o nome do autor de um livro qualquer, usando
a frase:
"O autor do livro [NOME_DO_LIVRO] é [AUTOR]."
*/

var nomeLivro2 = 'Programador Quântico';
console.log('O autor do livro ' + nomeLivro2 + ' é ' + book(nomeLivro2).autor + '.');

/*
Ainda com a função acima, imprima o nome da editora de um livro qualquer, usando
a frase:
"O livro [NOME_DO_LIVRO] foi publicado pela editora [NOME_DA_EDITORA]."
*/

var nomeLivro3 = 'Código Limpo';
console.log('O livro ' + nomeLivro3 + ' foi publicado pela editora ' + book(nomeLivro3).editora + '.');
