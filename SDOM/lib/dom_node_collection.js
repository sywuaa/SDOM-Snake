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
