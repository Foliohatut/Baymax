function Dropdown(container, chooseButtonText) {
	if (container != undefined) {
			var events = new Map();
			var anyEvents = [];
			var onClickEvents = [];
			
			container.className = "dropdown";
			
			var selectButton = document.createElement('button');
			selectButton.onclick = function() {
				onClickEvents.forEach(function(element) {
					element();
				}, this);
			};
			selectButton.className = "btn btn-primary dropdown-toggle";
			selectButton.type = "button";
			selectButton.setAttribute('data-toggle', 'dropdown');
			var chooseButtonTextNode = document.createTextNode(chooseButtonText);
			selectButton.appendChild(chooseButtonTextNode);
			container.appendChild(selectButton);
			
			var dropDownMenu = document.createElement('ul');
			dropDownMenu.className = "dropdown-menu";
			container.appendChild(dropDownMenu);
			

			
			function addItem(item) {
				var dropDownItem = document.createElement('li');
				var dropDownItemA = document.createElement('a');
				dropDownItemA.href = "#";
				dropDownItemA.appendChild(document.createTextNode(item));
				dropDownItem.appendChild(dropDownItemA);
				dropDownMenu.appendChild(dropDownItem);
				
				dropDownItemA.onclick = function() {
					chooseButtonTextNode.textContent = item;
					var event = events.get(item);
					if (event !== undefined) {
						event();
					}
					anyEvents.forEach(function(element) {
						element(item);
					}, this);
				}				
			}
			
			function Clear() {
				dropDownMenu.children.Clear();
			}
			
			function onClick(fn) {
				onClickEvents.push(fn);
			}
			
			function onItemSelected(name, fn) {
				events.set(name, fn);
			}
			
			function onAnyEvent(fn) {
				anyEvents.push(fn);
			}
			
			return {
				Element: container,
				onItemSelected: onItemSelected,
				addItem: addItem,
				onAnyEvent: onAnyEvent,
				onClick: onClick,
				Clear: Clear
			}
	}
}

