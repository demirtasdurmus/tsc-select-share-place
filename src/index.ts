import axios from "axios";

const form = document.querySelector("form")!;
const address = document.querySelector("#address")! as HTMLInputElement;

// create a google response type
type GoogleGeocodingRes = {
    results: { geometry: { location: { lat: number; lng: number } } }[],
    status: "OK" | "ZERO_RESULTS"
};

const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const userInput = address.value;

    try {
        const res = await axios.get<GoogleGeocodingRes>(`${process.env.GOOGLE_GEO_LOCATION_API_ENDPOINT}?address=${encodeURI(userInput)}&key=${process.env.GOOGLE_GEO_LOCATION_API_KEY}`);
        if (res.data.status !== "OK") {
            throw Error("No results found!")
        }
        const coordinates = res.data.results[0].geometry.location
        // render the map to the ui
        const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
            center: coordinates,
            zoom: 10,
        });
        // add a marker to the map
        new google.maps.Marker({
            position: coordinates,
            map: map,
        });
    } catch (err: any) {
        alert(err.message)
    }
};

form.addEventListener("submit", handleSubmit);