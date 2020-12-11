<template>
  <div id="result">
    <div id="list_sumnum">
      {{ imageReadyFlg ? searchResultNum + ' 件が一致' : '検索中...' }}
    </div>
    <div id="list">
      <div
        id="list_wideview"
        v-if="imageReadyFlg">
        <div
          v-for="room in rooms.much"
          :class="'list_content ' + room.mode"
          :key="room.id">
          <div class="card"
               :style="'background-image: url(\'' + rooms.images[room.id] + '\');'">
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

            <div
              class="evaluation_button"
              v-if="userID !== ''">
              <span
                class="evaluation_button__like"
                @click="evaluationAdd('like', room.id)">
              </span><span
              class="evaluation_button__nope"
              @click="evaluationAdd('nope', room.id)">
            </span>
            </div>
          </div>
        </div>
        <div
          class="list_notfound"
          v-if="Object.keys(rooms.much).length === 0">
          <img src="../assets/img/notfound.png">
          <p>
            お探しの条件は<br>
            見つかりませんでした
          </p>
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
          list: {},
          images: {},
          disable: []
        },
        imageReadyFlg: false,
        searchResultNum: 0,
        flickDelay: 1500,
        categories: {
          enable: [],
          disable: {},
          list: {}
        },
        userID: ''
      }
    },
    methods: {
      getImages () { // storageからの画像取得
        const self = this

        // 配列が空の場合は表示して返す
        if (Object.keys(this.rooms.list).length === 0) {
          this.imageReadyFlg = true
          return
        }

        // 部屋の一覧を取得
        for(let room in this.rooms.list){
          // 画像情報の取得
          const ref = firebase
            .storage()
            .ref().
            child('rooms/' + this.rooms.list[room].id + '/' + this.rooms.list[room].images[0])

          // 画像リンクの取得
          ref.getDownloadURL().then((url) => {
            self.rooms.images[self.rooms.list[room].id] = url

            // 全ての画像を読み込んでから部屋の一覧を表示
            if (Object.keys(self.rooms.images).length === Object.keys(self.rooms.list).length) {
              self.updateRoom()
              self.imageReadyFlg = true
            }
          })
        }
      },
      convTenThousand (price) { // 1万円で割り、小数点以下1桁を表記
        return (price / 10000).toFixed(1)
      },
      enable (categoryID) {
        // 有効化一覧へ追加
        this.categories.enable.push(categoryID)

        // 値のアップデート
        this.updateCategory()
        this.updateRoom()
      },
      disable (suffix) {
        // 有効化一覧から削除
        this.categories.enable.splice(suffix,1)

        // 値のアップデート
        this.updateCategory()
        this.updateRoom()
      },
      updateCategory () { // カテゴリ一覧のアップデート
        let disableCategoryList = {}

        // 抽出処理
        for (let categoryID in this.categories.list) {
          // 有効化リストに入っていないカテゴリのみ抽出
          if (this.categories.enable.indexOf(categoryID) === -1) {
            disableCategoryList[categoryID] = this.categories.list[categoryID]
          }
        }

        // 代入
        this.categories.disable = disableCategoryList
      },
      updateRoom () { // 部屋一覧のアップデート
        let muchRoomList = {}

        // 抽出処理
        for (let roomID in this.rooms.list) {
          // 無効化リストに存在する場合は飛ばす
          if (this.rooms.disable.indexOf(roomID) > -1) {
            continue
          }

          // カテゴリ一覧にヒットするもののみ抽出
          if (this.getIsDuplicate(this.rooms.list[roomID].categories, this.categories.enable) === this.getIsDuplicate(this.categories.enable, this.categories.enable)) {
            muchRoomList[roomID] = this.rooms.list[roomID]
          }
        }
        // 部屋数の更新
        this.searchResultNum = Object.keys(muchRoomList).length

        // 代入
        this.rooms.much = muchRoomList

      },
      getIsDuplicate (arr1, arr2) { // 配列同士の一致するプロパティ数を取得
        return [...arr1, ...arr2].filter(item => arr1.includes(item) && arr2.includes(item)).length
      },
      evaluationAdd (evaluation, roomID) {
        let evaluationBox = ''

        // 値を正式な値へ変換（現状は変化なしだけど…）
        if (evaluation === 'like') {
          evaluationBox = 'like'
        } else if(evaluation === 'nope') {
          evaluationBox = 'nope'
        }

        // 現状の評価値を取得して更新
        firebase
          .database()
          .ref('users/' + this.userID + '/evalution/' + evaluationBox)
          .once('value').then((snapshot) => {
          // 値を格納
          let evalutionArray = snapshot.val()

          // 空の場合・存在しない場合は空の配列を格納
          if (evalutionArray === null) {
            evalutionArray = []
          }

          // 配列への新規値の追加（同じ値が存在しない場合のみ）
          if (evalutionArray.indexOf(roomID) === -1) {
            evalutionArray.push(roomID)
          }

          // 更新後の配列をDBへ格納
          firebase
            .database()
            .ref('users/' + this.userID + '/evalution/' + evaluationBox)
            .set(evalutionArray)
        })

        // 検索結果から省く
        this.rooms.disable.push(roomID)

        // 検索結果を更新
        const self = this
        setTimeout(
          function () {
            self.updateRoom()
          },
          300
        )
      }
    },
    mounted () {
      const self = this

      // クエリパラメータの取得
      const queryData = this.$route.query

      // カテゴリ一覧の取得
      firebase
        .database()
        .ref('categories')
        .once('value').then((snapshot) => {
        const categories = snapshot.val()

        for (let category in categories) {
          console.log(categories[category])
          if (category !== undefined) {
            // 値の追加
            self.categories.list[category] = categories[category]
            self.categories.disable[category] = categories[category]
          }
        }
      })

      // 検索条件分岐
      if (queryData.mode === 'search') {
        // 検索結果を取得（前方一致）
        firebase.database().ref('/rooms')
          .orderByChild('name').startAt(queryData.keyWord).endAt(queryData.keyWord + '\uf8ff')
          .once('value',function(snapshot) {
            const room = snapshot.val()

            if (room !== null) {
              // 新規部屋数を格納
              self.rooms.list = Object.assign(self.rooms.list, room)
              self.rooms.much = Object.assign(self.rooms.much, room)

              // 画像パスを取得
              self.getImages()

              // 部屋数の更新
              self.searchResultNum = Object.keys(self.rooms.much).length
            } else {
              // 画像パスを取得
              self.getImages()
            }
          })
      } else if (queryData.mode === 'city') {
        firebase.database().ref('/rooms')
          .orderByChild('areaID')
          .startAt(queryData.prefecturesID + '-' + queryData.cityID)
          .endAt(queryData.prefecturesID + '-' + queryData.cityID)
          .once('value',function(snapshot) {
            const room = snapshot.val()
            console.log(room)

            if (room !== null) {
              // 新規部屋数を格納
              self.rooms.list = Object.assign(self.rooms.list, room)
              self.rooms.much = Object.assign(self.rooms.much, room)

              // 画像パスを取得
              self.getImages()

              // 部屋数の更新
              self.searchResultNum = Object.keys(self.rooms.much).length
            } else {
              // 画像パスを取得
              self.getImages()
            }
          })
      }

      // ログインユーザ情報の取得
      firebase.auth().onAuthStateChanged((auth) => {
        if (auth) {
          // ユーザIDを取得
          const uid = auth.uid
          this.userID = uid

          // ユーザの評価情報を取得
          firebase
            .database()
            .ref('users/' + uid + '/evalution')
            .on("value", snapshot => {
              const evalution = snapshot.val()

              console.log('users/' + uid + '/evalution')

              console.log('evalution :')
              console.log(evalution)


              // リストに格納されている部屋を無効化リストへ格納
              if (evalution.like !== null && evalution.like !== undefined) {
                this.rooms.disable = this.rooms.disable.concat(evalution.like)
              }
              if (evalution.nope !== null && evalution.nope !== undefined) {
                this.rooms.disable = this.rooms.disable.concat(evalution.nope)
              }

              console.log('this.rooms.disable :')
              console.log(this.rooms.disable)

              // 部屋のリストを更新
              this.updateRoom()
            })
        } else {
          this.userID = ''
        }
      })
    }
  }
</script>

<style scoped lang="scss">
  *{
    // outline: 1px solid red;
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
    padding: 5px 15px 25px;
  }

  // 部屋ごとのスタイル
  $flick_time: 0.5s;
  .list_content{
    position: relative;
    display: inline-block;
    width: 70vw;
    height: 50vh;
    margin: 0 5vw;
    -webkit-transition: all $flick_time ease;
    -moz-transition: all $flick_time ease;
    -o-transition: all $flick_time ease;
    transition: all  $flick_time ease;
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
      color: #353535;
      background: #fcdc4a;

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

    // 評価ボタン
    .evaluation_button{
      position: absolute;
      bottom: -10px;
      right: -20px;
      width: 100px;
      height: 50px;
      background: rgba(0,0,0,.9);
      border-radius: 5px;
      box-shadow: 0 7px 7px 3px rgba(0,0,0,0.2);
      overflow: hidden;

      $evaluation-delay: .3s;
      span{
        display: inline-block;
        width: 50%;
        height: 100%;
        background-repeat: no-repeat;
        background-position: center;
        -webkit-transition: all $evaluation-delay ease;
        -moz-transition: all $evaluation-delay ease;
        -o-transition: all $evaluation-delay ease;
        transition: all  $evaluation-delay ease;
      }
      .evaluation_button__like{
        background-size: auto 30px;
        background-image: url("../assets/img/like.png");
        border-right: solid 0.3px #888888;

        &:hover{
          background-color: #ff4441;
        }
      }
      .evaluation_button__nope{
        background-size: auto 20px;
        background-image: url("../assets/img/nope.png");

        &:hover{
          background-color: #0070ff;
        }
      }
    }
  }

  // 検索結果が見つからなかった場合
  .list_notfound{
    display: inline-block;
    position: relative;
    z-index: 100;
    width: 70vw;
    height: 50vh;
    margin-left: 5vw;
    border-radius: 20px;
    background: #dddddd;
    box-shadow: 0 7px 10px 3px rgba(0,0,0,0.2);
    text-align: center;

    img{
      width: 50%;
      margin-top: 30px;
    }
    p{
      position: absolute;
      bottom: 15px;
      width: 100%;
      font-weight: bold;
      font-size: 1.3rem;
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
    }
    .category_enable{
      color: #111111;
      background: #fcdc4a;
    }
    .category_disable{
      color: #111111;
      background: #cccccc;
    }
  }
</style>