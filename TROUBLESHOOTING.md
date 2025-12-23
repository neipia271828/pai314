# Cloudflare + Sakura VPS + Nginx HTTPS 構築時に発生した問題と対策まとめ

## 概要

Cloudflare を DNS / SSL のフロントに配置し、  
Sakura VPS 上の Nginx で `.tech` / `.jp` の複数ドメインを HTTPS（Full strict）で運用する構成を構築した。

その過程で発生した **代表的なバグ・エラー（主に 521 / 526 / 403）** について、  
**根本原因・特定方法・最終的な解決策** を以下にまとめる。

---

## 構成

Browser
↓ HTTPS
Cloudflare
	•	DNS
	•	Proxy
	•	Edge SSL
↓ HTTPS (Full strict)
Sakura VPS
	•	Nginx
	•	Origin Certificate
	•	SNI による複数ドメイン分岐

---

## 発生した主なバグ一覧

| バグ内容 | エラーコード |
|---|---|
| HTTPS が繋がらない | 521 |
| Strict SSL で拒否される | 526 |
| ページが表示されない | 403 |

---

## バグ①：Cloudflare Error 521（Web server is down）

### 症状
- Cloudflare 経由でアクセスすると 521
- VPS 直アクセス（HTTP）は問題なし

### 根本原因
- **Nginx が 443 ポートで待ち受けていなかった**
- SSL 設定は書かれていたが、設定が有効化されていなかった

### 原因の特定方法
```bash
sudo ss -tulpn | grep 443

→ 出力なし
→ Nginx が HTTPS を listen していないと判断

対策
	•	sites-available に設定を書くだけでなく
sites-enabled にシンボリックリンクを作成
	•	default 設定を無効化

sudo ln -s /etc/nginx/sites-available/pai314.tech /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo systemctl restart nginx


⸻

バグ②：Cloudflare Error 526（Invalid SSL certificate）

症状
	•	curl（VPS直指定）は成功
	•	ブラウザ（Cloudflare経由）のみ 526
	•	.tech は成功、.jp のみ失敗

根本原因
	•	Cloudflare Origin Certificate に Subject Alternative Name（SAN）が含まれていなかった
	•	Strict モードでは SAN 不一致は即 526

原因の特定方法

openssl x509 -in origin.crt -noout -text | grep -A1 "Subject Alternative Name"

→ 出力なし
→ SAN が無い証明書であることを確認

対策
	•	Cloudflare で Origin Certificate を再発行
	•	pai314.jp / www.pai314.jp を明示的に SAN に含める

DNS:pai314.jp
DNS:www.pai314.jp

	•	VPS 側で証明書を置き換え

sudo systemctl reload nginx


⸻

バグ③：jp アクセス時に tech 用証明書が返される

症状
	•	.jp へアクセスすると 526
	•	.tech は問題なし

根本原因
	•	Nginx の SNI 分岐が正しく機能していなかった
	•	jp 用 server block が sites-enabled に存在しなかった

原因の特定方法

ls -l /etc/nginx/sites-enabled

→ pai314.tech のみ存在
→ pai314.jp が未有効化と判断

対策

sudo ln -s /etc/nginx/sites-available/pai314.jp /etc/nginx/sites-enabled/
sudo systemctl reload nginx


⸻

バグ④：403 Forbidden が返る

症状
	•	HTTPS は成功
	•	ページ内容が表示されず 403

根本原因
	•	ドキュメントルートに index.html が存在しない
	•	または権限不足

原因の特定方法

ls -l /var/www/pai314.jp

→ 空ディレクトリ

対策

sudo nano /var/www/pai314.jp/index.html
sudo chown -R www-data:www-data /var/www/pai314.jp
sudo chmod -R 755 /var/www/pai314.jp


⸻

切り分けで特に有効だった方法

Cloudflare を無視して Origin を直接確認

curl -k https://pai314.jp --resolve pai314.jp:443:127.0.0.1

	•	成功 → VPS / Nginx / SSL は正常
	•	失敗 → VPS 側の設定不備

⸻

最終的に得られた知見
	•	HTTPS トラブルは 「証明書」ではなく「どの証明書が返っているか」 が重要
	•	Cloudflare Strict は SAN 不足を絶対に許さない
	•	Nginx の sites-available と sites-enabled の違いは致命的になりやすい
	•	curl --resolve は最強の切り分けツール

⸻

最終構成

Cloudflare (DNS / SSL / Proxy)
   ↓ HTTPS (Full strict)
Sakura VPS
   └─ Nginx
       ├─ pai314.tech (Origin Cert)
       └─ pai314.jp   (Origin Cert)


⸻

まとめ

本構成では、DNS・SSL・Web サーバ・OS 権限がすべて連動するため、
1つのミスが別レイヤーのエラーとして現れる。

そのため、
	•	ローカル（Origin）
	•	Cloudflare
	•	ブラウザ

を 段階的に切り分けること が最短解決につながった。

---

もし次にやるなら、この md をベースに：

- **技術ブログ化**
- **ポートフォリオの「インフラ構成」ページ**
- **Qiita / Zenn 記事**

にもそのまま使えます。

必要なら  
「読みやすい記事向け」「就活ポートフォリオ向け」「Qiita向け」  
に書き直すこともできます。

---
以下は レスポンシブデザインをページに適用する方法 と よくあるトラブルシューティング を整理した Markdown 形式のまとめです。
主要なテクニックと対応策をわかりやすくリスト化しています 👇

⸻

📱 Web レスポンシブデザイン実装一覧 & トラブルシューティング

⸻

🎯 基本テクニック一覧

1. Viewport 設定

<meta name="viewport" content="width=device-width, initial-scale=1.0">

	•	すべてのデバイスで正しい幅を基準に表示させるため必須設定です。  ￼

⸻

2. 柔軟なレイアウト（Fluid Layout）
	•	%, auto, fr, vw/vh, rem などの相対単位で指定
	•	固定 px を避けて画面幅に応じて伸縮させます。  ￼

⸻

3. Flexbox を使ったレイアウト調整

.container {
  display: flex;
  flex-wrap: wrap;
}

	•	アイテムの並び替えや折り返し制御に最適です。  ￼

⸻

4. CSS Grid でグリッドレイアウト

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

	•	複雑なグリッドも柔軟に対応できます。  ￼

⸻

5. メディアクエリ（画面幅によるスタイル制御）

@media (max-width: 768px) {
  .nav { display: none; }
}

	•	画面サイズごとに CSS を切り替えます。  ￼

⸻

6. 画像やメディアのレスポンシブ化

img {
  max-width: 100%;
  height: auto;
}

	•	画面サイズに合わせて画像が伸縮。  ￼

⸻

7. レスポンシブタイポグラフィ
	•	clamp(), rem, vw を使ってフォントサイズを柔軟に制御。  ￼

⸻

⚠️ トラブル & 解決策（よくある失敗）

⸻

❗ CSS が効かない / 反映されない

原因
	•	CSS が読み込まれていない
	•	メディアクエリの位置や優先度が誤っている  ￼

対策
	•	開発者ツールで CSS の読み込みをチェック
	•	モバイル用 CSS を PC 以上に優先して記述

⸻

❗ 横スクロール / はみ出しが起きる

原因
	•	子要素の幅がコンテナより大きい（px 固定など）
	•	overflow 発生要素がある  ￼

対策
	•	max-width: 100% を適用
	•	不要な margin/padding を調整
	•	overflow-x: hidden を一時的に使用（応急）

⸻

❗ 要素が見切れる/余白ができる

原因
	•	CSS 設定が狭い画面幅で崩れている
	•	画像やコンテンツが自動折り返しされない  ￼

対策
	•	Flexbox / Grid を使い自動折り返し
	•	media query で明示的なサイズ変更を追加

⸻

❗ スマホで反映されない

原因
	•	viewport 設定漏れ
	•	キャッシュ読み込み  ￼

対策
	•	<meta name="viewport"> の確認
	•	ブラウザキャッシュをクリア

⸻

❗ 画像やフォームが画面に合わない

原因
	•	ブラウザの自動スケール機能
	•	サイズ固定 HTML 属性  ￼

対策

img, video {
  max-width: 100%;
}
input {
  width: 100%;
}


⸻

🔍 テスト & 検証
	•	デベロッパーツールで様々な画面幅を検証。
	•	実機テスト（iPhone/Android/タブレット）。
	•	オンラインのレスポンシブチェッカー利用。  ￼

⸻

💡 ベストプラクティス

技術	用途
Flexbox	一方向のレイアウト調整
Grid	複雑な多列レイアウト
Media Queries	幅ごとに CSS を切り替え
相対単位	画面に合わせて伸縮
Viewport	モバイル対応の基礎


⸻

必要なら、実際のコード例やあなたのページ構成をもとに最適なレスポンシブ CSS をカスタムで作りますよ 😊
対象ページの HTML/CSS を貼ってください！

---
以下は git の使い方（基本〜中級）一覧 と よくあるトラブルとその解決策 を Markdown 形式でまとめたものです。
Git はバージョン管理の王道ツールで、日常的な開発やチーム作業の必須スキルです 🧠✨

⸻

📦 Git 使い方一覧 & トラブルシューティング

⸻

🔰 1 事前設定

# Git バージョン確認
git --version

# 初期設定（名前・メール）
git config --global user.name "Your Name"
git config --global user.email "email@example.com"

	•	--global: PC 全体の設定
	•	リポジトリ固有にする場合は --local を使います  ￼

⸻

📁 2 リポジトリ操作

操作	コマンド
新規リポジトリを作成	git init
既存リポジトリをコピー	git clone <URL>
リモート URL を追加	git remote add origin <URL>
リモート URL を表示	git remote -v
追加リモート削除	git remote remove <名前>
（例: origin）  ￼	


⸻

🔄 3 変更管理（作業の流れ）

📌 状態確認

git status

ファイルの状態を確認します（staged / modified / untracked）  ￼

⸻

📌 ステージングエリアに追加

git add <file>
git add .            # カレントフォルダ全部
git add -A           # すべて


⸻

📌 コミット

git commit -m "メッセージ"

	•	-m: メッセージ指定
	•	git commit -a -m: 変更された tracked ファイルを一括でステージ + コミット  ￼

⸻

📌 履歴を見る

git log
git log --oneline


⸻

🌿 4 ブランチ管理

操作	コマンド
ブランチ一覧	git branch
リモート含め全て一覧	git branch -a
ブランチ作成	git branch <name>
ブランチ切替	git switch <name> ／ git checkout <name>
作成 + 切替	git switch -c <name> ／ git checkout -b <name>
ブランチ削除	git branch -d <name>
強制削除	git branch -D <name>
（追跡ブランチ等含む）  ￼	


⸻

🔀 5 ブランチ統合

# main ブランチに切り替える
git switch main

# feature の変更を merge
git merge feature-branch

	•	--no-ff: 完全マージコミットを強制
	•	--ff-only: fast-forward のみ許可  ￼

⸻

☁️ 6 リモート操作

# 最新変更を取得（fetch だけ）
git fetch

# 取得して自動マージ
git pull

# 自分の変更を送信
git push origin main

	•	push は最初だけ -u origin main を指定
	•	origin はデフォルト名（リモートの別名）  ￼

⸻

🔄 7 差分 & 変更の確認

git diff             # ワーキング と staged 差分
git diff --staged    # staged と last commit 差分


⸻

🧰 8 編集・削除・名前変更

git mv old new       # 移動/名前変更
git rm <file>        # 削除
git rm --cached <file>   # 追跡解除（ファイルは残す）


⸻

📦 9 スタッシュ（一時退避）

git stash            # 一時退避
git stash list       # 一覧
git stash pop        # 戻す
git stash drop       # 消す


⸻

🧠 10 リセット・修正

操作	コマンド
最後のコミット修正	git commit --amend -m "new msg"
最新コミット取り消し（作業保持）	git reset --soft HEAD~1
最新コミット完全リセット	git reset --hard HEAD~1
リモートに合わせて強制履歴一致	git reset --hard origin/main


⸻

🚧 トラブルと解決策

❗ コンフリクト発生

症状
マージや pull 時に衝突発生

解決
	1.	衝突ファイルを直接編集
	2.	git add conflict-file
	3.	git merge --continue または手動 commit

⸻

❗ 間違ったブランチでコミット

解決

git switch correct-branch
git cherry-pick <commit-id>

または

git reset HEAD~1


⸻

❗ push 拒否される（fast-forward エラー）

原因
リモートとローカルの差分がある

解決

git pull --rebase
git push


⸻

❗ 変更を取り消したい

状況	戻すコマンド
作業中の変更を捨てる	git restore <file>
staged に戻したくない	git restore --staged <file>
commit だけを戻したい	git reset HEAD~1


⸻

🧪 チェックリスト（よくあるワークフロー）

git init
git add .
git commit -m "init"
git branch feature-x
git switch feature-x
# 作業
git add .
git commit -m "feat: X"
git switch main
git merge feature-x
git push origin main


⸻

🔗 参考資料
	•	Git は多数の CLI コマンドがある分散バージョン管理システムです  ￼
	•	基本〜応用コマンド一覧が公式・コミュニティ側からまとめられています  ￼

⸻

必要なら チーム開発で使うブランチ戦略（Git Flow / GitHub Flow） や 実際の起こりがちなトラブル別対応例 をセットにした PDF 風のまとめも作れますよ 📄✨