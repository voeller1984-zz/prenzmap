var VM = function(locations, populateInfoWindow, largeInfowindow) {

	// View Model constructor
	
	var self = this;
	self.locations = locations;		
	self.searchString = ko.observable('');
	self.selectedItem = ko.observable(null);	// currently selected item
	
	self.filteredLocations = ko.computed(function() {
		var filteredLocations;
		var srch = self.searchString().trim().toLowerCase();
		self.selectedItem(null);
		if (!srch) {
			filteredLocations = self.locations;
		}
		else {
			filteredLocations = self.locations.filter(function(item){ return item.title.toLowerCase().indexOf(srch) >= 0; });
		}
		
		// execute setVisibleLocation after return from current function
		setTimeout(function(){setVisibleLocations(filteredLocations);}, 0);		
		return filteredLocations;
	});
	
	var setVisibleLocations = function(visibleLocations){

		for (var i = 0; i < self.locations.length; i++) {
			self.locations[i].setVisible(false);
		}
		if (self.selectedItem()) {
			self.selectedItem().setVisible(true);
		}
		else {
			for (var i = 0; i < visibleLocations.length; i++) {
				visibleLocations[i].setVisible(true);
			}
		}
	}
	
	self.isItemSelected = function(item) {
		//	css binding
		return item && self.selectedItem() === item;
	}
	
	var onSelectedItemChanged = function(item) {
		//	every time self.selectedItem is changed
		largeInfowindow.close();
		largeInfowindow.marker = null;
		setVisibleLocations(self.filteredLocations());
		if (item) {
			populateInfoWindow(item, largeInfowindow);
		}
	}
	
	//	every time self.selectedItem() value changes onSelectedItemChanged will be executed
	self.selectedItem.subscribe(onSelectedItemChanged);		

	self.itemSelected = function(item, event) {
		event.stopPropagation();
		//	if the item that is already selected is clicked for the second time then reset to null
		var filter = item !== self.selectedItem() ? item : null;
		self.selectedItem(filter);
	}
}