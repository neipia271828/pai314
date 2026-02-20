## Summary
- MonteCarloPi コンポーネントを全幅レイアウト対応に修正し、Home ページの最上部（Header 直下）に移動
- `ResizeObserver` でラッパー幅を監視し Canvas 幅を動的に同期。固定 `CANVAS_WIDTH` 定数を廃止
- 1クリックで80粒の砂を投下するよう変更。クリック位置を中心に半径160px内へ面積均等分布（`sqrt(random())`）で散らばらせる

## Changed Files
- `src/components/MonteCarloPi.tsx` - 全幅対応（ResizeObserver）+ 大量砂投下ロジック追加
- `src/styles/MonteCarloPi.module.css` - `width: 100%` 全幅レイアウト、ボーダーを下辺のみに変更
- `src/pages/Home.tsx` - MonteCarloPi を Header 直下（Me より前）に移動

## Review Status
- Reviewed by: reviewer
- Date: 2026-02-20
- Result: APPROVED
