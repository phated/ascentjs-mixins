describeMixin('lib/Templated', function(){

  'use strict';

  beforeEach(function(){
    // setupComponent();
  });

  it('should return early if no template is specified', function(){
    setupComponent();

    expect(this.component.$node.html()).toBe('');
  });

  it('should compile template from string', function(){
    setupComponent({
      tmpl: 'test 123'
    });

    expect(this.component.$node.html()).toContain('test 123');
  });

  it('should compile template from string and pass in attrs as data', function(){
    setupComponent({
      data: 123,
      tmpl: 'test <%= data %>'
    });

    expect(this.component.$node.html()).toContain('test 123');
  });

  it('should use the return value from a function', function(){
    setupComponent({
      tmpl: function(){ return 'test 123'; }
    });

    expect(this.component.$node.html()).toContain('test 123');
  });

  it('should pass in attrs as data to tmpl function', function(){
    setupComponent({
      data: 123,
      tmpl: function(attrs){ return 'test ' + attrs.data; }
    });

    expect(this.component.$node.html()).toContain('test 123');
  });
});