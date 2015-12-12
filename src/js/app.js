'use strict';

require('../css/main.css');

const WHO = 'JS';
let blah = () => {};
blah();
let greeter = who => 'Hello from ' + who + '!';

document.getElementById('app').appendChild(
  document.createTextNode(greeter(WHO))
);
