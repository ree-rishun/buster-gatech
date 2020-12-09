<template>
  <div class="home">
    <div id="bunnerArea">
      <img
        src="../assets/img/bunner.png"
        class="bunnerImg">
    </div>
    <h2>地域で検索</h2>
    <ul id="areaList">
      <li
        v-for="city in areas"
        :key="city.id"
        >
        {{ city.name }}
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  },
  data () {
    return {
      areas: {
        1: {
          name: '東京都渋谷区',
          id: '1'
        },
        2: {
          name: '東京都新宿区',
          id: '2'
        },
        3: {
          name: '東京都千代田区',
          id: '3'
        },
        4: {
          name: '東京都杉並区',
          id: '4'
        },
        5: {
          name: '東京都墨田区',
          id: '5'
        },
        6: {
          name: '東京都目黒区',
          id: '6'
        }
      }
    }
  }
}
</script>

<style lang="scss">
  // バナー画像
  #bunnerArea{
    width: 90%;
    margin:0 5% 20px;
    .bunnerImg{
      width: 100%;
      margin: 10px 0 20px;
    }
  }
  h2{
    text-align: center;
  }
  #areaList{
    text-align: center;
    margin:10px 0;
    li{
      display: inline-block;
      width: auto;
      height: 30px;
      line-height: 13px;
      margin: 10px 5px;
      padding: 10px 20px;
      border-radius: 50px;
      background: #ff4441;
      font-size: 15px;
      color: #ffffff;
      cursor: pointer;

      // ホバーアニメーション（透過）
      &:hover{
        opacity: .6;
      }
    }
  }
</style>
