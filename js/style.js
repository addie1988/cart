var product_information = [];
var totalPrice = 0;

// 更新購物車計數
function shopping_quantity() {
  document.getElementById("shopping_Items_id").textContent = product_information.length;
}

// 更新總價格
function updated_prices() {
  totalPrice = product_information.reduce((sum, item) => sum + item.price, 0);
  document.getElementById("checkout_total").textContent = totalPrice;
}

// 顯示購物車內容
function shopping_cart_contents() {
  var display_content = document.getElementById("checkou_list");
  display_content.innerHTML = "";
  product_information.forEach((item) => {
    var li = document.createElement("li");
    var img = document.createElement("img");
    img.src = item.img;
    img.alt = item.name;
    img.style.width = "100px"; // 設定圖片大小
    li.appendChild(img);
    li.appendChild(document.createTextNode(` ${item.name} - $${item.price}`));
    display_content.appendChild(li);
  });
}

// 加入購物車
function show_shopping(product) {
  product_information.push(product);
  shopping_quantity();
  updated_prices();
  shopping_cart_contents();
}

// 結帳
document.getElementById("confirm_checkout").addEventListener("click", () => {
  if (product_information.length === 0) {
    alert("購物車是空的！");
    return;
  }
  alert(`購物成功！總金額為 $${totalPrice}`);
  product_information = [];
  shopping_quantity();
  updated_prices();
  shopping_cart_contents();
});

// 事件監聽器：加入購物車按鈕
document.querySelectorAll(".add_to_cart").forEach((button) => {
  button.addEventListener("click", (event) => {
    const product_items = event.target.closest(".commodity");
    const product = {
      id: product_items.getAttribute("data-id"),
      img: product_items.getAttribute("data-img"),
      name: product_items.getAttribute("data-name"),
      price: parseInt(product_items.getAttribute("data-price").replace(/,/g, ""), 10),
    };
    show_shopping(product);
  });
});
