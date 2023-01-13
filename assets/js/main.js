
const products = [
	{
		id: 1,
		name: 'Hoodies',
		price: 14.00,
		image: 'assets/images/featured1.png',
		category: 'hoodies',
		stock: 5
	},

	{
		id: 2,
		name: 'Shirts',
		price: 24.00,
		image: 'assets/images/featured2.png',
		category: 'shirts',
		stock: 3
	},
	{
		id: 3,
		name: 'Sweatshirts',
		price: 24.00,
		image: 'assets/images/featured3.png',
		category: 'sweatshirts',
		stock: 2
	}
];

const cartShopping = [];

const body = document.body;
const navbar = document.querySelector(".navbar");
const menu = document.querySelector(".navbar__menu--index");
const shoppingcart = document.querySelector(".main__shoppingCart");
const cart__count = document.querySelector(".cart__count");
const container = document.querySelector(".main__products");
const add__container = document.querySelector(".added__elements");
const iconDarkMode = document.querySelector(".bx-moon");
const shoppingcartIcon = document.querySelector(".bx-shopping-bag");
const iconMenu = document.querySelector(".bx-grid-alt");
const closeButton = document.querySelector(".bx-x");
const main__filter = document.querySelector('.main__filter');


//ingreso los productos al dom dinamicamente
const addingProductsDom = () => {

	addingProducts(products);

	main__filter.addEventListener('click', ({ target }) => {

		if (target.className.includes('filter__showAll') || target.parentElement.className.includes('filter__showAll')) addingProducts(products);
		if (target.className.includes('filter__hoodie') || target.parentElement.className.includes('filter__hoodie')) addingProducts(products.filter(item => item.name === 'Hoodies'));
		if (target.className.includes('filter__shirt') || target.parentElement.className.includes('filter__shirt')) addingProducts(products.filter(item => item.name === 'Shirts'));
		if (target.className.includes('filter__sweatshirts') || target.parentElement.className.includes('filter__sweatshirts')) addingProducts(products.filter(item => item.name === 'Sweatshirts'));

	});

}
//manejo los eventos de los clicks para pintar las acciones en el dom
const addingProductsToCartShopping = () => {
	const buttons = document.querySelectorAll(".icon__product");
	buttons.forEach(button => {

		button.addEventListener("click", e => {
			e.preventDefault();
			addToCartAlgorithm(e);
			addingProductsCartDom();
			countItemsCartDom();
			totalSum();
		});
	});
}
// este metodo agrega, quita y elimina totalmente elementos del carrito
const cartActionsButton = () => {

	shoppingcart.addEventListener("click", e => {
		const buttonClicked = e.target.getAttribute("data-id");
		const validar = cartShopping.filter(item => item.id == buttonClicked);
		if (e.target.classList[1] === "bx-plus") validar[0].addCount = validar[0].addCount + 1;
		if (e.target.classList[1] === "bx-minus") validar[0].addCount = validar[0].addCount - 1;
		if (e.target.classList[1] === "bx-trash") validar[0].addCount = 0;
		addingProductsCartDom();
		countItemsCartDom();
		totalSum();
		localStorage.setItem("cart", JSON.stringify(cartShopping));
	});
}
//funcion para agregar los articulos al dom y esta funcion se llama dentro de addingProductsToCartShopping
const addingProductsCartDom = (e) => {


	let cant = getCountItems();

	if (cartShopping.length === 0 || cant === 0) {
		localStorage.removeItem('cart');
		add__container.innerHTML = `<div class="added__elements--empty">
                                        <img src="assets/images/empty-cart.png" alt="empty cart">
                                        <h2>Your cart is empty</h2>
                                        <p>You can add items to your cart by clicking on the + button on the product page.</p>
                                    </div> `;

	} else {
		add__container.innerHTML = "";
		cartShopping.forEach((item) => {

			if (item.addCount !== 0) {
				
				if (item.stock+1 === item.addCount) {
					alert("No tengo mas en stock");
					item.addCount = item.stock
				} 
				
				let html = `<div class="added__element">
                            <div class="cart__image">
                                <img src="${item.image}" alt="">
                            </div>
                            <div class="cart__content">
                                <h4>${item.name}</h4>
                                <p>Stock: ${item.stock} | <span>${item.price}</span></p>
                                <h5><span>Subtotal: ${item.addCount * item.price}</span></h5>
                                <div class="cart__buttons">
                                    <div class="cart__button--add">
                                        <div><i data-id=${item.id}  class='bx bx-minus'></i></div>
                                        <div><p class="text__color">${item.addCount} unid</p></div>
                                        <div><i data-id=${item.id} class='bx bx-plus'></i></div>
                                    </div>
                                    <div class="cart__button--delete">
                                        <span><i data-id=${item.id} class='bx bx-trash' ></i></span>
                                    </div>
                                    </div>
                            </div>
                        </div>`;
						
				add__container.innerHTML += html;

				// if (item.stock+1 === item.addCount) {
				// 	alert("No tengo mas en stock");
				// 	item.addCount = item.stock
				// } 
			}

		});
	}
}
//Pinto la notificacion de la cantidad de productos agregados
const countItemsCartDom = () => {

	cart__count.innerHTML = getCountItems();
}
//algoritmo para pintar los articulos en el dom
const addingProducts = (products) => {
	container.innerHTML = '';
	products.forEach(element => {
		let html = `<div class="main__product">
                        <img src="${element.image}" alt="${element.image}">
                        <div class="product__description">
                        <h3>PEN ${element.price}</h3>
                        <span>Stock: ${element.stock}</span>
                        <p class="text__color">${element.name}</p>
                        <div class="icon__product"><i data-id=${element.id} class='bx bx-plus'></i></div>
                        </div>
                    </div> `;
		container.innerHTML += html;
	});
}
// suma total del pago y los items 
const totalSum = () => {

	const totalItems = document.querySelector(".total__sum--items");
	const totalSum = document.querySelector(".total__sum--price");

	let cont = 0;
	cartShopping.forEach(item => {
		cont += item.addCount * item.price;
	});
	totalSum.innerHTML = `PEN ${cont}.00`;
	totalItems.innerHTML = `Items: ${getCountItems()}`;
}
//algoritmo para calcular la cantidad de elementos agregados al carrito
const getCountItems = () => {
	let totalItems = 0;
	cartShopping.forEach(item => {
		totalItems += item.addCount;
	});
	return totalItems;
}
//Algoritmo para agregar elementos al array cartShopping y al local storage
const addToCartAlgorithm = (e) => {
	const producto = products.filter(item => item.id === parseInt(e.target.getAttribute("data-id")));
	if (cartShopping.length === 0) {
		cartShopping.push({
			id: producto[0].id,
			name: producto[0].name,
			price: producto[0].price,
			image: producto[0].image,
			category: producto[0].category,
			stock: producto[0].stock,
			addCount: 1
		});
		localStorage.setItem("cart", JSON.stringify(cartShopping));

	} else {
		const validation = cartShopping.filter(item => item.id === producto[0].id);

		if (validation.length === 0) {
			cartShopping.push({
				id: producto[0].id,
				name: producto[0].name,
				price: producto[0].price,
				image: producto[0].image,
				category: producto[0].category,
				stock: producto[0].stock,
				addCount: 1
			});
			localStorage.setItem("cart", JSON.stringify(cartShopping));
		} else {
			validation[0].addCount = validation[0].addCount + 1;
			localStorage.setItem("cart", JSON.stringify(cartShopping));
		}

	}
}
//funcion para cambiar el icono al dar un click
const swtichIcons = (element, classToEvaluate, icon, iconClassOne, iconClassTwo) => {

	if (element.classList.contains(`${classToEvaluate}`)) {
		icon.classList.remove(`${iconClassOne}`);
		icon.classList.add(`${iconClassTwo}`);
	} else {
		icon.classList.remove(`${iconClassTwo}`);
		icon.classList.add(`${iconClassOne}`);
	}
}
//funcion para saber la posicion en la que estoy en el dom y ubicarla en el navbar
const navPosition = () => {

	const entries = document.querySelectorAll(".observer");
	const home = document.querySelector(".nav__home");
	const products = document.querySelector(".nav__products");

	const ob = new IntersectionObserver(entries => {
		if (entries[0].intersectionRatio > 0.5) {
			home.classList.toggle("focus");
		} else {
			home.classList.toggle("focus");
			products.classList.toggle("focus");
		}
	});
	entries.forEach(item => ob.observe(item));
}
// Dark mode
const darkMode = () => {

	iconDarkMode.addEventListener("click", e => {
		e.preventDefault();

		const active = body.classList.toggle("darkmode");
		swtichIcons(body, "darkmode", iconDarkMode, "bx-moon", "bx-sun");
		localStorage.setItem("icon", `${iconDarkMode.classList[1]}`);
		localStorage.setItem("darkmode", `${active}`);

	});
}
//cuando recargo la pagina se guardan los cambios
const refreshPage = () => {

	document.addEventListener("DOMContentLoaded", e => {

		if (localStorage.getItem("cart") !== null) {
			const carLocalStorage = JSON.parse(localStorage.getItem("cart"));
			cartShopping.push(...carLocalStorage);
			addingProductsCartDom();
			countItemsCartDom();
			totalSum();
		}
		if (localStorage.getItem("darkmode") === "true") {

			body.classList.add("darkmode");
			iconDarkMode.classList.remove("bx-moon");
			iconDarkMode.classList.add(`${localStorage.getItem("icon")}`);
		}
		addingProductsCartDom();


	});
}
// LOADING
const loadingAcademlo = () => {
	const containerLoading = document.querySelector('.loading');
	window.addEventListener('load', () => containerLoading.style.display = 'none');
}
//aplico el menu fijo
const stickyMenu = () => {

	window.addEventListener("scroll", (event) => {
		let scrollY = this.scrollY;
		scrollY !== 0 ? navbar.classList.add("stickyMenu") : navbar.classList.remove("stickyMenu");

	});
}
//deslizo el menu lateral
const dropdownMenu = () => {


	iconMenu.addEventListener("click", e => {
		e.preventDefault();
		menu.classList.toggle("active");
		iconMenu.style.position = "relative";
		shoppingcartIcon.style.position = "relative";
		swtichIcons(menu, "active", iconMenu, "bx-grid-alt", "bx-x");
	});

}
//deslizo el menu del carrito
const dropdownCart = () => {

	shoppingcartIcon.addEventListener("click", e => {
		e.preventDefault();
		shoppingcart.classList.toggle("active");
	});
	closeButton.addEventListener("click", e => {
		e.preventDefault();
		shoppingcart.classList.toggle("active");
	});
	cart__count.addEventListener("click", e => {
		e.preventDefault();
		shoppingcart.classList.toggle("active");
	});

}

loadingAcademlo()
refreshPage();
stickyMenu();
darkMode();
dropdownMenu();
dropdownCart();
navPosition();
addingProductsDom();
addingProductsToCartShopping();
cartActionsButton();