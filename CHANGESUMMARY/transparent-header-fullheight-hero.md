## Summary
- Home ページのヘッダーを透明化し、MonteCarloPi を全高ヒーローとして表示
- Header コンポーネントに `transparent` prop を追加し、透明/不透明を切り替え可能に
- MonteCarloPi の Canvas 高さをビューポート高さに動的対応（ResizeObserver を canvas 要素自体に変更することで CSS 表示サイズとバッファサイズの整合性を保証）

## Changed Files
- `src/components/Header.tsx` - `transparent?: boolean` prop 追加、条件によりクラス切り替え
- `src/styles/Header.module.css` - `.headerTransparent` 追加、共通プロパティをセレクタグループに整理
- `src/components/MonteCarloPi.tsx` - `CANVAS_HEIGHT` 定数廃止・`canvasHeightRef` 導入、ResizeObserver を canvas 要素に変更（バグ修正）
- `src/styles/MonteCarloPi.module.css` - `margin-top: 9vw` 削除、`min-height: 100vh` 追加、`.canvas` に `flex: 1` 追加
- `src/pages/Home.tsx` - `<Header transparent />` に変更

## Review Status
- Reviewed by: reviewer
- Date: 2026-02-20
- Result: APPROVED

## Bug Fixed（差し戻し後修正）
- 旧実装では `wrapper` を ResizeObserver で観測していたため、`canvas.height` に wrapper 全体の高さ（info パネル込み）がセットされ、canvas バッファ高さ > CSS 表示高さの不整合が発生していた
- 修正後は `canvas` 要素自体を観測することで常にバッファ = CSS 表示サイズが保証される
