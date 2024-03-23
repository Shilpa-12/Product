// JavaScript source code

import React, { useState, useEffect } from "react";
import TutorialsDataService from "../services/TutorialService";
import { Link } from "react-router-dom";


const TutorialsList = () => {

    const [tutorials, setTutorials] = useState([]);
    const [currentTutorial, setCurrentTutorial] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchName, setSearchName] = useState("");

    useEffect(() => {
        retrieveTutorials();
    }, []);

    const retrieveTutorials = () => {
        TutorialsDataService.getAll().then(response => {
            setTutorials(response.data);
            console.log(response.data);
        }).catch(e => {
            alert(e.message);
            console.log(e);
        });
    };

    const refreshList = () => {
        retrieveTutorials();
        setCurrentTutorial(null);
        setCurrentIndex(-1);
    }

    const setActiveTutorial = (tutorial, index) => {
        setCurrentTutorial(tutorial);
        setCurrentIndex(index);
    };

    const onChangeSearchTitle = e => {
        const searchName = e.target.value;
        setSearchName(searchName);
    };

    const findByName = () => {
        TutorialsDataService.findByName(searchName).then((response) => {
            setTutorials(response.data);
            console.log(response.data);
        }).catch((e) => {
            console.log(e)
        });
    };

    const removeAllTutorials = () => {
        TutorialsDataService.removeAll().then((response) => {

            console.log(response.data);
            refreshList();
        }).catch((e) => {
            console.log(e)
        });
    };


    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text" className="form-control"
                        placeholders="Search by title"
                        value={searchName}
                        onChange={onChangeSearchTitle}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary" type="button" onClick={findByName}>
                            Search
                        </button>
                    </div>
                </div>
            </div>

            <div className="col-md-6">
                <h4>Tutorials List:</h4>
                <ul className="list-group">
                    {
                        tutorials && tutorials.map((tutorial, index) => (
                            <li className={
                                "list-group-item " + (index === currentIndex ? "active" : "")
                            }
                                onClick={() => setActiveTutorial(tutorial, index)}
                                key={index}
                            >
                                {tutorial.name}
                                
                            </li>
                        )
                        )}
                </ul>

                <button className="m-3 btn btn-sm btn-danger">
                    onClick={removeAllTutorials}
                    Remove All
                </button>
            </div>

            <div className="col-md-6">
                {currentTutorial ? (
                    <div>
                        <h4>Tutorial</h4>
                        <div>
                            <label>
                                <strong>Name:</strong>
                            </label>{" "}
                            {currentTutorial.name}
                        </div>
                        <div>
                            <label>
                                <strong>Description:</strong>
                            </label>{" "}
                            {currentTutorial.description}
                        </div>
                        <div>
                            <label>
                                <strong>Imagepath:</strong>
                            </label>{" "}
                            {currentTutorial.imagepath}
                        </div>
                        <div>
                            <label>
                                <strong>Price:</strong>
                            </label>{" "}
                            {currentTutorial.price}
                        </div>
                        <div>
                            <label>
                                <strong>Quantity:</strong>
                            </label>{" "}
                            {currentTutorial.quantity}
                        </div>

                        <Link to={"/tutorials" + currentTutorial.id} className="badge badge-warning">
                            Edit
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on Tutorial..</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TutorialsList;
