<template>
  <div id="image_slide">
    <div class="image_slide_nav">
      <span
        @click="slideBreak"
        class="image_slide_break"></span>
      {{ nowImage + 1 }} / {{ images.length }}
    </div>
    <div class="image_display">
      <img
        :src="images[nowImage]">
      <span
        v-if="images.length > 1"
        @click="prevImage"
        class="prev_button"></span>
      <span
        v-if="images.length > 1"
        @click="nextImage"
        class="next_button"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ImageSlide',
    props: {
      images: []
    },
    data () {
      return {
        nowImage: 0
      }
    },
    methods: {
      nextImage () { // 画像を進める
        if (this.nowImage === this.images.length - 1) {
          this.nowImage = 0
        } else {
          this.nowImage++
        }
      },
      prevImage () { // 画像を止める
        if (this.nowImage === 0) {
          this.nowImage = this.images.length - 1
        } else {
          this.nowImage--
        }
      },
      slideBreak () { // 終了処理
        this.$emit('slide_break')
      }
    }
  }
</script>

<style scoped lang="scss">
  #image_slide{
    color: #ffffff;
  }
  .image_slide_nav{
    position: fixed;
    display: block;
    width: 100%;
    height: 70px;
    line-height: 70px;
    color: #ffffff;
    text-align: center;
    background: rgba(0,0,0,.6);

    .image_slide_break{
      position: absolute;
      top: 20px;
      left: 20px;
      display: inline-block;
      width: 30px;
      height: 30px;
      background-image: url("../assets/img/nope.png");
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }
  }
  .image_display{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;

    // 画像
    img{
      width: 100vw;
      height: auto;

      @media screen and (min-width: 960px) {
        width: auto;
        height: 70vh;
      }
    }

    // 前後の画像移動ボタン
    .next_button, .prev_button{
      position: absolute;
      top: 39vh;
      display: inline-block;
      width: 30px;
      height: 30px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      border-radius: 30px;
      box-shadow: 0 0 2px 3px rgba(0,0,0,0.2);
      background-color: rgba(0,0,0,0.1);
    }
    .prev_button{
      left: 20px;
      background-image: url("../assets/img/prevButton.png");
    }
    .next_button{
      right: 20px;
      background-image: url("../assets/img/nextButton.png");
    }
  }
</style>