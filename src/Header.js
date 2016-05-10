var React = require('react');

var Header = React.createClass({
    render: function() {
        var style = {
            height: 200,
            width: "100%",
            color: "white",
            display: "inline-block",
            float: "left",
            borderBottom: "1px solid #262626"
        };
        var titleStyle = {
            fontSize: "4em",
            top: "50%",
            position: "relative",
            marginLeft: 50,
            transform: "translateY(-50%)",
            float: "left",
            color: "#990000",
            fontFamily: "Orbitron"
        };
        return (
            <div style={style}>
                <div style={titleStyle}>Armageddon Tracker</div>
            </div>
        )
    }
});

module.exports = Header;