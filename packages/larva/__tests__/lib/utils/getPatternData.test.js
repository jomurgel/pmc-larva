const assert = require( 'assert' );
const path = require( 'path' );
const fs = require( 'fs' );
const fixture = path.join( __dirname, '../../fixtures' );

const getPatternData = require( '../../../lib/utils/getPatternData' );
const appConfiguration = require( '../../../lib/utils/getAppConfiguration' )('patterns');

const expectedSchema = require( fixture + '/src/patterns/components/c-nav-link/c-nav-link.prototype.js' );
const expectedVariantSchema = require( fixture + '/src/patterns/components/c-nav-link/c-nav-link.featured.js' );
const expectedSchemaFromJson = require( fixture + '/src/patterns/objects/o-crap/o-crap.json' );
const expectedPath = fixture + '/src/patterns/objects/o-nav/o-nav.json';

let compStub = {
	name: 'c-nav-link',
	type: 'components'
};

const objStub = {
	name: 'o-crap',
	type: 'objects'
};

describe( 'getPatternData', () => {
	it( 'throws an error if no pattern prototype is found', () => {
		assert.throws( () => getPatternData( fixture, { type: 'objects', name: 'o-nav' } ), Error );
	});

	it( 'first returns the pattern object if the schema is found', () => {
		assert.equal( getPatternData( fixture + '/src/patterns', compStub ), expectedSchema );
	});

	it( 'returns the pattern json object if no prototype is found', () => {
		assert.equal( getPatternData( fixture + '/src/patterns', objStub ), expectedSchemaFromJson );
	});

	it( 'gets a variant specified in params', () => {
		compStub.variant = 'featured';
		assert.equal( getPatternData( fixture + '/src/patterns', compStub ), expectedVariantSchema );
	});

});



