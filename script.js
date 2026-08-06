<!-- ================= WISHLIST + CART ================= -->

<section class="py-16 bg-orange-50">
  <div class="max-w-7xl mx-auto px-4">

    <h2 class="text-4xl font-bold text-center text-orange-600 mb-10">
      ❤️ Wishlist & 🛒 Cart
    </h2>

    <div class="grid md:grid-cols-3 gap-6">

      <div class="bg-white rounded-2xl shadow-lg p-6 text-center">
        <h3 class="text-2xl font-bold mb-3">❤️ Wishlist</h3>
        <p class="text-gray-600">Save your favourite meals.</p>
        <button onclick="addWishlist()" class="mt-4 bg-pink-600 text-white px-5 py-2 rounded-lg">
          Add to Wishlist
        </button>
      </div>

      <div class="bg-white rounded-2xl shadow-lg p-6 text-center">
        <h3 class="text-2xl font-bold mb-3">🛒 Shopping Cart</h3>
        <p class="text-gray-600">Items in Cart</p>

        <div class="text-5xl font-bold my-4" id="cartCount">0</div>

        <button onclick="addCart()" class="bg-green-600 text-white px-5 py-2 rounded-lg">
          Add to Cart
        </button>
      </div>

      <div class="bg-white rounded-2xl shadow-lg p-6">
        <h3 class="text-2xl font-bold mb-3">🎟 Coupon Code</h3>

        <input id="coupon"
               class="w-full border rounded-lg p-3"
               placeholder="Enter Coupon">

        <button onclick="applyCoupon()"
                class="mt-4 w-full bg-orange-600 text-white py-3 rounded-lg">
          Apply Coupon
        </button>

        <p id="couponMsg" class="mt-4 font-bold text-green-600"></p>

      </div>

    </div>

  </div>
</section>

<script>
let cart = 0;

function addCart(){
    cart++;
    document.getElementById("cartCount").innerHTML = cart;
}

function addWishlist(){
    alert("❤️ Added to Wishlist");
}

function applyCoupon(){

let code=document.getElementById("coupon").value;

if(code==="DURGA10"){
document.getElementById("couponMsg").innerHTML="✅ 10% Discount Applied";
}else{
document.getElementById("couponMsg").innerHTML="❌ Invalid Coupon";
}

}
</script>
