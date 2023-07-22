import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardList from "../../components/CardList/CardList";
import './Home.css'
import { showAll, orderByName, orderByWeight, filterCreated, filterByTemperament, getAllDogs } from "../../redux/action";

const Home = ({temperaments, currentPage, setCurrentPage}) => {

    const dispatch = useDispatch();

    const dogs = useSelector((state) => state.filteredDogs);

    useEffect(()=>{
      dispatch(getAllDogs())
    }, [])

    const dogsPerPage = 8;


    // ------------ Handlers --------------------//

    const handleOrderByName = (event) => {
        dispatch(orderByName(event.target.value));
    };

    const handleOrderByWeight = (event) => {
        dispatch(orderByWeight(event.target.value));
    };

    const handleFilterCreated = (event) => {
        dispatch(filterCreated(event.target.value));
    };

    const handleFilterByTemperament = (event) => {
        dispatch(filterByTemperament(event.target.value));
    };

    const handelShowAll = (event) => {
        dispatch(showAll(event.target.value))
    }

    // Calcula el índice del primer y último perro en la página actual
    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const dogsToShow = dogs.slice(indexOfFirstDog, indexOfLastDog);

    // Cambia a la página especificada
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calcula el número total de páginas
    const totalPages = Math.ceil(dogs.length / dogsPerPage);

    // Renderiza los números de página como enlaces
    const renderPaginationButtons = () => {
        const buttons = [];

        for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
            buttons.push(
                <button className="pages"
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                >
                    {pageNumber}
                </button>
            );
        }

        return buttons;
    };

    return (
  <div className="contenedor">
    <div className="order-filters">
        <div className="orders">
          <h3 className="orderTitle" >Order By</h3>
          <select className="select" onChange={handleOrderByName}>
            <option value="A">A-Z</option>
            <option value="D">Z-A</option>
          </select>

          <select className="select" onChange={handleOrderByWeight}>
            <option className="option" value="Min">Min</option>
            <option className="option" value="Max">Max</option>
          </select>
        </div>

        <div className="showAllButtonContain">
          <button className="buttonShow" onClick={handelShowAll}>Show All</button>
        </div>
      
        <div className="filters">
          <h3 className="orderTitle">Filters By</h3>
          <select className="select" onChange={handleFilterCreated}>
            <option className="option" value="Existing">Existing</option>
            <option className="option" value="Created">Created</option>
          </select>

          <select className="select" onChange={handleFilterByTemperament}>
            <option className="option" value="All">All</option>
            {temperaments && temperaments.map((temperament) => (
              <option className="option" key={temperament.id} value={temperament.name}>{temperament.name}</option>
            ))}
          </select>
        </div>
    </div >

    <hr />
    <div className="pagination">
      <p>pages</p>
      {renderPaginationButtons()}
    <hr />
    </div>

    <div className="contList">
    <div className="firstDogs">
      <CardList dogs={dogsToShow} className="cardList"/>
    </div>
    </div>
    <hr />
  </div>
);

};

export default Home
