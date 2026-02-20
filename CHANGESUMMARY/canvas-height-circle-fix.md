## Summary
- Canvas 高さ不足の修正: wrapper を `height: 100vh` 固定にし、`getBoundingClientRect()` によるマウント直後の初期サイズ同期（`syncSize` ヘルパー）を追加
- 円はみ出しの修正: `radius = Math.min(w, h) / 2 * 0.7` に変更し、各辺に15%の余白を確保
- `wrapperRef` 未使用 ref を削除
- `drawCircle` をユーザー要望により1px stroke（`arc + stroke`）方式に変更

## Changed Files
- `src/components/MonteCarloPi.tsx` - `syncSize` 関数追加、radius計算変更（0.45→0.7）、`wrapperRef` 削除、`drawCircle` を1px stroke に変更
- `src/styles/MonteCarloPi.module.css` - `.wrapper` を `height: 100vh` 固定、`.canvas` に `height: 0` 追加

## Review Status
- Reviewed by: reviewer
- Date: 2026-02-20
- Result: APPROVED

## Notes
- `drawCircle` のドットスタイル → 1px stroke 方式への変更はユーザー要望によるもの（team-lead 確認済み）
- `height: 0` + `flex: 1` の組み合わせにより、canvas が info パネルを圧迫せず残り全高を占める
