(function(window, document) {
  'use strict';
  /*
  Vamos desenvolver mais um projeto. A ideia é fazer uma mini-calculadora.
  As regras são:
  - (feito) Deve ter somente 1 input, mas não deve ser possível entrar dados nesse input
  diretamente;
  - (feito) O input deve iniciar com valor zero;
  - (feito) Deve haver 10 botões para os números de 0 a 9. Cada botão deve ser um número;
  - (feito) Deve haver 4 botões para as operações principais: soma (+), subtração(-),
  multiplicação(x) e divisão(÷);
  - (feito) Deve haver um botão de "igual" (=) que irá calcular os valores e um botão "CE"
  que irá limpar o input, deixando-o com valor 0;
  - (feito) A cada número pressionado, o input deve atualizar concatenando cada valor
  digitado, como em uma calculadora real;
  - (feito) Ao pressionar um botão com uma das 4 operações, deve aparecer o símbolo da
  operação no input. Se o último caractere no input já for um símbolo de alguma
  operação, esse caractere deve ser substituído pelo último pressionado.
  Exemplo:
  - (feito) Se o input tem os valores: "1+2+", e for pressionado o botão de
  multiplicação (x), então no input deve aparecer "1+2x".
  - Ao pressionar o botão de igual, o resultado do cálculo deve ser mostrado no
  input;
  - (feito) Ao pressionar o botão "CE", o input deve ficar zerado.
  */
 
  var $display = document.querySelector('[data-js="display"]');
  var $buttonsNumbers = document.querySelectorAll('[data-js="btn-number"]');
  var $buttonsOperations  = document.querySelectorAll('[data-js="btn-operation"]');
  var $buttonCE = document.querySelector('[data-js="btn-ce"]');
  var $buttonEqual = document.querySelector('[data-js="btn-equal"]');

  Array.prototype.forEach.call($buttonsNumbers, function(button) {
    button.addEventListener('click', handleClickButton, false);
  });
  
  Array.prototype.forEach.call($buttonsOperations, function(button) {
    button.addEventListener('click', handleClickOperation, false);
  });

  $buttonCE.addEventListener('click', handleClickCE, false);

  $buttonEqual.addEventListener('click', handleClickEqual, false);

  function handleClickButton() {
    $display.value += this.value;
  }

  function handleClickOperation() {
    $display.value = removeLastItemIfItIsAnOperator($display.value);
    $display.value += this.value;
  }

  function handleClickCE() {
    $display.value = 0;
  }

  function isLastItemAnOperation(number) {
    var operations = ['+', '-', 'x', '÷'];
    var lastItem = number.split('').pop();
    return operations.some(function(operator) {
      return operator === lastItem;
    })
  }

  function removeLastItemIfItIsAnOperator(number) {
    if (isLastItemAnOperation(number)) {
      return number.slice(0, -1);
    }
    return number;
  }

  function handleClickEqual() {
    $display.value = removeLastItemIfItIsAnOperator($display.value);
    var allValues = $display.value.match(/\d+[+x÷-]?/g);

    $display.value = allValues.reduce(function(accumulated, actual) {
      var firstValue = accumulated.slice(0, -1);
      var operator = accumulated.split('').pop();
      var lastValue = removeLastItemIfItIsAnOperator(actual);
      var lastOperator = isLastItemAnOperation(actual) ? actual.split('').pop() : '';

      switch(operator) {
        case '+':
          return ( Number(firstValue) + Number(lastValue) ) + lastOperator;
        case '-':
          return ( Number(firstValue) - Number(lastValue) ) + lastOperator;
        case 'x':
          return ( Number(firstValue) * Number(lastValue) ) + lastOperator;
        case '÷':
          return ( Number(firstValue) / Number(lastValue) ) + lastOperator;
      }
    });
  }

})(window, document);
