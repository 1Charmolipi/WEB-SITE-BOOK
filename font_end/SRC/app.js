Vue.component('product-card', {
  props: ['image', 'title', 'price', 'description'],
  template: `
        <div class="product-card">
            <img :src="image" :alt="title" class="product-image">
            <div class="product-title">{{ title }}</div>
            <div class="product-price">{{ price }}</div>
            <div class="product-description">{{ description }}</div>
            <button class="btn btn-primary mt-3">Mua ngay</button>
            <button class="btn btn-primary mt-3">Mua ngay</button>
        </div>
  `,
});

new Vue({
    el: "#app",
    data() {
      return {
        notification: "",  // Chứa thông báo
        src:"",
        products: [
          {
              image: 'https://via.placeholder.com/150x200',
              title: 'Tên Sách 1',
              price: '100.000 VND',
              description: 'Mô tả ngắn về cuốn sách này.'
          },
          {
              image: 'https://via.placeholder.com/150x200',
              title: 'Tên Sách 2',
              price: '150.000 VND',
              description: 'Mô tả ngắn về cuốn sách 2.'
          },
          {
              image: 'https://via.placeholder.com/150x200',
              title: 'Tên Sách 2',
              price: '150.000 VND',
              description: 'Mô tả ngắn về cuốn sách 2.'
          },
          {
              image: 'https://via.placeholder.com/150x200',
              title: 'Tên Sách 2',
              price: '150.000 VND',
              description: 'Mô tả ngắn về cuốn sách 2.'
          },
        ]
      };
    },
    mounted() {
      // Lấy dữ liệu từ file JSON khi component được mount
      fetch('../DATABASE/data.json') // Đảm bảo đường dẫn chính xác
        .then(response => response.json())  // Chuyển đổi dữ liệu thành đối tượng JavaScript
        .then(data => {
          this.notification = data.notification;  // Gán giá trị thông báo vào data của Vue
          this.src = data.src;
        })
        .catch(error => console.error('Có lỗi xảy ra:', error));  // Xử lý lỗi nếu có
    }
  });
  