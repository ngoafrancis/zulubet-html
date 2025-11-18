import json
import re

def load_raw():
    with open("zulubet_predictions.json", "r", encoding="utf-8") as f:
        return json.load(f)[0]["raw"]

def clean_data(raw):
    predictions = []
    text = "\n".join(raw)

    # Split by matches: TIME then TEAM1 - TEAM2
    pattern = r"(\d{1,2}:\d{2})\s*\n([^\n]+?) - ([^\n]+?)\n([\d% ]+?) ([1X2]+)\s*\n\n([\d.]+) ([\d.]+) ([\d.]+)"

    matches = re.findall(pattern, text)

    for m in matches:
        time, home, away, perc, tip, odd1, oddx, odd2 = m

        p = perc.split()
        if len(p) != 3:
            continue

        predictions.append({
            "date_time": time,
            "home": home.strip(),
            "away": away.strip(),
            "p1": p[0].replace("%",""),
            "px": p[1].replace("%",""),
            "p2": p[2].replace("%",""),
            "tip": tip,
            "odd1": odd1,
            "oddx": oddx,
            "odd2": odd2
        })

    return predictions

if __name__ == "__main__":
    raw = load_raw()
    clean = clean_data(raw)

    with open("clean_predictions.json", "w", encoding="utf-8") as f:
        json.dump(clean, f, indent=4)

    print("✔ clean_predictions.json CREATED SUCCESSFULLY.")
