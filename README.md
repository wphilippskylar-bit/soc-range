# Night Shift SOC

A Tier 1 SOC analyst **triage simulator**, installable as an offline PWA.

Work a live alert queue during a simulated shift: an intrusion at a fictional
trucking company unfolds over ~8 minutes as 10 alerts land. Decide each one —
true positive or false positive — pivot through a **Splunk-style SIEM** (real
SPL: `stats`, `timechart`, `table`, `sort`, `top`, `dedup`, wildcards, `IN`,
`OR`/`NOT`), check **threat intel**, decode PowerShell with the built-in
Base64 decoder, consult the **documentation** for what's normal, and close each
alert with a **case report** that gets scored on classification and escalation.

False positives are mixed in on purpose (an approved admin script, a real
DocuSign email, a normal process on the infected host) to train judgment, not
pattern-matching.

Everything runs client-side; progress saves in your browser. Scenario, company
and people are fictional; IPs use reserved documentation ranges.

## Run locally
Open `index.html` in a browser, or serve the folder:
`python3 -m http.server` then visit the printed URL.

Hosted via GitHub Pages.
