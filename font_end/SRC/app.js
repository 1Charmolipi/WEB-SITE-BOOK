Vue.component('product-card', {
  props: ['img', 'name', 'old_price', 'new_price', 'type_money'],
  computed: {
    formattedOldPrice() {
      // Đảm bảo rằng giá là một chuỗi hoặc số hợp lệ trước khi định dạng
      let formattedPrice = parseFloat(this.old_price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return formattedPrice;  // Trả về giá đã được định dạng
    },
    // Định dạng giá mới trực tiếp trong computed
    formattedNewPrice() {
      let formattedPrice = parseFloat(this.new_price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return formattedPrice;  // Trả về giá đã được định dạng
    },
     // Tính toán phần trăm giảm giá
     discountPercentage() {
      let discount = ((this.old_price - this.new_price) / this.old_price) * 100;
      return discount.toFixed(0); 
    }
  },
  template: `
        <div class="product-card">
            <img :src="img" :alt="name" class="product-image">
            <div class="product-title">{{ name }}</div>
            <div class="product-price">
              <span class="old-price">{{ formattedOldPrice }} {{ type_money }}</span>
              <span class="new-price">{{ formattedNewPrice }} {{ type_money }}</span>
              <span class="discount-tag">-{{ discountPercentage }}%</span>
            </div>    

            <div class="flex-btn">
              <button class="btn-add-to-cart" > <i class="fas fa-shopping-cart" style="color:white"></i></button>
              <button class="btn-buy-now" >Mua ngay</button>
            </div>
        </div>
  `,
});

new Vue({
    el: "#app",
    data() {
      return {
        notification: "",  // Chứa thông báo
        posters:[],
        poster_skill:"",
        poster_family:"",
        poster_science:"",
        products:[],
        products_skill:[],
        products_family:[],
        products_science:[],
        
        notiVisible: false,
        userVisible: false,

        menuVisible: false,
        categories:[],
        subcategories:[],
        activeCategory: {},

        chatBoxVisible: false,
      };
    },
    mounted() {
      // Lấy dữ liệu từ file JSON khi component được mount
      fetch('../DATABASE/data.json') // Đảm bảo đường dẫn chính xác
        .then(response => response.json())  // Chuyển đổi dữ liệu thành đối tượng JavaScript
        .then(data => {
          this.notification = data.notification;  // Gán giá trị thông báo vào data của Vue
          this.posters = data.posters;
          this.products = data.product;
          this.poster_skill = data.poster_skill;
          this.poster_science = data.poster_science;
          this.products_science = data.product_science;
          this.products_family = data.products_family;
          this.poster_family = data.poster_family;

          this.categories = data.categories
          this.subcategories = data.subcategories
        })
        .catch(error => console.error('Có lỗi xảy ra:', error));  // Xử lý lỗi nếu có
    },
    methods:{
      menuClick(){
        if(this.menuVisible === false){ // Ẩn hiện menu khi ấn nút
          this.menuVisible = true;
        }
        else {this.menuVisible = false;}
      },
      hideMenu(){
        this.menuVisible = false; // Ẩn menu khi rời
      },
      showSubmenu(index) {
        this.activeCategory = index; // Hiện submenu danh mục đang hover
      },
      hideSubmenu() {
        this.activeCategory = null; // ẩn submenu khi rời
      },
      chatClick(){ // Ẩn hiện chatbox ấn nút
        if(this.chatBoxVisible === false){
          this.chatBoxVisible = true;
        }
        else {this.chatBoxVisible = false;}
      },
      notiClick(){ // Ẩn hiện thông báo khi ấn nút
        if(this.notiVisible === false){
          this.notiVisible = true;
        }
        else {this.notiVisible = false;}
        this.userVisible = false;
      },
      userClick(){
        if(this.userVisible === false){
          this.userVisible = true;
        }
        else {this.userVisible = false;}
        this.notiVisible = false;
      }
    }
  });
  