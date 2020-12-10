<template>
  <div id="result">
    <div id="list_sumnum">
      {{ searchResultNum % 10 }} / {{ searchResultNum }} 件を表示
    </div>
    <div id="list">
      <div id="list_wideview">
        <div
          v-for="room in rooms.much"
          :class="'list_content ' + room.mode"
          :key="room.id"
          v-touch:swipe="(direction) => flick(direction, room.id)">
          <div
            class="cancel_button"
            @click="cancelButton(room.id)">キャンセル</div>
          <div class="card"
               :style="'background-image: url(\'' + room.img + '\');'"
               v-touch:swipe="(direction) => flick(direction, room.id)">
            <div class="list_params">
              <h3>{{ room.name }}</h3>
              <div class="list_description">
                <p class="list_moneys"><span>敷</span> {{ convTenThousand(room.deposit) }}万円 <span>礼</span> {{ convTenThousand(room.keymoney) }}万円</p>
                <p>{{ room.layout }} / {{ room.size }}m&sup2;</p>
                <p>{{ room.address }}</p>
              </div>
            </div>
            <div class="list_price">
              <span>{{ convTenThousand(room.price) }}</span>万円
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="categoryList">
      <ul>
        <li
          v-for="(categoryID, index) in categories.enable"
          :key="categoryID"
          class="category_enable"
          @click="disable(index)"
        >
          #{{ categories.list[categoryID].name }}
        </li>
        <li
          v-for="(category, index) in categories.disable"
          :key="category.id"
          class="category_disable"
          @click="enable(index)"
        >
          #{{ category.name }}
        </li>
      </ul>
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
        rooms: {
          much: {},
          list: {}
        },
        houko: 'a',
        searchResultNum: 0,
        flickDelay: 1500,
        categories: {
          enable: [],
          disable: {},
          list: {}
        }
      }
    },
    methods: {
      flick (direction, roomID) {

        // 右フリックの場合
        if (direction === 'right') {
          // 削除
          this.rooms.much[roomID].mode = 'flick_right'

          // ここにマッチ物件に追加する処理を追加

          // 削除処理
          const self = this
          this.rooms.much[roomID].setTimeoutID = setTimeout(
            function () {
              // 削除
              delete self.rooms.much[roomID]
              self.searchResultNum--
            },
            this.flickDelay
          )
        }

        // 左フリックの場合
        if (direction === 'left') {
          this.rooms.much[roomID].mode = 'flick_left'

          // ここにマッチしない物件に追加する処理を追加

          // 削除処理
          const self = this
          this.rooms.much[roomID].setTimeoutID = setTimeout(
            function () {
              delete self.rooms.much[roomID]
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
        clearTimeout(this.rooms.much[roomID].setTimeoutID)
        this.rooms.much[roomID].mode = 'nomal'
      },
      enable (categoryID) {
        // 有効化一覧へ追加
        this.categories.enable.push(categoryID)

        // 値のアップデート
        this.updateCategory()
      },
      disable (suffix) {
        console.log(suffix)
        // 有効化一覧から削除
        this.categories.enable.splice(suffix,1)

        // 値のアップデート
        this.updateCategory()
      },
      updateCategory () { // カテゴリ一覧のアップデート
        let disableCategoryList = {}

        for (let categoryID in this.categories.list) {
          // 有効化リストに入っていないカテゴリのみ抽出
          if (this.categories.enable.indexOf(this.categories.list[categoryID].id) === -1) {
            disableCategoryList[categoryID] = this.categories.list[categoryID]
          }
        }

        // 代入
        this.categories.disable = disableCategoryList
      },
      updateRoom () { // 部屋一覧のアップデート
        let muchRoomList = {}

        for (let roomID in this.rooms.list) {
          // カテゴリ一覧にヒットするもののみ抽出
          if (this.getIsDuplicate(this.rooms.list[roomID].categories, this.categories.enable) === this.categories.enable.length) {
            muchRoomList[roomID] = this.rooms.list[roomID]
          }
        }

        // 代入
        this.rooms.much = muchRoomList
      },
      getIsDuplicate (arr1, arr2) {
        return [...arr1, ...arr2].filter(item => arr1.includes(item) && arr2.includes(item)).length
      }
    },
    mounted () {
      const self = this

      // クエリパラメータの取得
      const searchData = this.$route.query

      // 検索結果を取得（前方一致）
      firebase.database().ref('/rooms')
        .orderByChild('name').startAt(searchData.keyWord).endAt(searchData.keyWord + '\uf8ff')
        .once('value',function(snapshot) {
          const room = snapshot.val()

          if (room !== null) {
            // 新規部屋数を格納
            self.rooms.list = Object.assign(self.rooms, room)
            self.rooms.much = Object.assign(self.rooms, room)

            // 部屋数の更新
            self.searchResultNum = Object.keys(self.rooms).length
          }
        })

      // カテゴリ一覧の取得
      firebase
        .database()
        .ref("categories")
        .on("child_added", snapshot => {
          const category = snapshot.val()

          // 値の追加
          self.categories.list[category.id] = category
          self.categories.disable[category.id] = category


          console.log(self.categories.disable)
        })
    }
  }
</script>

<style lang="scss">
  *{
    // outline: 1px solid red;
  }

  body{
    display: block;
    width: 100vw;
    height: 100vh;
    overflow-y: hidden;
  }

  // 検索結果一覧
  #list{
    display: block;
    width: 100%;
    height: calc(50vh + 30px);
    margin: 10px 0 0;
    overflow-x: scroll;
    overflow-y: hidden;
  }

  #list_sumnum{
    width: 90%;
    height: auto;
    margin: 0 0 0 5%;
    text-align: right;
  }

  #list_wideview{
    display: inline-block;
    width: max-content;
    padding: 5px 0 25px;
  }

  // 部屋ごとのスタイル
  $flick_time: 0.5s;
  .list_content{
    position: relative;
    display: inline-block;
    width: 70vw;
    height: 50vh;
    margin-left: 5vw;
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
    display: inline-block;
    position: absolute;
    z-index: 100;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    margin: 0;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    box-shadow: 0 7px 10px 3px rgba(0,0,0,0.2);

    -webkit-transition: all $flick_time ease;
    -moz-transition: all $flick_time ease;
    -o-transition: all $flick_time ease;
    transition: all  $flick_time ease;

    // 値段の表示スタイル
    .list_price{
      position: absolute;
      top: 0;
      right: 0;
      display: inline-block;
      width: auto;
      padding: 0 6px 0 10px;
      height: 2.6rem;
      line-height: 2.6rem;
      border-radius: 0 20px 0 1.3rem;
      font-size: 0.7rem;
      font-weight: bold;
      text-align: right;
      color: #ffffff;
      background: #ff4441;

      span{
        font-size: 2.3rem;
      }
    }

    // 部屋詳細
    .list_params{
      position: absolute;
      bottom: 20px;
      display: inline-block;
      width: 100%;
      margin-left: 10px;
      vertical-align: top;
      text-shadow: 0px 0px 10px #434343;

      h3, p{
        text-align: left;
        font-weight: normal;
      }

      // 部屋名
      h3{
        margin-top: 5px;
        font-size: 1.6rem;
        line-height: 1.6rem;
        font-weight: bold;
        color: #ffffff;
      }

      // その他パラメータ
      p{
        color: #ffffff;
        font-weight: bold;
        font-size: 0.8rem;
        line-height: 1.1rem;
        margin: 0;
      }

      // 部屋の詳細情報
      .list_description{
        display: inline-block;
        width: 70%;
        margin-top: 5px;
      }

      // 敷金礼金
      .list_moneys{
        font-size: 0.7rem;
        line-height: 0.8rem;
        span{
          display: inline-block;
          width: 1.1rem;
          height: 1.1rem;
          line-height: 1.1rem;
          background-color: #ffffff;
          text-align: center;
          color: #6a6a6a;
          text-shadow: none;
        }
      }
    }
  }

  // カテゴリ一覧
  #categoryList{
    display: block;
    width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    margin:5px 0 10px;
    ul{
      display: inline-block;
      width: max-content;
    }

    li{
      display: inline-block;
      width: auto;
      height: 30px;
      line-height: 13px;
      margin: 10px 5px;
      padding: 10px 12px;
      border-radius: 50px;
      font-size: 13px;
      font-weight: bolder;
      cursor: pointer;

      // ホバーアニメーション（透過）
      &:hover{
        // opacity: .6;
      }
    }
    .category_enable{
      background: #ff4441;
      color: #ffffff;
    }
    .category_disable{
      background: #0080ff;
      color: #ffffff;
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