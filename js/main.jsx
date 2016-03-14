(function () {
	'use strict';

	var TodoApp = React.createClass({

		render: function () {
			return (<div>
						<header className="header">
							<h1>todos</h1>
						</header>
					</div>);
		}
	});

	function render() {
		React.render(
			<TodoApp/>,	document.getElementsByClassName('todoapp')[0]
		);
	}

	render();

})();
