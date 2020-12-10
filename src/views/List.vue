<template>
  <div id="result">
    <div id="list_sumnum">
      {{ searchResultNum % 10 }} / {{ searchResultNum }} 件を表示
    </div>
    <div id="list">
      <div
        v-for="room in rooms"
        :class="'list_content ' + room.mode"
        :key="room.id"
        v-touch:swipe="(direction) => flick(direction, room.id)">
        <div
          class="cancel_button"
          @click="cancelButton(room.id)">キャンセル</div>
        <div class="card"
             v-touch:swipe="(direction) => flick(direction, room.id)">
          <img class="list_img" :src="room.img">
          <div class="list_params">
            <h3>{{ room.name }}</h3>
            <div class="list_price">
              <span>{{ convTenThousand(room.price) }}</span>万円
            </div>
            <div class="list_description">
              <p class="list_moneys"><span>敷</span> {{ convTenThousand(room.deposit) }}万円 <span>礼</span> {{ convTenThousand(room.keymoney) }}万円</p>
              <p>{{ room.layout }} / {{ room.size }}m&sup2;</p>
              <p>{{ room.address }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Vue2TouchEvents from 'vue2-touch-events'
  import firebase from 'firebase/app'
  import 'firebase/auth'
  import 'firebase/storage'
  import 'firebase/database'

  Vue.use(Vue2TouchEvents)

  export default {
    name: "List",
    data () {
      return {
        rooms: {},
        houko: 'a',
        searchResultNum: 0,
        flickDelay: 1500
      }
    },
    methods: {
      flick (direction, roomID) {
        console.log(direction)

        // 右フリックの場合
        if (direction === 'right') {
          // 削除
          this.rooms[roomID].mode = 'flick_right'

          // ここにマッチ物件に追加する処理を追加

          // 削除処理
          const self = this
          this.rooms[roomID].setTimeoutID = setTimeout(
            function () {
              // 削除
              delete self.rooms[roomID]
              self.searchResultNum--
            },
            this.flickDelay
          )
        }

        // 左フリックの場合
        if (direction === 'left') {
          this.rooms[roomID].mode = 'flick_left'

          // ここにマッチしない物件に追加する処理を追加

          // 削除処理
          const self = this
          this.rooms[roomID].setTimeoutID = setTimeout(
            function () {
              delete self.rooms[roomID]
              self.searchResultNum--
            },
            this.flickDelay
          )
        }
      },
      convTenThousand (price) {
        return (price / 10000).toFixed(1)
      },
      cancelButton (roomID) {
        clearTimeout(this.rooms[roomID].setTimeoutID)
        this.rooms[roomID].mode = 'nomal'
      }
    },
    mounted () {
      const self = this

      // クエリパラメータの取得
      const searchData = this.$route.query

      console.log('keyWord : ' + searchData.keyWord)

      // 検索結果を取得（前方一致）
      firebase.database().ref('/rooms')
        .orderByChild('name').startAt(searchData.keyWord).endAt(searchData.keyWord + '\uf8ff')
        .once('value',function(snapshot) {
          const room = snapshot.val()

          console.log(room)
          if (room !== null) {
            // 新規部屋数を格納
            self.rooms = Object.assign(self.rooms, room)

            // 部屋数の更新
            self.searchResultNum = 6
          }
        })
    }
  }
</script>

<style lang="scss">
  *{
    // outline: 1px solid red;
  }

  // 検索結果一覧
  #list{
    display: block;
    width: 90%;
    height: auto;
    margin: 5px 0 0 5%;
    overflow-x: hidden;
    overflow-y: auto;
  }

  #list_sumnum{
    width: 90%;
    height: auto;
    margin: 0 0 0 5%;
    text-align: right;
  }

  // 部屋ごとのスタイル
  $flick_time: 0.5s;
  .list_content{
    display: inline-block;
    width: 100%;
    height: 100px;
    position: relative;
    border-bottom: solid 1px #999999;
    &:first-child{
      border-top: solid 1px #999999;
    }
  }

  // 処理キャンセルボタン
  .cancel_button{
    position: absolute;
    bottom: 16px;
    width: 100%;
    text-align: center;
    color: #ffffff;
    text-decoration: underline;
  }

  // 詳細カード
  .card{
    display: block;
    position: absolute;
    z-index: 100;
    width: 100%;
    height: auto;
    margin: 0;
    background: #ffffff;
    -webkit-transition: all $flick_time ease;
    -moz-transition: all $flick_time ease;
    -o-transition: all $flick_time ease;
    transition: all  $flick_time ease;

    // 値段の表示スタイル
    .list_price{
      margin-top: 2px;
      font-size: 0.7rem;
      font-weight: bold;
      color: #ff4441;
      line-height: 0.9rem;

      span{
        font-size: 1.2rem;
      }
    }

    .list_description{
      margin-top: 5px;
    }
    .list_params{
      display: inline-block;
      width: calc(100% - 110px);
      margin-left: 10px;
      vertical-align: top;

      h3, p{
        text-align: left;
        font-weight: normal;
      }
      h3{
        margin-top: 5px;
        font-size: 0.9rem;
        font-weight: bold;
      }
      p{
        color: #6a6a6a;
        font-weight: bold;
        font-size: 0.7rem;
        line-height: 0.8rem;
        margin: 0;
      }
    }
    .list_moneys{
      font-size: 0.7rem;
      line-height: 0.8rem;
      span{
        display: inline-block;
        width: 0.9rem;
        height: 0.9rem;
        background-color: #6a6a6a;
        text-align: center;
        color: #ffffff;
      }
    }
    .list_img{
      margin: 5px;
      height: 90px;
      width: 90px;
      object-fit: cover;
      vertical-align: top;
    }
  }

  .flick_left{
    background-color: #ff4441;
    background-image: url("../assets/img/nope.png");
    background-size: auto 40px;
    background-repeat: no-repeat;
    background-position: center;
    .card{
      transform: translateX(-100%);
    }
  }
  .flick_right{
    background-color: #00ff6a;
    background-image: url("../assets/img/like.png");
    background-size: auto 40px;
    background-repeat: no-repeat;
    background-position: center;
    .card{
      transform: translateX(100%);
    }
  }
</style>