/**
	Data-Main: Main entry point into Account Manager Application
*/

// Configures requireJS with global configuration informaton
requirejs.config({
	baseUrl: './scripts/',
	paths: {
		app: 'app/',
		lib: 'lib/',
		jquery: 'lib/jquery-1.11.0.min',
		ko: 'lib/knockout-3.1.0',
		am: 'app/manager',
		vms: 'app/viewmodels',
	},
});

// Start work NOW...
requirejs(['am','vms'], function(am, vms) {
	var vm = vms.someViewModel;
	vm.loadView();
	vm.saveView();
});