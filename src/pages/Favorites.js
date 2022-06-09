import React from 'react';
import '../style/favorites.css';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  state = {
    favoritesSongs: {},
    loading: false,
  }

  handleRemoveFav = async (obj) => {
    this.setState({ loading: true });
    await removeSong(obj);
    this.setState({ favoritesSongs: await getFavoriteSongs() });
    this.setState({ loading: false });
  }

  componentDidMount = async () => {
    this.setState({ loading: true });
    const favorites = await getFavoriteSongs();
    this.setState({ favoritesSongs: favorites, loading: false });
  }

  render() {
    const { favoritesSongs, loading } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        { (favoritesSongs.length > 0) && (loading ? (
          <Loading />
        ) : (
          <div className="fav-container">
            {favoritesSongs.map((el) => (
              <MusicCard
                clickSave={ this.handleRemoveFav }
                clickDelete={ this.handleRemoveFav }
                key={ el.trackId }
                obj={ el }
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default Favorites;
