# あんこ日和 (anko-curation)

> あんこの幸せが溢れる場所
> 採用柱 B (主軸候補1)・goal-reverse-design PASS 4.25

## コンセプト
情報サイトではなく **「あんこっていいな」が溢れる体験サイト**。
取寄/食べ比べ情報は手段・幸せ感が目的。

## 構造
- `index.html` — 1枚で全要素統合 (Hero / 季節 / 気分 / 偏愛日記 / ペアリング / 辞典 / About)
- `articles/<stem>.html` — 偏愛日記個別記事
- `data/*.json` — 季節 / 気分 / 辞典 / 記事メタ
- `css/style.css` — 和テーマ (あずき + 抹茶 + 生成り)
- `js/app.js` — JSON 駆動 render

## デプロイ
GitHub Pages (`humancronadmin.github.io/anko-curation/`)。
ドメイン取得不要 (User 確定 2026-05-03)。

```bash
# GH repo 作成後
git init
git add .
git commit -m "init: anko-curation MVP"
git branch -M main
git remote add origin https://github.com/humancronadmin/anko-curation.git
git push -u origin main
# Settings → Pages → Source: main / root
```

## 記事追加フロー
1. 写真撮影 (User iPhone) → `images/<stem>.webp`
2. `articles/<stem>.html` 作成 (`toraya-kogata-yokan.html` をテンプレに)
3. `data/articles.json` に entry 追加
4. commit + push

## 仕様詳細
`spec.md` 参照。
