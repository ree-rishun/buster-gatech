<template>
  <div class="home">
    <h2>地域を選択してください</h2>

    <ul id="areaList">
      <li
        v-for="prefectures in areas"
        :key="prefectures.id"
        @click="jampSelectCity(prefectures.id)"
      >
        {{ prefectures.name }}
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
  name: 'Home',
  components: {
  },
  data () {
    return {
      areas: [],
      categories: []
    }
  },
  methods: {
    jampSelectCity (prefecturesID) {
      // 町のセレクト画面へ移動
      this.$router.push({
        name: 'city',
        query: {
          prefecturesID: prefecturesID
        }
      })
    }
  },
  mounted() {
    const self = this

    // 地名一覧の取得
    firebase
      .database()
      .ref("prefectures")
      .on("child_added", snapshot => {
        const area = snapshot.val()
        console.log(area)
        self.areas.push(area)
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
      background: #ff4441;
      font-size: 13px;
      font-weight: bolder;
      color: #ffffff;
      cursor: pointer;

      // ホバーアニメーション（透過）
      &:hover{
        opacity: .6;
      }
    }
  }
</style>
