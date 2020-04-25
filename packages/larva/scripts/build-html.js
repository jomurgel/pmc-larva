const chalk = require( 'chalk' );
const path = require( 'path' );

const getAppConfiguration = require( '../lib/utils/getAppConfiguration' );
const getArgsFromCli = require( '../lib/utils/getArgsFromCli' );
const generateStatic = require( '../lib/generateStatic' );
const getPatternRoutes = require( '../lib/utils/getPatternRoutes' );
const getAllPatternsObj = require( '../lib/utils/getAllPatternsObj' );

const config = getAppConfiguration( 'patterns' );
const cliArgs = getArgsFromCli();
const source = 'larva' === cliArgs[1] ? 'larva' : 'project';

const urlBase = 'http://localhost:3001/' + source;
const buildPath = path.join( process.cwd(), './build/html/' + source );

const patternsObj = ( () => {
	const source = fromLarva ? config.larvaPatternsDir : config.projectPatternsDir;
	return getAllPatternsObj( source );
} )();

const routesArr = getPatternRoutes( patternsObj );

generateStatic( routesArr, buildPath, () => {
	// TODO: copy assets into build path
	// copy assets from larva package to static
	// copy assets from project to assets
	console.log( chalk.green( `Successfully build static site to ${buildPath}` ) );
}, urlBase );
