let cards_section = document.getElementById("cards-section");

function shortDescription(recipe) {
    let text = recipe.description || (recipe.instructions && recipe.instructions[0]) || "";
    return text;
}

async function fecthData() {
    let res = await fetch('https://dummyjson.com/recipes');
    let temp = await res.json();
    return temp.recipes
}

function addToFavorites(id) {
    let storage = JSON.parse(localStorage.getItem('favorites')) || [];

    storage.push(id);

    localStorage.setItem('favorites', JSON.stringify(storage));
}

function removeFromFavorites(id) {
    let storage = JSON.parse(localStorage.getItem('favorites')) || [];

    storage = storage.filter(temp => temp !== id);

    localStorage.setItem('favorites', JSON.stringify(storage));
}

let data = await fecthData();

console.log(data)
let html = "";
for (let i = 0; i<30; i++) {
    let recipe = data[i];
    html += `
        <div class="card">
            <img src="${recipe.image}" alt="" class="card-img">
            <p class="card-title">${recipe.name}</p>
            <p class="card-category">${recipe.mealType && recipe.mealType[0]}</p>
            <p class="card-description">${shortDescription(recipe)}</p>
            <p class="card-calories">${recipe.caloriesPerServing} cal</p>
            <div class="card-actions">
            <button class="card-button">View Details</button>
            <button class="favorite-button" type="button" data-id="${recipe.id}" id="">
                Add to favorites
            </button>
            </div>
        </div>
    `;
}
cards_section.innerHTML = html;

document.getElementById('cards-section').addEventListener('click', (event) => {
    const button = event.target.closest('.favorite-button');
    if (!button) return;

    if (button.textContent == 'Add to favorites') {
        button.textContent = 'Added';
        addToFavorites(button.dataset.id);
        button.classList.add("is-favorite");
    }
    else {
        button.textContent = 'Add to favorites';
        removeFromFavorites(button.dataset.id);
        button.classList.remove("is-favorite");
    }
  });