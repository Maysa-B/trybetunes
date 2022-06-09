import React from 'react';
import '../style/profile.css';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  state = {
    user: {},
    loading: true,
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({ user, loading: false });
  }

  render() {
    const { user: { description, email, image, name }, loading } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />
        {
          loading ? (<Loading />) : (
            <section className="profile-page">
              <div>
                <Link className="edit-link" to="/profile/edit">Editar perfil</Link>
                <img alt={ name } src={ image } data-testid="profile-image" />
              </div>
              <h4>Nome</h4>
              <p>{ name }</p>
              <h4>Email</h4>
              <p>{ email }</p>
              <h4>Descrição</h4>
              <p>{ description }</p>
            </section>
          )
        }
      </div>
    );
  }
}

export default Profile;
