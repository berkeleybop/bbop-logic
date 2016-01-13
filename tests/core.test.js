////
//// Some unit testing for logic.js
////

var chai = require('chai');
chai.config.includeStack = true;
var assert = chai.assert;
var logic = require('..');

// Correct environment, ready testing.
var us = require('underscore');
var bbop = require('bbop-core');

///
/// Start unit testing.
///

describe('simple logic', function(){
    
    it('empty logic', function(){	

	var l = new logic();
	assert.equal(bbop.what_is(l), 'bbop-logic', 'id');
	assert.equal(bbop.dump(l._bundle), '{"and": []}',
		     'l start internal');
    });

    it('simple and', function(){	
	
	var l = new logic();
	l.add('fly');
	assert.equal(bbop.dump(l._bundle), '{"and": ["fly"]}',
		     'start internal');
	assert.equal(l.to_string(), 'fly', 'trivial');

    });

    it('simple not', function(){	
	
	var l = new logic();
	l.add('fly');
	l.negate();
	assert.equal(bbop.dump(l._bundle),
		     '{"not": {"and": ["fly"]}}',
		     'start internal');
	assert.equal(l.to_string(), 'not (fly)', 'not trivial');
	
    });

    it('simple not compound', function(){	

	var l = new logic();
	l.add('fly');
	l.add('worm');
	l.negate();
	assert.equal(bbop.dump(l._bundle),
		     '{"not": {"and": ["fly", "worm"]}}',
		     'start internal');
	assert.equal(l.to_string(), 'not (fly and worm)', 'not a little harder');
	
    });

    it('simple intersection', function(){	

	var l = new logic();
	l.add('fly');
	l.add('mouse');
	l.add('worm');
	assert.equal(bbop.dump(l._bundle),
		     '{"and": ["fly", "mouse", "worm"]}',
		     'start internal');
	assert.equal(l.to_string(), 'fly and mouse and worm', 'and trivial');

    });

});

describe('harder logic', function(){
    
    it('larger compound', function(){	

	var l4a = new logic('or');
	var l4b = new logic('or');
	l4b.add('fly');
	l4b.add('human');
	l4a.add(l4b);
	var l4c = new logic('and');
	l4c.add('mouse');
	l4c.add('worm');
	l4a.add(l4c);
	assert.equal(l4a.to_string(), '(fly or human) or (mouse and worm)',
		     'or compound');

    });
});

describe('edge cases', function(){
    
    it('empty logic', function(){	

	var l = new logic();
	assert.equal(l.to_string(), '', "nothing");
	l.add('fly');
	l.add('human');
	assert.equal(l.to_string(), 'fly and human', "something");
	l.empty();
	assert.equal(l.to_string(), '', "nothing again");
    
    });

});
