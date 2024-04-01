import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { fetchImages } from "./js/pixabay-api.js";
import { renderImages } from "./js/render-functions.js";


let query;
const galleryList = document.querySelector(".gallery");
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

  query = event.target.elements.search.value.trim();

  showLoader();
  if (query === "") {
      iziToast.warning({
          color: 'yellow',
          message: "Please fill in the field for search!",
          position: 'topRight'
      })
      return
  }
    fetchImages(query).then(data =>{
      if (data.hits.length === 0) {
          iziToast.error({
            message: "Sorry, there are no images matching your search query. Please try again!",
            backgroundColor: "red",
            messageColor: "white",
            position: 'topRight'})
          }
          renderImages(data.hits)

          event.target.reset();
          
      return
    })
    .catch(error => {console.log(error);
          iziToast.error({
            title: 'Error',
            message: `Sorry, there are no images matching your search query. Please, try again!`,
            position: 'topRight'}
            )
          }).finally(() => hideLoader())
        }

