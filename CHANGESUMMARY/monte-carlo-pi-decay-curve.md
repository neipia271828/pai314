## Summary
- MonteCarloPiの砂落ちアニメーション持続時間を3秒から1秒に短縮
- フレームあたりの点数に線形減衰カーブを追加（8点/フレーム→1点/フレームへ自然に減少）

## Changed Files
- `src/components/MonteCarloPi.tsx` - SAND_DURATION_MSを1000に変更、sandStep内にprogress計算と減衰カーブ（pointsThisFrame）を追加

## Review Status
- Reviewed by: reviewer
- Date: 2026-02-21
- Result: APPROVED
