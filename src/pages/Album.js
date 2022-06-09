import React from 'react';
import '../style/album.css';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import musicsAPI from '../services/musicsAPI';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

class Album extends React.Component {
  state = {
    musicList: [],
    firstContent: {},
    favoritesSongs: {},
    loading: false,
  }

  handleRemoveFav = async (obj) => {
    this.setState({ loading: true });
    await removeSong(obj);
    this.setState({ favoritesSongs: await getFavoriteSongs() });
    this.setState({ loading: false });
    this.compareFavsToOthers();
  }

  handleFavCheck = async (obj) => {
    obj.checked = true;
    this.setState({ loading: true });
    await addSong(obj);
    this.setState({ favoritesSongs: await getFavoriteSongs() });
    this.setState({ loading: false });
    this.compareFavsToOthers();
  }

  compareFavsToOthers = () => {
    const { favoritesSongs, musicList } = this.state;
    const newList = musicList;
    musicList.forEach((el, id) => {
      newList[id].checked = favoritesSongs.some((e) => {
        if (e.trackId === el.trackId) return true;

        return false;
      });
    });
    this.setState({ musicList: newList });
  }

  componentDidMount = async () => {
    this.setState({ loading: true, favoritesSongs: await getFavoriteSongs() });
    const { match: { params: { id } } } = this.props;
    const APIresult = await musicsAPI(id);
    this.setState({ firstContent: APIresult[0] });
    const musicList = APIresult.filter((el, i) => {
      if (i !== 0) return el;
      return null;
    });
    this.setState({ musicList, loading: false }, () => this.compareFavsToOthers());
  }

  render() {
    const { musicList, firstContent, loading } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        { (musicList.length > 0) && (
          loading ? (<Loading />) : (
            <section className="album-page">
              <div className="information shadow p-3 mb-5 bg-body rounded">
                <img
                  alt={ firstContent.collectionName }
                  src={ firstContent.artworkUrl100 }
                />
                <h1 data-testid="album-name">{firstContent.collectionName}</h1>
                <h2 data-testid="artist-name">{firstContent.artistName}</h2>
              </div>
              <div>
                {musicList.map((el) => (<MusicCard
                  clickSave={ this.handleFavCheck }
                  clickDelete={ this.handleRemoveFav }
                  key={ el.trackId }
                  obj={ el }
                />))}
              </div>
            </section>)
        )}

      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Album;
