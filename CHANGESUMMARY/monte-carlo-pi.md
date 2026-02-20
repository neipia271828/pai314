## Summary
- モンテカルロ法によるπ推定アニメーションコンポーネント `MonteCarloPi` を新規作成し、Home ページに組み込んだ
- Canvas API と `requestAnimationFrame` を使ったインタラクティブなアニメーション。クリックで点を投下し、円内/外を色分け表示
- 各点は 3140ms（3.14秒）後にフェードアウトし消滅。π推定値・誤差率をリアルタイム表示

## Changed Files
- `src/components/MonteCarloPi.tsx` - メインコンポーネント（新規作成）
- `src/styles/MonteCarloPi.module.css` - スタイル（新規作成）
- `src/pages/Home.tsx` - MonteCarloPi コンポーネントを Me と Link の間に挿入

## Review Status
- Reviewed by: reviewer
- Date: 2026-02-20
- Result: APPROVED
