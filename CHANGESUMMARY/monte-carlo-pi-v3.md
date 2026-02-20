## Summary
- MonteCarloPi コンポーネントのドット形状を四角から円（radius 2.5px）に変更
- 1クリックの投下数を 80 → 250 に増加し、精度収束を高速化
- CSS で全幅ブレイクアウト（`width: 100vw` + `margin-left: calc(-50vw + 50%)`）と Header オフセット（`margin-top: 9vw`）を適用

## Changed Files
- `src/components/MonteCarloPi.tsx` - `drawPoint` を `arc` + `fill` の円ドットに変更、`POINTS_PER_CLICK` を 250 に増加
- `src/styles/MonteCarloPi.module.css` - `width: 100vw`・`margin-left: calc(-50vw + 50%)`・`margin-top: 9vw` 追加

## Review Status
- Reviewed by: reviewer
- Date: 2026-02-20
- Result: APPROVED

## Notes
- `width: 100vw` はスクロールバー幅を含むため、Windows 等の環境で水平スクロールが発生する可能性あり。実際の表示確認を推奨。問題が生じた場合は将来タスクで対処予定。
