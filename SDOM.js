/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(htmlElements){
    this.htmlElements = htmlElements;
  }

}

DOMNodeCollection.prototype.html = function(html) {
  if (html === undefined){
    return this.htmlElements[0].innerHTML;
  }else {
    this.htmlElements.forEach( node => {
      element.innerHTML = html;
    });
  }
};

DOMNodeCollection.prototype.empty = function() {
  this.htmlElements.forEach( element => {
    element.innerHTML = "";
  });
};

DOMNodeCollection.prototype.append = function(arg) {
  if (typeof arg === 'string'){
    this.htmlElements.forEach ( node => node.innerHTML += arg );
  }
  if (arg instanceof Node){
    this.htmlElements.forEach ( node => {
      node.innerHTML += arg.outerHTML;
    });
  }
  if (arg instanceof DOMNodeCollection){
    arg.htmlElements.forEach( node => {
      this.apped(node);
    });
  }
};

DOMNodeCollection.prototype.attr = function(name,value) {
  if (arguments.length > 1) {
    this.htmlElements.forEach( node => {
      node.setAttribute(name,value);
    });
  }else {
    return this.htmlElements[0].getAttribute(name);
  }
};

DOMNodeCollection.prototype.addClass = function(name) {
  this.htmlElements.forEach( node => {
    node.classList.add(name);
  });
};

DOMNodeCollection.prototype.removeClass = function(name) {
  if(name){
    this.htmlElements.forEach( node => {
      node.classList.remove(name);
    });
  }else {
    this.htmlElements.forEach( node => {
      node.removeAttribute('class');
    });
  }
};

DOMNodeCollection.prototype.children = function() {
  let childs = [];
  this.htmlElements.forEach ( node => {
    const childNodes = node.children;
    childs = childs.concat(Array.from(childNodes));
  });
  return new DOMNodeCollection(childs);
};

DOMNodeCollection.prototype.parent = function() {
  let parents = [];
  this.htmlElements.forEach( node => {
    if (!node.parentNode.visited){
      parents.push(node.parentNode);
      node.parentNode.visited = true;
    }
  });

  parents.forEach( parent => parent.visited = false);
  return new DOMNodeCollection(parents);
};

DOMNodeCollection.prototype.find = function(arg) {
  let found = [];
  this.htmlElements.forEach ( node => {
    found.push(node.querySelectorAll(arg));
  });
};

DOMNodeCollection.prototype.remove = function() {
  this.htmlElements.forEach( node => {
    let parent = node.parentNode;
    parent.removeChild(node);
  });
};

DOMNodeCollection.prototype.on = function( type, callback) {
  this.htmlElements.forEach ( node => {
    node.addEventListener(type, callback);
    node.callback = callback;
  });
};

DOMNodeCollection.prototype.off = function(type) {
  this.htmlElements.forEach ( node => {
    node.removeEventListener(type, node.callback);
  });
};

// String.prototype.join = function(sep){
//   result = '';
//   this.forEach( (el,index) => {
//     result += el;
//     if(index < this.length-1){
//       result += ' ';
//     }
//   });
//   return result;
// };



module.exports = DOMNodeCollection;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dom_node_collection_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dom_node_collection_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__dom_node_collection_js__);

  let ready = false;
  let readyForCallBacks = [];

const $s = (arg) => {
  if(typeof arg === 'string'){
    return new __WEBPACK_IMPORTED_MODULE_0__dom_node_collection_js___default.a(Array.from(document.querySelectorAll(arg)));
  }
  if(arg instanceof HTMLElement){
    return new __WEBPACK_IMPORTED_MODULE_0__dom_node_collection_js___default.a([arg]);
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


/***/ })
/******/ ]);