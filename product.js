const products = [
    // 1. OLD MONEY CASUAL OUTFIT
    { name: "Old Money Casual Outfit", category: "Old Money Casual Outfit", gender: "Men", color: "Beige", price: 2499, image: "old-money-1.jpg" },
    { name: "Old Money Casual Outfit", category: "Old Money Casual Outfit", gender: "Men", color: "White", price: 2299, image: "old-money-2.jpg" },
    { name: "Old Money Casual Outfit", category: "Old Money Casual Outfit", gender: "Women", color: "Brown", price: 2199, image: "old-money-3.jpg" },
    { name: "Old Money Casual Outfit", category: "Old Money Casual Outfit", gender: "Women", color: "Beige", price: 2399, image: "old-money-4.jpg" },

    // 2. LUXURY DRESSES
    { name: "Men's Luxury Outfit", category: "Luxury Dresses", gender: "Men", color: "Black", price: 3999, image: "luxury-dress-1.jpg" },
    { name: "Men's Luxury Outfit", category: "Luxury Dresses", gender: "Men", color: "Blue", price: 4299, image: "luxury-dress-2.jpg" },
    { name: "Women's Luxury Bodycon Dress", category: "Luxury Dresses", gender: "Women", color: "Red", price: 3499, image: "luxury-dress-3.jpg" },
    { name: "Women's Luxury Bodycon Dress", category: "Luxury Dresses", gender: "Women", color: "Black", price: 3799, image: "luxury-dress-4.jpg" },

    // 3. JEWELLERY
    { name: "Minimal Jewellery", category: "Jewellery", gender: "All", color: "Gold", price: 999, image: "jewellery-1.jpg" },
    { name: "Minimal Jewellery", category: "Jewellery", gender: "All", color: "Silver", price: 799, image: "jewellery-2.jpg" },
    { name: "Statement Jewellery", category: "Jewellery", gender: "All", color: "Gold", price: 1599, image: "jewellery-3.jpg" },
    { name: "Statement Jewellery", category: "Jewellery", gender: "All", color: "Silver", price: 1399, image: "jewellery-4.jpg" },

    // 4. PERFUME
    { name: "Lily Fragrance", category: "Perfume", gender: "All", color: "White", price: 1999, image: "lily-fragrance.jpg" },
    { name: "Jasmine Fragrance", category: "Perfume", gender: "All", color: "Pink", price: 2299, image: "jasmine-fragrance.jpg" },
    { name: "Rose Fragrance", category: "Perfume", gender: "All", color: "Red", price: 2499, image: "rose-fragrance.jpg" },
    { name: "Woody Fragrance", category: "Perfume", gender: "All", color: "Brown", price: 2799, image: "woody-fragrance.jpg" },

    // 5. BAGS
    { name: "Classic Handbag", category: "Bags", gender: "All", color: "Black", price: 2799, image: "classic-handbag.jpg" },
    { name: "Shoulder Bag", category: "Bags", gender: "All", color: "Brown", price: 2299, image: "shoulder-bag.jpg" },
    { name: "Mini Bag", category: "Bags", gender: "All", color: "Beige", price: 1899, image: "mini-bag.jpg" },
    { name: "Tote Bag", category: "Bags", gender: "All", color: "White", price: 1599, image: "tote-bag.jpg" }
];

const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const genderFilter = document.getElementById("genderFilter");
const colorFilter = document.getElementById("colorFilter");
const sortFilter = document.getElementById("sortFilter");
const clearButton = document.getElementById("clearButton");
const productCount = document.getElementById("productCount");
const noProducts = document.getElementById("noProducts");

if (
    productList && searchInput && categoryFilter &&
    genderFilter && colorFilter && sortFilter && clearButton
) {
    function fillOptions(select, values, label) {
        const oldValue = select.value;
        select.innerHTML = "";

        const first = document.createElement("option");
        first.value = "";
        first.textContent = label;
        select.appendChild(first);

        values.forEach(function (value) {
            const option = document.createElement("option");
            option.value = value;
            option.textContent = value;
            select.appendChild(option);
        });

        if (values.includes(oldValue)) {
            select.value = oldValue;
        }
    }

    const categories = [...new Set(products.map(p => p.category))];
    const colors = [...new Set(products.map(p => p.color))];

    fillOptions(categoryFilter, categories, "All Categories");
    fillOptions(colorFilter, colors, "All Colours");

    function displayProducts() {
        const search = searchInput.value.trim().toLowerCase();
        const category = categoryFilter.value;
        const gender = genderFilter.value;
        const color = colorFilter.value;
        const sort = sortFilter.value;

        let filtered = products.filter(function (product) {
            const searchableText =
                product.name + " " +
                product.category + " " +
                product.color + " " +
                product.gender;

            const matchesSearch =
                searchableText.toLowerCase().includes(search);

            const matchesCategory =
                !category || product.category === category;

            const matchesGender =
                !gender ||
                (product.category !== "Old Money Casual Outfit" &&
                 product.category !== "Luxury Dresses") ||
                product.gender === gender ||
                product.gender === "All";

            const matchesColor =
                !color || product.color === color;

            return matchesSearch && matchesCategory &&
                   matchesGender && matchesColor;
        });

        if (sort === "lowToHigh") {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sort === "highToLow") {
            filtered.sort((a, b) => b.price - a.price);
        }

        productList.innerHTML = "";

        filtered.forEach(function (product) {
            const card = document.createElement("div");
            card.className = "product-card";

            const image = document.createElement("img");
            image.src = "./images/" + product.image;
            image.alt = product.name;

            const name = document.createElement("h3");
            name.textContent = product.name;

            const description = document.createElement("p");
            description.className = "description";
            description.textContent = product.category;

            const price = document.createElement("p");
            price.className = "product-price";
            price.textContent = "₹" + product.price.toLocaleString("en-IN");

            card.appendChild(image);
            card.appendChild(name);
            card.appendChild(description);
            card.appendChild(price);

            productList.appendChild(card);
        });

        if (productCount) {
            productCount.textContent = filtered.length + " Products";
        }

        if (noProducts) {
            noProducts.style.display =
                filtered.length === 0 ? "block" : "none";
        }
    }

    searchInput.addEventListener("input", displayProducts);
    categoryFilter.addEventListener("change", displayProducts);
    genderFilter.addEventListener("change", displayProducts);
    colorFilter.addEventListener("change", displayProducts);
    sortFilter.addEventListener("change", displayProducts);

    clearButton.addEventListener("click", function () {
        searchInput.value = "";
        categoryFilter.value = "";
        genderFilter.value = "";
        colorFilter.value = "";
        sortFilter.value = "";

        displayProducts();
    });

    displayProducts();
}