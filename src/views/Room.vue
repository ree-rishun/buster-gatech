<template>
  <div>
    <div
      id="top_cover"
      :style="pageEnable? 'background-image: url(\'' + images[0] + '\');' : 'background-image: url(\'' + images[0] + '\');'">

      <span
        @click="jumpPrev"
        class="top_cover__prevbutton"></span>
      <span
        @click="openSlide = true"
        class="top_cover__photobutton"></span>

      <div id="top_cover__description">
        <h2>{{ room.name }}</h2>
        <p class="top_cover__layout">{{ room.layout }} / {{ room.size }}m&sup2;</p>
        <p>{{ room.address }}</p>

        <div class="top_cover__value">
          <span class="price"><span class="prev_small">賃料</span>{{ convTenThousand(room.price) }}<span class="small">万円</span></span>
          <div class="price_other">
            <p>敷金{{ convTenThousand(room.deposit) }}万円</p>
            <p>礼金{{ convTenThousand(room.keymoney) }}万円</p>
            <p>管理費など{{ room.managementFee.toLocaleString() }}円</p>
          </div>
        </div>
      </div>
    </div>

    <h2 class="rich_title room_info">物件情報</h2>
    <table class="param_list">
      <tr>
        <th>名称</th>
        <td>{{ room.name }}</td>
      </tr>
      <tr>
        <th>間取り</th>
        <td>{{ room.layout }}</td>
        <td>
          <span
            class="help_button"
            @click="openTips('layout')"></span>
        </td>
      </tr>
      <tr>
        <th>面積</th>
        <td>{{ room.size }}m&sup2;</td>
      </tr>
      <tr>
        <th>面積</th>
        <td>{{ room.size }}m&sup2;</td>
      </tr>
      <tr>
        <th>築年数</th>
        <td>築{{ convertTime(room.constructionAt) }}年</td>
      </tr>
      <tr>
        <th>階数</th>
        <td>{{ room.floors.room }}階 （{{ room.floors.building }}階建）</td>
      </tr>
    </table>

    <h2 class="rich_title room_access">アクセス</h2>
    <table class="param_list">
      <tr>
        <th>住所</th>
        <td>{{ room.address }}</td>
      </tr>
      <tr>
        <th>最寄り駅</th>
        <td>
          <span
            v-for="(station, index) in room.nearestStation"
            :key="index">
            {{ station.name }} 徒歩 {{ station.duration }}分
          </span>
        </td>
      </tr>
    </table>

    <h2 class="rich_title room_cost">費用</h2>
    <table class="param_list room_cost__list">
      <tr>
        <th>賃料</th>
        <td>{{ room.price.toLocaleString() }}円</td>
        <td>
          <span
            class="help_button"
            @click="openTips('rent')"></span>
        </td>
      </tr>
      <tr>
        <th>仲介料</th>
        <td>{{ room.brokerageFee.toLocaleString() }}円</td>
        <td>
          <span
            class="help_button"
            @click="openTips('brokerageFee')"></span>
        </td>
      </tr>
      <tr>
        <th>敷金</th>
        <td>{{ room.deposit.toLocaleString() }}円</td>
        <td>
          <span
            class="help_button"
            @click="openTips('deposit')"></span>
        </td>
      </tr>
      <tr>
        <th>礼金</th>
        <td>{{ room.keymoney.toLocaleString() }}円</td>
        <td>
          <span
            class="help_button"
            @click="openTips('keymoney')"></span>
        </td>
      </tr>
      <tr>
        <th>その他</th>
        <td>{{ room.managementFee.toLocaleString() }}円</td>
      </tr>
    </table>

    <h2 class="rich_title room_company">取扱い不動産会社</h2>
    <table class="param_list">
      <tr>
        <th>会社名</th>
        <td>{{ company.name }}</td>
      </tr>
      <tr>
        <th>所在地</th>
        <td>{{ company.address }}</td>
      </tr>
      <tr>
        <th>免許番号</th>
        <td>{{ company.licenseNumber }}</td>
      </tr>
      <tr>
        <th>取引形態</th>
        <td>{{ company.transactionForm }}</td>
      </tr>
    </table>

    <div
      v-if="openSlide"
      id="imageSlide">
      <ImageSlide
        :images="images"
        @slide_break="openSlide = false"/>
    </div>

    <Tips
      :tipsID="tips.id"
      v-if="tips.open"
      @tips_break="tips.open = false"/>
  </div>
</template>

<script>
  import firebase from 'firebase'
  import ImageSlide from '../components/ImageSlide'
  import Tips from '../components/Tips'

  export default {
    name: 'Room',
    data () {
      return{
        roomID: '',
        room: {
          name: ''
        },
        images: [],
        pageEnable: false,
        prev: {
          path: '',
          query: ''
        },
        company: {},
        openSlide: false,
        tips: {
          id: '',
          open: false
        }
      }
    },
    components: {
      ImageSlide,
      Tips
    },
    methods: {
      convTenThousand (price) { // 1万円で割り、小数点以下1桁を表記
        return (price / 10000).toFixed(1)
      },
      jumpPrev () {
        console.log({
          path: this.prev.path,
          query: this.prev.query
        })
        // 前のページへ遷移
        this.$router.push({
          path: this.prev.path,
          query: this.prev.query
        })
      },
      getCompanyInfo (companyID) {
        const self = this
        firebase
          .database()
          .ref('companies/' + companyID)
          .on("value", snapshot => {
            const company = snapshot.val()
            self.company = company
            console.log(company)
          })
      },
      getRoomImages () {
        this.images = []
        for (let id in this.room.images) {
          // 画像情報の取得
          const ref = firebase
            .storage()
            .ref().
            child('rooms/' + this.roomID + '/' + this.room.images[id])

          // 画像リンクの取得
          ref.getDownloadURL().then((url) => {
            this.images[id] = url

            // 画像を読み込んだらページを表示
            if (id === '0') {
              this.pageEnable = true
            }
          })
        }
      },
      convertTime (UNIXtime) {
        const targetTime = new Date(UNIXtime)
        const now = new Date()
        const sub = now - targetTime
        return Math.floor( sub /  (365 * 24 * 60 * 60 * 1000))
      },
      openTips (tipsID) {
        this.tips.id = tipsID
        this.tips.open = true
      }
    },
    mounted () {
      const self = this

      // 部屋ナンバーの取得
      this.roomID = this.$route.params.id

      // ルーム情報の取得
      firebase
        .database()
        .ref('rooms/' + this.roomID)
        .on("value", snapshot => {
          const room = snapshot.val()
          self.room = room

          // 部屋の画像のURLを取得
          self.getRoomImages()

          // 不動産会社の情報を取得
          self.getCompanyInfo(room.companyID)

        })

      // クエリから前ページを取得
      this.prev.path = this.$route.query.prevPath
      this.prev.query = this.$route.query.prevQuery
    }
  }
</script>

<style scoped lang="scss">
  #top_cover{
    position: relative;
    width: 100%;
    height: 90vw;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 0 0 20px 20px;
    margin-bottom: 25vw;
    box-shadow: 0 60px 60px 10px rgba(0,0,0,0.4) inset;

    .top_cover__prevbutton{
      position: absolute;
      top: 20px;
      left: 20px;
      display: inline-block;
      width: 30px;
      height: 30px;
      background-image: url("../assets/img/returnPrevPage.png");
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }

    .top_cover__photobutton{
      position: absolute;
      top: 20px;
      right: 20px;
      display: inline-block;
      width: 30px;
      height: 30px;
      background-image: url("../assets/img/photoOpen.png");
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }

    // ページトップの賃貸概要
    #top_cover__description{
      position: absolute;
      top: 60vw;
      left: 10vw;
      display: block;
      width: 80%;
      height: auto;
      border-radius: 20px;
      text-align: center;
      background: #ffffff;
      box-shadow: 0 7px 10px 3px rgba(0,0,0,0.2);

      h2{
        width: 90%;
        margin: 10px 5% 0;
        text-align: center;
      }
    }

    // 間取り
    .top_cover__layout{
      font-size: 0.9rem;
      line-height: 1rem;
      color: #9f9f9f;
    }

    // 価格表示
    .top_cover__value{
      border-top: solid 0.5px #9f9f9f;
      width: 100%;
      text-align: left;

      // 家賃
      .price{
        font-weight: bold;
        font-size: 3rem;
        line-height: 3.6rem;
        color: #ff4441;
        padding: 0 2.2%;
        margin: 0 9%;
        .prev_small{
          display: inline-block;
          width: 0.9rem;
          font-size: 0.9rem;
          line-height: 1.4rem;
          margin-right: 4px;
        }
        .small{
          display: inline-block;
          font-size: 1.1rem;
          line-height: 1.4rem;
        }
      }

      // 家賃以外の価格
      .price_other{
        display: inline-block;
        vertical-align: top;
        text-align: left;
        margin-top: 0.5rem;
        font-weight: bold;
        p{
          margin: 0;
          padding: 0;
          line-height: .9rem;
          font-size: .7rem;
          height: .9rem;
        }
      }
    }
    // 管理費
    .top_cover__managementFee{
      color: #4290ff;
    }
  }

  // 見出しスタイル
  .rich_title{
    width: 90%;
    height: 50px;
    line-height: 50px;
    margin-top: 30px;
    padding-left: 24%;
    border-radius: 0 50px 50px 0;
    color: #ffffff;
    font-weight: normal;
    font-size: 1.4rem;
    background-image: url("../assets/img/searchSmartphone.png");
    background-repeat: no-repeat;
    background-position: bottom left 10%;
    background-size: auto 45px;
  }
  .room_access{
    background-color: #353535;
    background-image: url("../assets/img/access.png");
  }
  .room_info{
    background-color: #353535;
    background-image: url("../assets/img/roomInfo.png");
  }
  .room_cost{
    background-color: #353535;
    background-image: url("../assets/img/money.png");
    background-size: auto 40px;
  }
  .room_company{
    background-color: #353535;
    background-image: url("../assets/img/company.png");
  }

  // パラメータテーブル
  .param_list{
    margin: 20px 0;
    th, td{
      padding-left: 20px;
      height: 40px;
      line-height: 40px;
      text-align: left;
    }
    .help_button{
      display: block;
      width: 22px;
      height: 22px;
      background-image: url("../assets/img/helpButton.png");
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
  }
  .room_cost__list{
    td{
      text-align: right;
    }
  }

  // 画像スライド
  #imageSlide{
    position: fixed;
    z-index: 300;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100vh;
    background: rgba(0,0,0,.7);
  }
</style>