#!/usr/bin/env python3
"""Extract runtime assets + JSON from the standalone delivery HTML into GamePrototype."""
from __future__ import annotations

import base64
import json
import re
import shutil
from pathlib import Path

DELIVERY = Path(
    r"E:\angsa\angsa_data\Games\JourneyWestGreatBrawl\素材\sanming_v1_minimal_delivery_20260819_011317"
)
HTML = DELIVERY / "prototype" / "play" / "三命无常_V1完整交付.html"
ROOT = Path(__file__).resolve().parent.parent
PLAY = ROOT / "prototype" / "play"
PROTO = ROOT / "prototype"

JSON_BLOBS = (
    "delivery-assets-json",
    "source-visual-audit-json",
    "world-source-json",
    "source-rule-projection-json",
    "monster-visual-manifest-json",
    "audio-runtime-manifest-json",
    "content-source-json",
    "ui-coverage-json",
)

AUDIO_PATHS = {
    "ui_confirm": "audio/runtime/ui/ui_confirm.wav",
    "ui_cancel": "audio/runtime/ui/ui_cancel.wav",
    "ui_error": "audio/runtime/ui/ui_error.wav",
    "ui_pickup": "audio/runtime/ui/ui_pickup.wav",
    "ui_book": "audio/runtime/ui/ui_book.wav",
    "ui_equip": "audio/runtime/ui/ui_equip.wav",
    "ui_shop_buy": "audio/runtime/ui/ui_shop_buy.wav",
    "ui_shop_sell": "audio/runtime/ui/ui_shop_sell.wav",
    "ui_respawn": "audio/runtime/ui/ui_respawn.wav",
    "music_lobby": "audio/runtime/music/mus_lobby.ogg",
    "ambience_map": "audio/runtime/ambience/amb_map_general.ogg",
}


def decode_data_url(data_url: str) -> bytes:
    _header, payload = data_url.split(",", 1)
    return base64.b64decode(payload)


def write_bytes(dest: Path, data: bytes) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_bytes(data)


def load_blobs(html: str) -> dict[str, str]:
    found = {}
    for script_id in JSON_BLOBS:
        match = re.search(
            rf'<script id="{script_id}" type="application/json">(.*?)</script>',
            html,
            re.S,
        )
        if not match:
            raise SystemExit(f"missing blob: {script_id}")
        found[script_id] = match.group(1)
    return found


def copy_play_source() -> None:
    src = DELIVERY / "prototype" / "play"
    PLAY.mkdir(parents=True, exist_ok=True)
    for name in ("index.html", "game.js", "game.css", "delivery-v2.css"):
        shutil.copy2(src / name, PLAY / name)
    docs = ROOT / "docs" / "delivery"
    docs.mkdir(parents=True, exist_ok=True)
    for name in (
        "三命无常_美术总监工作手册_v1.md",
        "PROJECT_STATE.md",
        "CURRENT_TASK.md",
        "README_DELIVERY_BOUNDARIES.txt",
        "AGENTS.md",
    ):
        src_file = DELIVERY / name
        if src_file.exists():
            shutil.copy2(src_file, docs / name)


def main() -> None:
    print("reading standalone html...")
    html = HTML.read_text(encoding="utf-8")
    blobs = load_blobs(html)
    copy_play_source()

    summary = {}

    delivery = json.loads(blobs["delivery-assets-json"])
    asset_bytes = 0
    for uri, data_url in delivery.items():
        dest = (PLAY / uri).resolve()
        raw = decode_data_url(data_url)
        write_bytes(dest, raw)
        asset_bytes += len(raw)
    summary["deliveryAssets"] = {"count": len(delivery), "bytes": asset_bytes}

    monsters = json.loads(blobs["monster-visual-manifest-json"])
    monster_bytes = 0
    for item in monsters.get("items", []):
        asset_id = item["assetId"]
        folder = PROTO / "assets" / "monsters" / "runtime" / asset_id
        for kind in ("portrait", "detail"):
            raw = decode_data_url(item[kind])
            write_bytes(folder / f"{kind}.webp", raw)
            monster_bytes += len(raw)
            item[kind] = f"../assets/monsters/runtime/{asset_id}/{kind}.webp"
    manifest_path = PROTO / "assets" / "monsters" / "runtime" / "manifest.json"
    write_bytes(
        manifest_path,
        json.dumps(monsters, ensure_ascii=False, indent=2).encode("utf-8"),
    )
    summary["monsters"] = {"count": len(monsters.get("items", [])), "bytes": monster_bytes}

    audio = json.loads(blobs["audio-runtime-manifest-json"])
    audio_bytes = 0
    for asset_id, item in audio.get("assets", {}).items():
        rel = AUDIO_PATHS.get(asset_id) or item.get("file")
        if isinstance(rel, str) and rel.startswith("data:"):
            rel = AUDIO_PATHS[asset_id]
        raw = decode_data_url(item["file"])
        dest = PROTO / rel
        write_bytes(dest, raw)
        audio_bytes += len(raw)
        item["file"] = rel
    write_bytes(
        PROTO / "audio" / "runtime" / "audio-manifest.json",
        json.dumps(audio, ensure_ascii=False, indent=2).encode("utf-8"),
    )
    summary["audio"] = {"count": len(audio.get("assets", {})), "bytes": audio_bytes}

    json_map = {
        "content-source-json": PROTO / "data" / "content-source.json",
        "world-source-json": PLAY / "world-source.json",
        "source-rule-projection-json": PLAY / "source-rule-projection.json",
        "ui-coverage-json": PLAY / "ui-coverage.json",
        "source-visual-audit-json": PLAY / "source-visual-audit.json",
    }
    json_info = {}
    for blob_id, dest in json_map.items():
        raw = blobs[blob_id].encode("utf-8")
        size_mb = len(raw) / 1024 / 1024
        json_info[blob_id] = round(size_mb, 2)
        if size_mb > 8:
            print(f"skip large json {blob_id}: {size_mb:.2f} MB")
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_text("{}", encoding="utf-8")
            continue
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(raw)
    summary["jsonMB"] = json_info

    print(json.dumps(summary, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
