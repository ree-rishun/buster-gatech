<template>
  <div class="home">
    <p
      class="return_city">
      <router-link to="/">ホーム</router-link> >
      {{ prefecturesName }}
    </p>

    <h2>市区町村を選択</h2>

    <ul id="areaList">
      <li
        v-for="city in areas"
        :key="city.id"
        :class="activeList === city.id ? 'active' : ''"
        @click="jampSelectCity(city.id)"
      >
        {{ city.name }}
      </li>
    </ul>
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
        prefecturesID: '',
        activeList: '',
        prefecturesName: ''
      }
    },
    methods: {
      jampSelectCity (cityID) {
        const self = this

        // 選択されたリストをアクティブに
        this.activeList = cityID

        // 検索結果を表示
        setTimeout(
          function () {
            self.$router.push({
              name: 'search',
              query: {
                mode: 'city',
                prefecturesID: self.prefecturesID,
                cityID: cityID
              }
            })
          },
          160
        )
      }
    },
    mounted () {
      const self = this

      // クエリパラメータの取得
      this.prefecturesID = this.$route.params.prefecturesID

      //
      firebase
        .database()
        .ref('/prefectures/' + this.prefecturesID)
        .on('value', snapshot => {
          const prefectures = snapshot.val()
          this.prefecturesName = prefectures.name
        })

      // 地名一覧の取得
      firebase
        .database()
        .ref('city/' + this.prefecturesID)
        .on('child_added', snapshot => {
          const city = snapshot.val()
          console.log(city)
          self.areas.push(city)
        })

      // ホバーアニメーションの有効化
      setTimeout(
        function () {
          self.disableHover = false
        },
        300
      )
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
  $delay: .3s;
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
      color: #111111;
      font-family: 'Kosugi Maru', sans-serif;
      background: #fcdc4a;
      font-size: 13px;
      font-weight: bolder;
      cursor: pointer;
      -webkit-transition: all $delay ease;
      -moz-transition: all $delay ease;
      -o-transition: all $delay ease;
      transition: all  $delay ease;
    }
    .active{
      background: #9f9f9f;
    }
  }

  // パンくずリスト
  .return_city{
    width: 90%;
    margin: 0 0 0 5%;
    line-height: 1rem;
    font-size: 1rem;
  }
</style>
