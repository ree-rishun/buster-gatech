<template>
  <div class="home">
    <h2>市区町村を選択</h2>

    <ul id="areaList">
      <li
        v-for="city in areas"
        :key="city.id"
        @click="jampSelectCity(city.id)"
      >
        {{ city.name }}
      </li>
    </ul>

    <div id="bunnerArea">
      <img
        src="../assets/img/bunner.png"
        class="bunnerImg">
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase/app'
  import 'firebase/auth'
  import 'firebase/storage'
  import 'firebase/database'

  export default {
    name: 'SelectCity',
    components: {
    },
    data () {
      return {
        areas: [],
        categories: [],
        prefecturesID: ''
      }
    },
    methods: {
      jampSelectCity (cityID) {
        // 町のセレクト画面へ移動
        this.$router.push({
          name: 'search',
          query: {
            mode: 'city',
            prefecturesID: this.prefecturesID,
            cityID: cityID
          }
        })
      }
    },
    mounted() {
      const self = this

      // クエリパラメータの取得
      const queryData = this.$route.query

      this.prefecturesID = queryData.prefecturesID

      // 地名一覧の取得
      firebase
        .database()
        .ref('city/' + this.prefecturesID)
        .on('child_added', snapshot => {
          const city = snapshot.val()
          console.log(city)
          self.areas.push(city)
        })
    }
  }
</script>

<style scoped lang="scss">
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
    margin-top: 20px;
    text-align: center;
  }
  #areaList{
    display: block;
    width: 90%;
    text-align: center;
    margin:5px 0 10px 5%;
    li{
      display: inline-block;
      width: auto;
      height: 30px;
      line-height: 13px;
      margin: 10px 5px;
      padding: 10px 12px;
      border-radius: 50px;
      background: #fcdc4a;
      color: #111111;
      font-family: 'Kosugi Maru', sans-serif;
      font-size: 13px;
      font-weight: bolder;
      cursor: pointer;

      // ホバーアニメーション（透過）
      &:hover{
        opacity: .6;
      }
    }
  }
</style>
