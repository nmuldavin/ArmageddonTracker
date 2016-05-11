var React = require('react');
var Modal = require('react-modal');
var spring = require('react-motion').spring;
var Motion = require('react-motion').Motion;
var Button = require('react-button');

var Header = React.createClass({
    getInitialState: function() {
        return { modalIsOpen: false };
    },
    openModal: function() {
        this.setState({modalIsOpen: true});
    },
    closeModal: function() {
        this.setState({modalIsOpen: false});
    },
    render: function() {

        var style = {
            height: 200,
            width: 2000,
            position: "relative",
            minWidth: "100%",
            color: "white",
            display: "block",
            float: "left",
            borderBottom: "1px solid #262626",
            paddingBottom: 5
        };

        var titleStyle = {
            fontSize: "4em",
            top: "50%",
            width: "100%",
            letterSpacing: 13,
            position: "relative",
            marginLeft: 50,
            transform: "translateY(-50%)",
            float: "left",
            color: "f2f2f2"
        };

        var getCustomStyles = function(y) {
            return {
                overlay : {
                    position          : 'fixed',
                    top               : 0,
                    left              : 0,
                    right             : 0,
                    bottom            : 0,
                    backgroundColor   : 'rgba(0, 0, 0, 0.5)'
                },
                content : {
                    top                   : y.toString() + '%',
                    left                  : '50%',
                    right                 : 'auto',
                    bottom                : 'auto',
                    marginRight           : '-50%',
                    transform             : 'translate(-50%, -50%)',
                    backgroundColor       : "#f2f2f2",
                    border: "none",
                    borderRadius: 0,
                    textAlign: "center",
                    color: "gray",
                    width: 500
                }
            };
        };

        var that = this;

        var mod = function(val) {
            var customStyles = getCustomStyles(val.y);

            var imageStyle = {
                height: 300,
                width: 400,
                display: "inline-block"
            };

            var linkStyle = {
                textDeoration: "none",
                color: "black"
            };

            return (
                <Modal
                isOpen={that.state.modalIsOpen}
                onRequestClose={that.closeModal}
                style={customStyles}>
                    <h1 style={{color: "black", letterSpacing: 10}}>Armageddon Tracker</h1>
                    <img src="../images/bruce.jpg" style={imageStyle}/>
                    <div style={{textAlign: "left"}}>
                        <p>Armageddon Tracker logs upcoming closest-approaches with known asteroids. Unnamed asteroids (the vast majority)
                            are labeled with their <a style={linkStyle} href="http://www.minorplanetcenter.net/iau/info/HowNamed.html">provisional designation</a>.
                        </p>
                        <p>All data is from the NASA Near Earth Object Web Service (NeoWs). The front-end is built entirely in React by <a style={linkStyle} href="http://www.nmuldavin.com">Noah Muldavin</a>
                            , you should give him a job.</p>
                    </div>
                </Modal>);
        };

        var theme = {
            style: {
                position: "relative",
                border: "none",
                margin: 0,
                fontSize: "0.7em",
                letterSpacing: 6,
                float: "bottom",
                display: "inline-block",
                transform: "translate-y(-50%)",
                outline: "none"
            },
            overStyle: {
                background: "gray"
            },
        };

        var buttonBoxStyle = {
            bottom: 0,
            position: "absolute",
            left: 0
        };

        return (
            <div style={style}>
                <div style={titleStyle}>Armageddon Tracker</div>
                <div style={buttonBoxStyle}>
                    <Button theme={theme} onClick={this.openModal} >What is this?</Button>
                </div>
                <Motion defaultStyle={{y: 0}} style={{y: spring(this.state.modalIsOpen ? 50 : 0)}}>
                    {mod}
                </Motion>
            </div>
        );
    }
});

module.exports = Header;