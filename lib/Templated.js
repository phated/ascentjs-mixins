define([
  'lodash'
], function(_){

  'use strict';

  return function Templated(){
    this.after('initialize', function(){
      if(!this.attr.tmpl){
        return;
      }

      if(typeof this.attr.tmpl === 'string'){
        return this.$node.html(_.template(this.attr.tmpl, this.attr));
      }

      if(typeof this.attr.tmpl === 'function'){
        return this.$node.html(this.attr.tmpl(this.attr));
      }
    });
  };

});