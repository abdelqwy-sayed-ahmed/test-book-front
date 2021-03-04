import React,{useContext} from 'react';
import userContext from '../../../context/userContext';

const GenreList = () => {
  const lists=useContext(userContext)
  const genres=lists.genres 
  const handleGenreSelect=lists.handleGenreSelect
  const selectedGenre=lists.selectedGenre
  return (
    <React.Fragment>
      <ul className="list-group text-center">
            {genres.map(genre=>(
              <li className={genre===selectedGenre?"list-group-item active":"list-group-item"} 
              key={genre._id} style={{cursor:'pointer'}} onClick={()=>handleGenreSelect(genre)}>{genre.title}</li>
            ))}

          </ul>
    </React.Fragment>
  );
};

export default GenreList;