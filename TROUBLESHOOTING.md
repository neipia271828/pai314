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