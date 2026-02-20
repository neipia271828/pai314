## Summary
- infoボックスのオーバーフロー対策（`overflow: hidden`、`box-sizing: border-box`、フォント・パディング縮小、`flex-wrap: wrap`）
- 円の描画を破線strokeから円周上に均等配置した2pxドット列に変更（ピクセルアートスタイル）
- `.wrapper`に`overflow: hidden`を追加

## Changed Files
- `src/components/MonteCarloPi.tsx` - `drawCircle` をドット描画（fillRect）に変更
- `src/styles/MonteCarloPi.module.css` - `.info` にoverflow対策追加、フォント・パディング縮小、`.formula/.result/.accuracy` に`flex-wrap: wrap`追加、`.wrapper`に`overflow: hidden`追加

## Review Status
- Reviewed by: reviewer
- Date: 2026-02-20
- Result: APPROVED
