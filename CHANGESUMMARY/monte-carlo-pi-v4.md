## Summary
- MonteCarloPi の区切り線（BRAND_COLORのstrokeRect）を削除し、info パネルのborder-topをグリッドと同色に変更
- 点の分布を Canvas 全体（長方形）から「円が内接する正方形」領域内に修正し、`(inside/total) × 4 ≈ π` が数学的に正しく成立するよう修正
- ドットを 1×1 ピクセルのシンプルなピクセルドットに変更

## Changed Files
- `src/components/MonteCarloPi.tsx` - 点生成ロジックを正方形内均一分布に修正（バグ修正）、ドットを1x1pxに変更、BRAND_COLOR定数削除
- `src/styles/MonteCarloPi.module.css` - `.info` の `border-top` をグリッドと同色（`#1a1a2e`）に変更

## Review Status
- Reviewed by: reviewer
- Date: 2026-02-20
- Result: APPROVED

## Bug Fixed
- 旧実装では Canvas 全幅×全高の長方形内に点を生成していたため推定値が π の約半分（≈1.73）になる数学的バグがあった
- 修正後は `cx ± radius`, `cy ± radius` の正方形内に均一分布させることで正しく π に収束することを検証済み
