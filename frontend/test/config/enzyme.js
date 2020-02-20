const { configure } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16.3');

configure({ adapter: new Adapter() });
