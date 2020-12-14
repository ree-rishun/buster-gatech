# Busterのミッション「大学生が使いたくなる家探しサービスを作ろう」の作品「yadkari（ヤドカリ）」

## 0. はじめに
株式会社TechTrainが開催するオンラインチーム対抗開発バトル、Busterに向けて開発したWebアプリケーションです。
FirebaseFunction上にデプロイされているため、実際に触ってみてください。
https://buster-gatech.web.app/

※モバイルファーストで作られているため、審査においてはモバイルを中心に見て頂きたいです（PCも動作可）
※中に含まれるデータはテストデータです。画像等の著作権に関してはフリーの素材を利用しています。

## 1. 概要

テーマが大学生向けということで既存サービスを触ったうえで、以下のような課題と解決方法を想定しました。

- 検索結果画面が複雑で情報量が多く、直感的に選びにくい
    - シンプルでまとまった情報のUIが良さそう
- 敷金礼金をはじめ、聞いたことはあっても詳しく知らない単語がある
    - Tips機能を付けて調べる必要をなくす
- 1度見たものの興味の無かった物件も検索結果に表示される
    - 除外機能を設けて興味のない物件を除外できるようにする
    - お気に入り機能に登録した物件も表示されないようにする

また、大学生が使うという理由からスマートフォンユーザが多いと想定してモバイルファーストのUI設計になっています。

## 2. 実際のUIと特徴 - GIFアニメーション付き

### 画像重視でシンプルな検索結果

検索結果ページは画像を背景に、基礎的な情報のみを表示しています。
画像を大きく使った理由としては、「家賃」「広さ」などの相場がわかり難い内容に比べ「部屋の内装」は誰でも良し悪しが判断しやすく直感的に判断する上で重要だと考えたためです。

![検索結果デモ](https://i.imgur.com/RYHyRuj.gif)

### ポチポチ絞り込みできるフィルター機能

フィルター機能により自分の条件に合った家探しができます。
リアルタイムで結果が反映されるため、取捨選択には最適なUIになっています。

![フィルター機能デモ](https://i.imgur.com/fElIQua.gif)

### 分からない単語をサポートするTips機能

私自身開発する中で「なんとなく知ってはいるけど正確な意味は分からない」という単語がいくつかありました。
「家探しサービス」と「ブラウザ」を行き来して物件を精査するのはUXとして良くないと考えました。
そのため、ページ内にTipsを設け、分からない単語をその場で理解してもらえることを心がけました。

![Tips機能デモ](https://i.imgur.com/kzSQtza.gif)

### 効率的に検索できる、お気に入り/除外機能

お気に入り機能は大半の「家探しサービス」に導入されている必要最低限の機能です。
しかし、お気に入りが登録できても検索する度に置きに入りした物件や既にみた物件が表示されるサービスが多く感じました。
「yadkari」では通常の検索結果からは「お気に入り」と興味のない物件に分類される「除外」は表示されません。

![お気に入り/除外機能のデモ](https://i.imgur.com/l9avxkq.gif)

## 3. 利用技術

### フロントエンド

- [Vue.js](https://jp.vuejs.org/index.html)
- [SCSS](https://github.com/sass/sass)
- [HTML5](https://developer.mozilla.org/ja/docs/Web/Guide/HTML/HTML5)

### インフラ

- Firebase
    - [RealtimeDatabase](https://firebase.google.com/docs/database?authuser=0)
    - [Hosting](https://firebase.google.com/docs/hosting?authuser=0)
    - [Authentication](https://firebase.google.com/docs/auth?authuser=0)
    - [CloudStorage](https://firebase.google.com/docs/storage?authuser=0)

### その他

- 素材
    - [ICOOON MONO](https://icooon-mono.com/)
    - [ソコスト](https://soco-st.com/)
    - [Unsplash](https://unsplash.com/)

## 4. ローカルでの利用方法

### npmのインストール
```
npm install
```

### ローカルサーバの実行
```
npm run serve
```

### ビルド
```
npm run build
```
