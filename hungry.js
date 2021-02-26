const submitBTN = document.getElementById('submit');
const food = document.getElementById('food');
const foodResult = document.getElementById('food-result');
const firstLetterSearch = document.getElementById('firstLetter-search')
const foodIngredients = document.getElementById('food-instructions')

// All Meal Names by Search
submitBTN.addEventListener('click', () => {
    let foodSearch = document.getElementById('food-Search').value
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodSearch}`)
        .then(res => res.json())
        .then(data => {
            let markup = '';
            if (data.meals) {
                data.meals.forEach(meal => {
                    markup += `
                <div onClick="showFoodDetails('${meal.idMeal}')"class = "meal-item">                
                        <div class = "meal-img">
                            <img  src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            
                        </div>
                        </div>
                    
                `;
                });
                foodResult.classList.remove('notFound');
            } else {
                markup = `Sorry! Food Item is not available Yet 😩`
                foodResult.classList.add('notFound');

            }
            foodResult.innerHTML = markup;

        })
})


// Meal Details on Click
const showFoodDetails = mealDetails => {
    //console.log(mealDetails);
    const detailsURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealDetails}`
    fetch(detailsURL)
        .then(res => res.json())
        .then(data => {
            displayInstructions(data.meals[0]);
        })
}

const displayInstructions = mealInstructions => {
    const ingredients = [];
    for (let i = 1; i < 20; i++) {
        if (mealInstructions[`strIngredient${i}`]) {
            ingredients.push(`${mealInstructions[`strMeasure${i}`]}-${mealInstructions[`strIngredient${i}`]}`)
        } else {
            break;
        }
    }
    foodIngredients.innerHTML = `
    <div class="meal-ingredients">
        <div >
            <img  src = "${mealInstructions.strMealThumb}" alt = "food">
        </div>
        <br>
        <div class="meal-instruction-name">
            <h3>${mealInstructions.strMeal}</h3>
            <br>
            <br> 
            <h3>Ingredients</h3>
        </div>
        <div>
            <ul>
            ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
        </div>
    </div>
    `
}