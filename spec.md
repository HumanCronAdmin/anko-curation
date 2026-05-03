# あんこキュレサイト spec.md (改訂 2026-05-03 夜)

> 採用柱 B (主軸候補1)・goal-reverse-design PASS 4.25
> handoff 2026-05-03 夜 タスク2 → User 指示で **GH Pages 路線 + 「あんこ幸せ溢れる」コンセプト軸** に改訂

## コンセプト (User 確定)
**「あんこがもたらす幸せが溢れているサイト」**
取寄/食べ比べ情報サイトではなく、訪れた読者が「あんこっていいな」と幸せ気分になる体験設計が主軸。
情報は手段・幸せ感が目的。お菓子サイト (humancronadmin.github.io/okashi/) と同じ運営思想 (写真大判・偏愛全開) を「あんこ専用」「日本語・女性向け」「和トーン」で再構築。

## Problem
全国に「あんこ偏愛」消費層 (30-60代女性中心) が確実に存在し、取寄/お取り寄せどら焼き市場は実販データあり (虎屋・たねや・両口屋是清 等継続販売)。
だが既存個人プレイヤー =
- **週刊あんこ** (さとう祐介・男性・全国 300 軒+取材ベース・ガチ取材路線)
- **日本あんこ協会** (団体・公式情報中心)
で「**幸福感そのもの**を体験させるサイト」は空白。
情報密度勝負ではなく**幸せ体感**勝負で隙間を取る。

## Solution
GitHub Pages (`humancronadmin.github.io/anko-curation/`) で「あんこ幸せ体感サイト」構築。
お菓子サイト構造 (GH Pages + JSON データ駆動 + JS で render) をそのまま転用・コンテンツ和テーマ化。

### 「幸せ溢れる」逆算 9 要素 (全部 index 1 枚に統合)
1. **視覚的幸福**: 大判写真・粒あん断面・湯気・季節色 (1 記事 1 主役写真ルール)
2. **季節カレンダー**: 桜餅(春)/水羊羹(夏)/栗きんとん・おはぎ(秋)/おしるこ(冬) — 今月の旬1-2品ピックアップ
3. **気分ナビ**: 「疲れた日に」「雨の日に」「朝コーヒーと」「夜のお茶と」「お祝いに」気分タグから記事抽出
4. **偏愛日記**: User 一人称・「今日のあんこ」型・1 記事 800-2000 字 (情報サイトより短く・幸福感優先)
5. **ペアリング**: お茶 (玉露/煎茶/ほうじ茶/紅茶/コーヒー) × あんこ + 食器 (komono 文脈接続)
6. **あんこ辞典**: 粒/こし/小倉/白/うぐいす/きざみ・製法解説 (やさしい言葉)
7. **老舗物語**: 1 店舗 1 軽めエッセイ (ガチ取材 NG・User 取寄+情景描写ベース)
8. **取寄カタログ**: 季節限定 + 通年定番 (もしも/Amazon/楽天 アフィ統合・押し付けない控えめUI)
9. **偏愛宣言 (About)**: なぜこのサイトを作ったか・User 一人称で短く

## Tech Stack
- **GitHub Pages** (Jekyll なし・素 HTML/CSS/JS・お菓子サイトと同構造)
- データ: `data/*.json` で記事/季節/辞典/ペアリング管理
- JS: `js/app.js` で JSON 読み込み + render (お菓子サイト構造流用)
- 画像: 自前撮影 (User iPhone) + WebP 変換
- アフィ: もしもアフィリエイト (Amazon/楽天 一括) のみ MVP・A8 は記事 30 本後
- 解析: GA4 + Search Console (記事 5 本後設定)
- ドメイン: **不要** (GH Pages 標準ドメインで十分・User 確定 2026-05-03)

## サイト構造
```
projects/anko-curation/
├── index.html           # Hero + 季節カレンダー + 気分ナビ + 偏愛ピックアップ + ペアリング + 辞典導線 + About
├── articles/<stem>.html # 偏愛日記 個別記事
├── css/style.css        # 和テーマ (あずき #6B2B3A + 抹茶 #6B8E23 + 生成り #F5EFE3)
├── js/app.js            # JSON 読み込み + render
├── data/
│   ├── articles.json    # 記事メタ
│   ├── seasons.json     # 春夏秋冬 × あんこ
│   ├── dictionary.json  # 粒/こし/小倉/白/うぐいす/きざみ
│   └── moods.json       # 疲れた日/雨の日/朝/夜/お祝い
├── images/              # 自前撮影 (お菓子と同じ webp 構造)
├── README.md
└── CLAUDE.md            # ブランド/トーンルール
```

## 真似元 3 点ゲート (`hypothesis-resolution` 準拠)
- a) 週刊あんこ — 構造 (47 都道府県 + 製法カテゴリ)。**YES** (構造頂く・トーン真似ない)
- b) macaroni あんこタグ — 女性向けトーン。**YES**
- c) ippin — グルメキュレ + EC リンク統合 UI。**YES**
- 自社既存パクリ: お菓子サイト (humancronadmin.github.io/okashi/) — 構造/JSON データ駆動/render 仕組み。**YES**
4/4 YES → ゲート PASS

差別化軸:
1. 女性視点 (週刊あんこ = 男性筆者)
2. 偏愛 komono 文体 (3 サイトとも記者文体)
3. **幸せ体感主軸** (情報密度ではなく幸福感)
4. 食器 (komono) との浅い接続

## MVP Scope (今このセッションで実装)
- index.html (9 要素全部統合)
- css/style.css (和テーマ)
- js/app.js (お菓子から流用 + あんこ用 render)
- data/articles.json (サンプル 1 本)
- data/seasons.json (春夏秋冬 各 2 品)
- data/dictionary.json (6 用語)
- data/moods.json (5 気分)
- articles/toraya-kogata-yokan.html (サンプル偏愛日記 1 本)
- README.md / CLAUDE.md

## Revenue Model
- 短期 (3 ヶ月・記事 10 本): もしもアフィ Amazon/楽天 月 ¥1,000-3,000
- 中期 (6 ヶ月・記事 30 本): 月 ¥10,000-30,000
- 長期 (1 年・記事 100 本): 月 ¥50,000-150,000
- 単発 note 課金: 「あんこ取寄ベスト 30 選」型を ¥980 で年 2-3 本

## ゴール逆算 (4 掛け算 PASS 4.25)
- 時流 5 / 仮説 4 / 可能 4 / 収益性 4 = 4.25

## やらない
- ドメイン取得 (GH Pages で十分・User 確定)
- WP 構築 (GH Pages で十分)
- 週刊あんこ完コピ (差別化軸 = 幸せ体感 + 女性視点 + 偏愛文体)
- YMYL (健康効能訴求 NG)
- komono と完全被り (あんこ主・食器副次)
- ガチ取材路線 (純喫茶古グラス KILL の教訓)
- 運営者紐付け (komono との同一運営宣言 NG = `feedback_no_owned_site_link_from_persona.md`)

## 撤退条件 (Time-bound Kill Line)
- 3 ヶ月 (記事 30 本) で月 PV < 1,000 → 文体/テーマ再評価
- 6 ヶ月 (記事 60 本) で月収益 < ¥3,000 → アフィ構造再設計 or KILL 検討
- 9 ヶ月 (記事 90 本) で月収益 < ¥10,000 → KILL (補助レーン化)

## 関連
- ニッチ判定: `memory/feedback_niche_3indicators_gate.md`
- 文体 (流用元): `memory/feedback_note_kokoro_style.md`
- 世界観分離: `memory/feedback_world_separation.md`
- 運営紐付け禁止: `memory/feedback_no_owned_site_link_from_persona.md`
- 構造真似元: `projects/okashi/` (自社・GH Pages)

## 次アクション (User GO 後)
1. `humancronadmin/anko-curation` GitHub repo 作成 + push
2. GH Pages 有効化 (Settings → Pages → main / root)
3. 1 本目記事「虎屋 小形羊羹 5 種食べ比べ」用に取寄実購入 (User 手作業)
4. 写真撮影 → WebP 変換 → images/ 配置
5. もしもアフィ ID 確認 (`feedback_verify_affiliate_ids.md`)
