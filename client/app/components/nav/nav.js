'use strict';

var React = require('react/addons');
var api = require('../../utilities/api');
var logError = require('../../utilities/logError');

var Nav = React.createClass({
  getInitialState: function () {
    return {
      hideMenu: true,
      isLogin: false,
      user: null
    }
  },
  componentDidMount: function () {
    var self = this;
    api.getStatus().then(function(result) {
      self.setState({
        isLogin: result.isLogin,
        user: result.user
      });
    }).catch(logError);
  },
  handleToggleMenu: function () {
    this.setState({
      hideMenu: !this.state.hideMenu
    })
  },
  render: function () {
    var cx = React.addons.classSet;
    var logoClass = cx({
      'nav-logo': true,
      'hide': !this.state.hideMenu
    });
    var menuClass = cx({
      'nav-menu': true,
      'hide': this.state.hideMenu
    });

    return (
      <nav className="nav">
        <div className={ logoClass }
             onClick={ this.handleToggleMenu }>
          <h1>K</h1>
        </div>
        <div className={ menuClass }
             onMouseLeave={ this.handleToggleMenu }>
          <ul className="nav-menu-list">
            <li className="nav-menu-item">
              <a title="回首頁" href="/">
                <i className="icon icons-keanux">K</i>
                  <span className="nav-menu-title">
                    首頁
                  </span>
              </a>
            </li>
            {this.state.isLogin ?
              <li className="nav-menu-item">
                <a title="到個人頁面" href="#">
                  <i className="icon icons-avatar">
                    <img src={ this.state.user.photo }/>
                  </i>
                    <span className="nav-menu-title">
                      { this.state.user.nickname }
                    </span>
                </a>
              </li> :
              <li className="nav-menu-item">
                <a title="Login" href="api/login/facebook">
                    <span className="nav-menu-title">
                      Facebook Login
                    </span>
                </a>
              </li>
            }
          </ul>
        </div>
      </nav>
    );
  }
});

module.exports = Nav;
