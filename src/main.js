import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { fetchImages } from "./js/pixabay-api.js";
import { renderImages } from "./js/render-functions.js";



const galleryList = document.querySelector(".gallery");
let query;
const input = document.querySelector("input");
const form = document.querySelector("form");
const loader = document.querySelector('.loader');

//*===========================================================================================================

function showLoader() {
    loader.classList.remove("is-hidden");}


function hideLoader() {
    loader.classList.add("is-hidden");}

//*===========================================================================================================

form.addEventListener("submit", validInput);

function validInput(event){
    event.preventDefault();

    galleryList.innerHTML = "";

    query = input.value.trim();

    showLoader();

    if (query === "") {
        iziToast.show({
            color: 'yellow',
            message: "Please fill in the field for search!",
            position: 'topRight',
        })
        return
    }
      fetchImages(query)
        .then(data => renderImages(data.hits)).catch(error => {
          console.log(error);
            iziToast.error({
              title: 'Error',
              message: `❌ Sorry, there are no images matching your search query. Please, try again!`,
              position: 'topRight',})}).finally(() => hideLoader())
          
      event.target.reset();
}
