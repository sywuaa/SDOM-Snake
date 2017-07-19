import DOMNodeCollection from './dom_node_collection.js';
  let ready = false;
  let readyForCallBacks = [];

const $s = (arg) => {
  if(typeof arg === 'string'){
    return new DOMNodeCollection(Array.from(document.querySelectorAll(arg)));
  }
  if(arg instanceof HTMLElement){
    return new DOMNodeCollection([arg]);
  }
  if(typeof arg === 'function'){
    if(ready){
      arg();
    }else {
      readyForCallBacks.push(arg);
    }
  }
};

$s.extend = (base, ...args) => {
  args.forEach( arg => {
    Object.keys(arg).forEach( key => {
      base[key] = arg[key];
    });
  });
  return base;
};

$s.ajax = options => {
  const defaults = {
    contentType: json,
    methods: 'GET',
    url: '',
    data: {},
    success: () => {},
    error: () => {}
  };

  options = $s.extend(defaults, options);
  options.method = options.method.toUpperCase();

  const request = new XMLHttpRequest();
  request.open(options.method, options.url, true);
  request.send(JSON.stringify(options.data));

  request.onload = response => {
    if(request.status === 200){
      return options.success(request.response);
    }else {
      return options.error(request.response);
    }
  };

};

document.addEventListener('DOMContentLoaded', () => {
  ready = true;
  readyForCallBacks.forEach( func => func());
});


window.$s = $s;
