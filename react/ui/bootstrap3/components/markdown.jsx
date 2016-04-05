export const TEMPLATE_NAME = React.createClass({
	rawMarkup: function() {
		var markdownText = /*TEXT*/;
		var rawMarkup = marked(markdownText, { sanitize: /*SANITIZE*/ });
		return { __html: rawMarkup };
	},
	render: function() {
		return (<span dangerouslySetInnerHTML={this.rawMarkup()} />);
	}
});
