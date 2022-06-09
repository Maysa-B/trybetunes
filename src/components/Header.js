import React from 'react';
import '../style/header.css';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import LOGO from '../imgs/trybetunes-removebg-preview.png';

class Header extends React.Component {
  state = {
    loading: false,
    userName: '',
  }

  componentDidMount = async () => {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({ loading: false, userName: user.name });
  }

  render() {
    const { loading, userName } = this.state;
    return (
      <header data-testid="header-component">
        { loading ? (
          <Loading />
        ) : (
          <>
            <div className="img-name">
              <img
                className="logo-header"
                alt="logo-trybe-tunes"
                src={ LOGO }
              />
              <h2 data-testid="header-user-name">
                { userName }
              </h2>
            </div>
            <nav>
              <Link
                className="link-header"
                to="/search"
                data-testid="link-to-search"
              >
                Search

              </Link>
              <Link
                className="link-header"
                to="/favorites"
                data-testid="link-to-favorites"
              >
                Favorites

              </Link>
              <Link
                className="link-header"
                to="/profile"
                data-testid="link-to-profile"
              >
                Profile

              </Link>
            </nav>
          </>
        )}
      </header>
    );
  }
}

export default Header;
