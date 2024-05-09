import { Route, Routes } from "react-router-dom";
import { Header } from "./component/Header";
import Home from "./pages/home";
import Movies from "./pages/movies";
import Series from "./pages/series";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieDetails from "./pages/movies/MovieDetails";
import SeriesDetails from "./pages/series/SeriesDetails";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="bg-blue-gray-50">
      <div className=" flex justify-center ">
        <Header />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route
          path="/movie/:movieid/title/:moviename"
          element={<MovieDetails />}
        />

        <Route path="/series" element={<Series />} />
        <Route
          path="/series/:seriesid/name/:seriesname"
          element={<SeriesDetails />}
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
