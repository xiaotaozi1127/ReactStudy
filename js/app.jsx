(function () {
	'use strict';

	class TodoApp extends React.Component {
		constructor(props) {
			super(props);
		}

		render() {
			return (
				<div>
					<header className="header">
						<h1>todos</h1>
						<input
							className="new-todo"
							placeholder="What needs to be done?" />
					</header>
					<section className="main">

					</section>
				</div>
			);
		}
	}

	ReactDOM.render(<TodoApp/>, document.getElementsByClassName('todoapp')[0]);
})();
