# Parked

Work stopped on purpose. Each entry: what, why, what unblocks it.

---

1. Gmail draft link goes through a Google redirect.
   What: draft r-8430513016187335307 shows "thehanukkahfairy.com" but its href is https://www.google.com/url?q=http://thehanukkahfairy.com&... (Gmail connector rewrites every link, including bare domain text).
   Why stopped: 3 draft builds, same result. Two-failure stop rule.
   Unblock: in Gmail, select "thehanukkahfairy.com" in the draft, Cmd+K, paste https://thehanukkahfairy.com/#gift-shop. Or send as is: it still lands on the site, possibly via a Google "redirect notice" page.
