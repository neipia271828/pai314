## Summary
- MonteCarloPi の点生成をCanvas全体（W×H長方形）均一分布に変更し、推定式を `π ≈ (inside/total) × (W×H/r²)` に変更
- team-lead の判断によりビジュアル優先（Canvas全体に点を散布）+ 推定式変更という方針で再実装

## Changed Files
- `src/components/MonteCarloPi.tsx` - 点生成をCanvas全体均一分布に変更、推定式を `(inside/total) × (W×H/r²)` に変更、UIテキストを `× W×H/r²` に更新

## Review Status
- Reviewed by: reviewer
- Date: 2026-02-20
- Result: APPROVED

## Notes
- 推定式 `π = (inside/total) × (W×H/r²)` の数学的正確性を任意のCanvas幅・高さで検証済み
- リサイズ時に過去の点が古い radius で判定されたまま残る一時的な不整合が存在するが、点は3.14秒で消滅するため影響は軽微。ポートフォリオ演示用途として許容範囲内
