from scholarly import scholarly
import json
import datetime

try:
    author = scholarly.search_author_id("SP1Mx3QAAAAJ")
    scholarly.fill(author, sections=["basics", "indices", "counts"])

    data = {
        "citations_total": author.get("citedby", 324),
        "h_index": author.get("hindex", 9),
        "i10_index": author.get("i10index", 8),
        "last_updated": datetime.datetime.now().strftime("%B %Y")
    }
    print("Successfully fetched from Google Scholar:", data)

except Exception as e:
    print(f"Scholar fetch failed: {e}. Keeping last known values.")
    try:
        with open("data/citations.json") as f:
            data = json.load(f)
        data["last_updated"] = datetime.datetime.now().strftime("%B %Y")
    except:
        data = {
            "citations_total": 324,
            "h_index": 9,
            "i10_index": 8,
            "last_updated": datetime.datetime.now().strftime("%B %Y")
        }

with open("data/citations.json", "w") as f:
    json.dump(data, f, indent=2)

print("Saved:", data)
