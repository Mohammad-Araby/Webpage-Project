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

let data = await fecthData();

console.log(data)
let html = "";
for (let i = 0; i<8; i++) {
    let recipe = data[i];
    html += `
        <div class="card">
            <img src="${recipe.image}" alt="" class="card-img">
            <p class="card-title">${recipe.name}</p>
            <p class="card-category">${recipe.mealType && recipe.mealType[0]}</p>
            <p class="card-description">${shortDescription(recipe)}</p>
            <p class="card-calories">${recipe.caloriesPerServing} cal</p>
            <button class="card-button">View Details</button>
            <button class="favorite-button" type="button" data-id="${recipe.id}"">
                Add to favorites
            </button>
        </div>
    `;
}
cards_section.innerHTML = html;