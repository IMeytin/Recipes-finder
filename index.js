const api = {
    endpoint: "https://api.edamam.com/api/recipes/v2",
    appID: "7351e76b",
    key: "b9a0933a45cd2a3c5b868206ec2ee389"
}

let recipeContainer = document.querySelector('main');
let search = document.querySelector('form');
let searchValue = '';

search.addEventListener('submit', (e) => {
    e.preventDefault();
    searchValue = e.target.querySelector('#input-info').value.toLowerCase();
    if (searchValue === ""){
        return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter a recipe you want to find.',
            confirmButtonColor: '#65862F'
          })
    }
    getRecipes(searchValue);
})

async function getRecipes(data) {
    const res = await fetch (`${api.endpoint}?type=public&q=${data}&app_id=${api.appID}&app_key=${api.key}&imageSize=SMALL&random=false`);
    const result = await res.json();
    showResult(result.hits);
}

function showResult(recipes){
    let showHTML = "";
    recipes.map(item => {
        showHTML += `
        <div class="card">
            <img src="${item.recipe.image}" alt="Recipe photo">
            <h3 class="title">${item.recipe.label}</h3>
            <a class="recipe-link" href="${item.recipe.url}" target="_blank">View Recipe</a>
        </div>`
    })
    recipeContainer.innerHTML = showHTML;
    gsap.from(".card", {
        duration: 1.5,
        y: 50,
        ease: "power1",
        opacity: 0,
        stagger: 0.5
    })
}




