export function fetchImages(query) {
    const searchParams = new URLSearchParams({
        key: "43104791-fccc42375971f64c47e678deb",
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true",
    });

    const url = `https://pixabay.com/api/?${searchParams}`;

    return fetch(url).then(response => {
        if (!response.ok) {

            throw new Error(response.status)
        }

        return response.json();
    });
}

