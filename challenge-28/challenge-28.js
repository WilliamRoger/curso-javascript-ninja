 (function() {
  'use strict';
  /*
  No HTML:
  - Crie um formulário com um input de texto que receberá um CEP e um botão
  de submit;
  - Crie uma estrutura HTML para receber informações de endereço:
  "Logradouro, Bairro, Estado, Cidade e CEP." Essas informações serão
  preenchidas com os dados da requisição feita no JS.
  - Crie uma área que receberá mensagens com o status da requisição:
  "Carregando, sucesso ou erro."

  No JS:
  - O CEP pode ser entrado pelo usuário com qualquer tipo de caractere, mas
  deve ser limpo e enviado somente os números para a requisição abaixo;
  - Ao submeter esse formulário, deve ser feito um request Ajax para a URL:
  "https://viacep.com.br/ws/[CEP]/json/", onde [CEP] será o CEP passado
  no input criado no HTML;
  - Essa requisição trará dados de um CEP em JSON. Preencha campos na tela
  com os dados recebidos.
  - Enquanto os dados são buscados, na área de mensagens de status, deve mostrar
  a mensagem: "Buscando informações para o CEP [CEP]..."
  - Se não houver dados para o CEP entrado, mostrar a mensagem:
  "Não encontramos o endereço para o CEP [CEP]."
  - Se houver endereço para o CEP digitado, mostre a mensagem:
  "Endereço referente ao CEP [CEP]:"
  - Utilize a lib DOM criada anteriormente para facilitar a manipulação e
  adicionar as informações em tela.
  */
  // Lib DOM
  function DOM(elements) {
    this.element = document.querySelectorAll(elements);
  }

  DOM.prototype.on = function on(event, callback) {
    Array.prototype.forEach.call(this.element, function(element) {
      element.addEventListener(event, callback, false);
    });
  }

  DOM.prototype.off = function off(event, callback) {
    Array.prototype.forEach.call(this.element, function(element) {
      element.removeEventListener(event, callback, false);
    });
  }

  DOM.prototype.get = function get() {
    return this.element;
  }
  
  DOM.prototype.forEach = function forEach() {
    return Array.prototype.forEach.apply(this.element, arguments);
  }

  DOM.prototype.map = function map() {
    return Array.prototype.map.apply(this.element, arguments);
  }

  DOM.prototype.filter = function filter() {
    return Array.prototype.filter.apply(this.element, arguments);
  }

  DOM.prototype.reduce = function reduce() {
    return Array.prototype.reduce.apply(this.element, arguments);
  }

  DOM.prototype.reduceRight = function reduceRight() {
    return Array.prototype.reduceRight.apply(this.element, arguments);
  }

  DOM.prototype.every = function every() {
    return Array.prototype.every.apply(this.element, arguments);
  }

  DOM.prototype.some = function some() {
    return Array.prototype.some.apply(this.element, arguments);
  }

  DOM.isArray = function isArray(param) {
    return Object.prototype.toString.call(param) === "[object Array]";
  }

  DOM.isObject = function isObject(param) {
    return Object.prototype.toString.call(param) === "[object Object]";
  }

  DOM.isFunction = function isFunction(param) {
    return Object.prototype.toString.call(param) === "[object Function]";
  }

  DOM.isNumber = function isNumber(param) {
    return Object.prototype.toString.call(param) === "[object Number]";
  }

  DOM.isString = function isString(param) {
    return Object.prototype.toString.call(param) === "[object String]";
  }

  DOM.isBoolean = function isBoolean(param) {
    return Object.prototype.toString.call(param) === "[object Boolean]";
  }

  DOM.isNull = function isNull(param) {
    return  Object.prototype.toString.call(param) === "[object Null]" || Object.prototype.toString.call(param) === "[object Undefined]";
  }

  var $form = new DOM('[data-js="search-cep"]');
  var $inputCEP = new DOM('[name="cep"]').get()[0];
  var $address = new DOM('[data-js="address"]').get()[0];
  var $code = new DOM('[data-js="code"]').get()[0];
  var $district = new DOM('[data-js="district"]').get()[0];
  var $state = new DOM('[data-js="state"]').get()[0];
  var $city = new DOM('[data-js="city"]').get()[0];
  var $status = new DOM('[data-js="status"]').get()[0];
  var ajax = new XMLHttpRequest();

  $form.on('submit', handleSubmitFormCep);

  function handleSubmitFormCep(event) {
    event.preventDefault();
    var url = 'https://ws.apicep.com/cep/[CEP].json'.replace('[CEP]', $inputCEP.value);

    ajax.open('GET', url);
    ajax.send();
    getMessage('loading');
    ajax.addEventListener('readystatechange', handleReadyStateChange, false);
  }

  function handleReadyStateChange() {
    if (isRequestOK()) {
      fillCEPFields();
      getMessage('ok');
    }
  }

  function isRequestOK() {
    return ajax.readyState === 4 && ajax.status === 200;
  }
  
  function fillCEPFields() {
    var data = parseData();
  
    if (!data.ok)
      getMessage('error');
    
    $code.textContent = data.code;
    $address.textContent = data.address;
    $district.textContent = data.district;
    $state.textContent = data.state;
    $city.textContent = data.city;
  }

  function parseData() {
    var result;
    try {
      result = JSON.parse(ajax.responseText);
    } catch(e) {  
      result = null;
    }
    return result;
  }

  function getMessage(type) {
    var cep = $inputCEP.value;
    var messages = {
      loading: 'Buscando informações para o CEP '+ cep +'...',
      ok: 'Endereço referente ao CEP '+ cep +':',
      error: 'Não encontramos o endereço para o CEP '+ cep +'.',
    };

    $status.textContent = messages[type];

  }
})();
