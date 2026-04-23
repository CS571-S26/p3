import { useEffect, useState } from "react";
import { Outlet } from "react-router";

import MadEatsNavbar from "../components/nav/MadEatsNavbar";
import RestaurantsDataContext from "../contexts/RestaurantsDataContext";

import restaurantsJSON from "../restaurants.json"

export default function MadEats() {
    const [restaurants, setRestaurants] = useState({
        discoverable: [],
        save: [],
        review: []
    });

    useEffect(() => {
        const currRestaurants = restaurantsJSON

        //const discoverableRestaurants = JSON.parse(sessionStorage.getItem("discoverable")) || [];
        const savedRestaurants = JSON.parse(sessionStorage.getItem("saved")) || [];
        const reviewedRestaurants = JSON.parse(sessionStorage.getItem("review")) || [];

        const discoverable = currRestaurants.filter(rest => !savedRestaurants.includes(rest.name) && !reviewedRestaurants.includes(rest.name))
        const save = currRestaurants.filter(rest => savedRestaurants.includes(rest.name))
        const review = currRestaurants.filter(rest => reviewedRestaurants.includes(rest.name))
 
        setRestaurants({   
            discoverable,
            save,
            review
        });
        
    }, []);
    
    const move = (from, to, restName) => {
        if (from === to) { 
            return;
        }

        // handle moving between discover, save, and reviews
        setRestaurants(oldRestaurants => {
            let fromPage = oldRestaurants[from]; 
            let toPage = oldRestaurants[to]; 
            const toMove = fromPage.find(rest => rest.name === restName);

            const newRestaurants = {...oldRestaurants};
            newRestaurants[from] = fromPage.filter(rest => rest.name !== restName); // remove from current page
            newRestaurants[to] = [...toPage, toMove]; // place it in new page
                 
            // add the restaurant to saved restaurants
            if (to === "save") {
                const savedRestaurants = JSON.parse(sessionStorage.getItem("saved")) || [];
                if (!savedRestaurants.includes(restName)) {
                    savedRestaurants.push(restName);
                }
                sessionStorage.setItem("saved", JSON.stringify(savedRestaurants));
            } 
            // remove the restaurant from saved restaurants
            else if (from === "save") {
                const savedRestaurants = JSON.parse(sessionStorage.getItem("saved")) || [];
                const removed = savedRestaurants.filter((rest) => rest !== restName);
                sessionStorage.setItem("saved", JSON.stringify(removed));
            }

            // add the restaurant to review
            if (to === "review") {
                const reviewedRestaurants = JSON.parse(sessionStorage.getItem("review")) || [];
                if (!reviewedRestaurants.includes(restName)) {
                    reviewedRestaurants.push(restName);
                }
                sessionStorage.setItem("review", JSON.stringify(reviewedRestaurants));
            } 
            // remove the restaurant from reviewed restaurants
            else if (from === "review") {
                const reviewedRestaurants = JSON.parse(sessionStorage.getItem("review")) || [];
                const removed = reviewedRestaurants.filter((rest) => rest !== restName);
                sessionStorage.setItem("review", JSON.stringify(removed));
            }

            return newRestaurants;
        })
    }

    return <div>
        <MadEatsNavbar />
        <div style={{ margin: "1rem" }}>
            <RestaurantsDataContext.Provider value={[restaurants, setRestaurants, move]}>
                <Outlet />
            </RestaurantsDataContext.Provider>
        </div>
    </div>
}