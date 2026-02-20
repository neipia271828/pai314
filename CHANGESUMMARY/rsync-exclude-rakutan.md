## Summary
- デプロイ時にrsyncの`--delete`フラグが`/var/www/pai314/rakutan/`ディレクトリを削除しようとして`Permission denied (13)`エラーが発生していた問題を修正
- rsyncのswitchesに`--exclude=rakutan/`を追加し、rakutan/ディレクトリをrsyncの対象外にした

## Changed Files
- `.github/workflows/deploy.yml` - rsync switchesに`--exclude=rakutan/`を追加（28行目）

## Review Status
- Reviewed by: reviewer
- Date: 2026-02-21
- Result: APPROVED
