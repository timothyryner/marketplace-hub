# Security Alerts: marketplace-hub

This file is maintained automatically by SecurityBot. Each entry is a published vulnerability that affects a dependency version this repo actually resolves. Sources: GitHub Advisory Database and PyPA via OSV.dev, severities from GitHub advisories, cross-checked against the CISA Known Exploited Vulnerabilities list.

**For coding agents:** apply the patch step for each Open entry, run the tests, and commit the lockfile change. Don't edit this file by hand; SecurityBot marks entries Resolved once the repo no longer resolves an affected version.

Last scan: 2026-10-27 (CDT).

Open alerts: none. On CISA known-exploited list: 0.

## Quick fix summary

Lowest version that clears every open advisory for each installed package (upgrading to this or later fixes them all).

| Package | Installed | Upgrade to at least | File |
|---|---|---|---|

## Open alerts

No open alerts. Everything below was fixed on the default branch.

## Resolved

### GHSA-2464-fhr4-w9xw: next (Critical)
<!-- securitybot-id: GHSA-2464-fhr4-w9xw|npm|next -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-2464-fhr4-w9xw](https://github.com/advisories/GHSA-2464-fhr4-w9xw)
- Severity: Critical
- CISA known-exploited: No
- Summary: Next.js: Unauthenticated Remote Code Execution in Image Optimization API when SVG files are used
- Package: `next` (npm)
- Affected versions: >= 10.0.0, < 15.5.28; >= 16.0.0, < 16.4.1
- Installed 16.2.3 in `package-lock.json`. Fixed in 16.4.1. Patch: `npm install next@16.4.1`
- Tracking issue: [#1](https://github.com/timothyryner/marketplace-hub/issues/1)

### GHSA-2xp9-vwfh-vxw4: next (Critical)
<!-- securitybot-id: GHSA-2xp9-vwfh-vxw4|npm|next -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-2xp9-vwfh-vxw4](https://github.com/advisories/GHSA-2xp9-vwfh-vxw4)
- Severity: Critical
- CISA known-exploited: No
- Summary: Next.js: Unauthenticated Remote Code Execution in Image Optimization API when AVIF files are used
- Package: `next` (npm)
- Affected versions: >= 10.0.0, < 15.5.24; >= 16.0.0, < 16.3.3
- Installed 16.2.3 in `package-lock.json`. Fixed in 16.3.3. Patch: `npm install next@16.3.3`
- Tracking issue: [#2](https://github.com/timothyryner/marketplace-hub/issues/2)

### GHSA-673q-mjm6-r5xr: next (Critical)
<!-- securitybot-id: GHSA-673q-mjm6-r5xr|npm|next -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-673q-mjm6-r5xr](https://github.com/advisories/GHSA-673q-mjm6-r5xr)
- Severity: Critical
- CISA known-exploited: No
- Summary: Next.js: Unauthenticated Remote Code Execution in `use cache` functions returning typed arrays
- Package: `next` (npm)
- Affected versions: >= 16.0.0, < 16.4.1
- Installed 16.2.3 in `package-lock.json`. Fixed in 16.4.1. Patch: `npm install next@16.4.1`
- Tracking issue: [#3](https://github.com/timothyryner/marketplace-hub/issues/3)

### GHSA-p293-qw3h-jr36: next (Critical)
<!-- securitybot-id: GHSA-p293-qw3h-jr36|npm|next -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-p293-qw3h-jr36](https://github.com/advisories/GHSA-p293-qw3h-jr36)
- CVE: CVE-2026-75604
- Severity: Critical
- CISA known-exploited: No
- Summary: Next.js: Unauthenticated Remote Code Execution on windows-hosted servers
- Package: `next` (npm)
- Affected versions: >= 13.4.0, < 15.5.24; >= 16.0.0, < 16.3.3
- Installed 16.2.3 in `package-lock.json`. Fixed in 16.3.3. Patch: `npm install next@16.3.3`
- Tracking issue: [#4](https://github.com/timothyryner/marketplace-hub/issues/4)

### GHSA-vcvr-r3jv-pc5j: next (Critical)
<!-- securitybot-id: GHSA-vcvr-r3jv-pc5j|npm|next -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-vcvr-r3jv-pc5j](https://github.com/advisories/GHSA-vcvr-r3jv-pc5j)
- Severity: Critical
- CISA known-exploited: No
- Summary: Next.js: Remote Code Execution in next/og ImageResponse
- Package: `next` (npm)
- Affected versions: >= 16.2.0, < 16.3.6
- Installed 16.2.3 in `package-lock.json`. Fixed in 16.3.6. Patch: `npm install next@16.3.6`
- Tracking issue: [#5](https://github.com/timothyryner/marketplace-hub/issues/5)

### GHSA-3jxr-9vmj-r5cp: brace-expansion (High)
<!-- securitybot-id: GHSA-3jxr-9vmj-r5cp|npm|brace-expansion -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-3jxr-9vmj-r5cp](https://github.com/advisories/GHSA-3jxr-9vmj-r5cp)
- CVE: CVE-2026-13149
- Severity: High
- CISA known-exploited: No
- Summary: brace-expansion: DoS via exponential-time expansion of consecutive non-expanding {} groups
- Package: `brace-expansion` (npm)
- Affected versions: < 1.1.16; >= 2.0.0, < 2.1.2; >= 3.0.0, < 5.0.7
- Installed 1.1.13 in `package-lock.json`. Fixed in 1.1.16. Patch: Transitive dependency. Run `npm update brace-expansion`; if `npm ls brace-expansion` still shows 1.1.13, add `"overrides": {"brace-expansion": "^1.1.16"}` to `package.json` and run `npm install`.
- Installed 5.0.5 in `package-lock.json`. Fixed in 5.0.7. Patch: Transitive dependency. Run `npm update brace-expansion`; if `npm ls brace-expansion` still shows 5.0.5, add `"overrides": {"brace-expansion": "^5.0.7"}` to `package.json` and run `npm install`.
- Tracking issue: [#7](https://github.com/timothyryner/marketplace-hub/issues/7)

### GHSA-6j4f-fj2g-mc7p: brace-expansion (High)
<!-- securitybot-id: GHSA-6j4f-fj2g-mc7p|npm|brace-expansion -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-6j4f-fj2g-mc7p](https://github.com/advisories/GHSA-6j4f-fj2g-mc7p)
- CVE: CVE-2026-102276
- Severity: High
- CISA known-exploited: No
- Summary: brace-expansion: DoS via uncontrolled recursion in parseCommaParts causing stack exhaustion
- Package: `brace-expansion` (npm)
- Affected versions: < 1.1.19; >= 2.0.0, < 2.1.5; >= 3.0.0, < 3.0.7; >= 4.0.0, < 5.0.10
- Installed 1.1.13 in `package-lock.json`. Fixed in 1.1.19. Patch: Transitive dependency. Run `npm update brace-expansion`; if `npm ls brace-expansion` still shows 1.1.13, add `"overrides": {"brace-expansion": "^1.1.19"}` to `package.json` and run `npm install`.
- Installed 5.0.5 in `package-lock.json`. Fixed in 5.0.10. Patch: Transitive dependency. Run `npm update brace-expansion`; if `npm ls brace-expansion` still shows 5.0.5, add `"overrides": {"brace-expansion": "^5.0.10"}` to `package.json` and run `npm install`.
- Tracking issue: [#7](https://github.com/timothyryner/marketplace-hub/issues/7)

### GHSA-mh99-v99m-4gvg: brace-expansion (High)
<!-- securitybot-id: GHSA-mh99-v99m-4gvg|npm|brace-expansion -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-mh99-v99m-4gvg](https://github.com/advisories/GHSA-mh99-v99m-4gvg)
- CVE: CVE-2026-14257
- Severity: High
- CISA known-exploited: No
- Summary: brace-expansion: DoS via unbounded expansion length causing an out-of-memory process crash
- Package: `brace-expansion` (npm)
- Affected versions: < 1.1.17; >= 2.0.0, < 2.1.3; >= 3.0.0, < 3.0.3; >= 4.0.0, < 5.0.8
- Installed 1.1.13 in `package-lock.json`. Fixed in 1.1.17. Patch: Transitive dependency. Run `npm update brace-expansion`; if `npm ls brace-expansion` still shows 1.1.13, add `"overrides": {"brace-expansion": "^1.1.17"}` to `package.json` and run `npm install`.
- Installed 5.0.5 in `package-lock.json`. Fixed in 5.0.8. Patch: Transitive dependency. Run `npm update brace-expansion`; if `npm ls brace-expansion` still shows 5.0.5, add `"overrides": {"brace-expansion": "^5.0.8"}` to `package.json` and run `npm install`.
- Tracking issue: [#7](https://github.com/timothyryner/marketplace-hub/issues/7)

### GHSA-qhr7-859c-m2p7: brace-expansion (High)
<!-- securitybot-id: GHSA-qhr7-859c-m2p7|npm|brace-expansion -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-qhr7-859c-m2p7](https://github.com/advisories/GHSA-qhr7-859c-m2p7)
- CVE: CVE-2026-102278
- Severity: High
- CISA known-exploited: No
- Summary: brace-expansion: DoS via uncontrolled recursion on nested brace groups causing stack exhaustion
- Package: `brace-expansion` (npm)
- Affected versions: < 1.1.20; >= 2.0.0, < 2.1.6; >= 3.0.0, < 3.0.8; >= 4.0.0, < 5.0.11
- Installed 1.1.13 in `package-lock.json`. Fixed in 1.1.20. Patch: Transitive dependency. Run `npm update brace-expansion`; if `npm ls brace-expansion` still shows 1.1.13, add `"overrides": {"brace-expansion": "^1.1.20"}` to `package.json` and run `npm install`.
- Installed 5.0.5 in `package-lock.json`. Fixed in 5.0.11. Patch: Transitive dependency. Run `npm update brace-expansion`; if `npm ls brace-expansion` still shows 5.0.5, add `"overrides": {"brace-expansion": "^5.0.11"}` to `package.json` and run `npm install`.
- Tracking issue: [#7](https://github.com/timothyryner/marketplace-hub/issues/7)

### GHSA-rgw5-rvv9-x895: brace-expansion (High)
<!-- securitybot-id: GHSA-rgw5-rvv9-x895|npm|brace-expansion -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-rgw5-rvv9-x895](https://github.com/advisories/GHSA-rgw5-rvv9-x895)
- CVE: CVE-2026-69152
- Severity: High
- CISA known-exploited: No
- Summary: brace-expansion: DoS via unbounded intermediate arrays, bypassing the CVE-2026-14257 mitigation
- Package: `brace-expansion` (npm)
- Affected versions: < 1.1.18; >= 2.0.0, < 2.1.4; >= 3.0.0, < 3.0.6; >= 4.0.0, < 5.0.9
- Installed 1.1.13 in `package-lock.json`. Fixed in 1.1.18. Patch: Transitive dependency. Run `npm update brace-expansion`; if `npm ls brace-expansion` still shows 1.1.13, add `"overrides": {"brace-expansion": "^1.1.18"}` to `package.json` and run `npm install`.
- Installed 5.0.5 in `package-lock.json`. Fixed in 5.0.9. Patch: Transitive dependency. Run `npm update brace-expansion`; if `npm ls brace-expansion` still shows 5.0.5, add `"overrides": {"brace-expansion": "^5.0.9"}` to `package.json` and run `npm install`.
- Tracking issue: [#7](https://github.com/timothyryner/marketplace-hub/issues/7)

### GHSA-73wf-gq98-2v4g: browserslist (High)
<!-- securitybot-id: GHSA-73wf-gq98-2v4g|npm|browserslist -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-73wf-gq98-2v4g](https://github.com/advisories/GHSA-73wf-gq98-2v4g)
- CVE: CVE-2026-73088
- Severity: High
- CISA known-exploited: No
- Summary: Browserslist: Uncaught crash / prototype write via untrusted browserslist-stats.json custom stats (normalizeStats)
- Package: `browserslist` (npm)
- Affected versions: < 4.28.7
- Installed 4.28.2 in `package-lock.json`. Fixed in 4.28.7. Patch: Transitive dependency. Run `npm update browserslist`; if `npm ls browserslist` still shows 4.28.2, add `"overrides": {"browserslist": "^4.28.7"}` to `package.json` and run `npm install`.
- Tracking issue: [#8](https://github.com/timothyryner/marketplace-hub/issues/8)

### GHSA-c83g-rgw3-j3cx: browserslist (High)
<!-- securitybot-id: GHSA-c83g-rgw3-j3cx|npm|browserslist -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-c83g-rgw3-j3cx](https://github.com/advisories/GHSA-c83g-rgw3-j3cx)
- CVE: CVE-2026-73089
- Severity: High
- CISA known-exploited: No
- Summary: Browserslist: Unbounded memory growth (no cache eviction) via distinct query results, leading to eventual OOM
- Package: `browserslist` (npm)
- Affected versions: < 4.28.7
- Installed 4.28.2 in `package-lock.json`. Fixed in 4.28.7. Patch: Transitive dependency. Run `npm update browserslist`; if `npm ls browserslist` still shows 4.28.2, add `"overrides": {"browserslist": "^4.28.7"}` to `package.json` and run `npm install`.
- Tracking issue: [#8](https://github.com/timothyryner/marketplace-hub/issues/8)

### GHSA-2883-xcg3-v3hh: js-yaml (High)
<!-- securitybot-id: GHSA-2883-xcg3-v3hh|npm|js-yaml -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-2883-xcg3-v3hh](https://github.com/advisories/GHSA-2883-xcg3-v3hh)
- CVE: CVE-2026-84375
- Severity: High
- CISA known-exploited: No
- Summary: js-yaml: maxTotalMergeKeys does not limit CPU use for empty merge sources
- Package: `js-yaml` (npm)
- Affected versions: >= 3.0.0, < 3.15.2; >= 4.0.0, < 4.3.2
- Installed 4.1.1 in `package-lock.json`. Fixed in 4.3.2. Patch: Transitive dependency. Run `npm update js-yaml`; if `npm ls js-yaml` still shows 4.1.1, add `"overrides": {"js-yaml": "^4.3.2"}` to `package.json` and run `npm install`.
- Tracking issue: [#9](https://github.com/timothyryner/marketplace-hub/issues/9)

### GHSA-52cp-r559-cp3m: js-yaml (High)
<!-- securitybot-id: GHSA-52cp-r559-cp3m|npm|js-yaml -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-52cp-r559-cp3m](https://github.com/advisories/GHSA-52cp-r559-cp3m)
- CVE: CVE-2026-59869
- Severity: High
- CISA known-exploited: No
- Summary: js-yaml: YAML merge-key chains can force quadratic CPU consumption
- Package: `js-yaml` (npm)
- Affected versions: >= 3.0.0, < 3.15.0; >= 4.0.0, < 4.3.0
- Installed 4.1.1 in `package-lock.json`. Fixed in 4.3.0. Patch: Transitive dependency. Run `npm update js-yaml`; if `npm ls js-yaml` still shows 4.1.1, add `"overrides": {"js-yaml": "^4.3.0"}` to `package.json` and run `npm install`.
- Tracking issue: [#9](https://github.com/timothyryner/marketplace-hub/issues/9)

### GHSA-5p4m-2wfm-xmqj: js-yaml (High)
<!-- securitybot-id: GHSA-5p4m-2wfm-xmqj|npm|js-yaml -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-5p4m-2wfm-xmqj](https://github.com/advisories/GHSA-5p4m-2wfm-xmqj)
- Severity: High
- CISA known-exploited: No
- Summary: JS-YAML: Quadratic CPU consumption in !!omap resolution (3.x and 4.x) — CVE-2026-59870 fix not backported
- Package: `js-yaml` (npm)
- Affected versions: >= 3.0.0, < 3.15.1; >= 4.0.0, < 4.3.1
- Installed 4.1.1 in `package-lock.json`. Fixed in 4.3.1. Patch: Transitive dependency. Run `npm update js-yaml`; if `npm ls js-yaml` still shows 4.1.1, add `"overrides": {"js-yaml": "^4.3.1"}` to `package.json` and run `npm install`.
- Tracking issue: [#9](https://github.com/timothyryner/marketplace-hub/issues/9)

### GHSA-28wg-ghj8-5hjv: nanoid (High)
<!-- securitybot-id: GHSA-28wg-ghj8-5hjv|npm|nanoid -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-28wg-ghj8-5hjv](https://github.com/advisories/GHSA-28wg-ghj8-5hjv)
- CVE: CVE-2026-67214
- Severity: High
- CISA known-exploited: No
- Summary: nanoid: non-secure generators can loop indefinitely with negative size
- Package: `nanoid` (npm)
- Affected versions: < 3.3.16; >= 4.0.0, < 5.1.16
- Installed 3.3.11 in `package-lock.json`. Fixed in 3.3.16. Patch: Transitive dependency. Run `npm update nanoid`; if `npm ls nanoid` still shows 3.3.11, add `"overrides": {"nanoid": "^3.3.16"}` to `package.json` and run `npm install`.
- Tracking issue: [#10](https://github.com/timothyryner/marketplace-hub/issues/10)

### GHSA-2v37-7h3g-55p8: nanoid (High)
<!-- securitybot-id: GHSA-2v37-7h3g-55p8|npm|nanoid -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-2v37-7h3g-55p8](https://github.com/advisories/GHSA-2v37-7h3g-55p8)
- CVE: CVE-2026-67213
- Severity: High
- CISA known-exploited: No
- Summary: nanoid: custom generators can loop indefinitely when size is zero
- Package: `nanoid` (npm)
- Affected versions: < 3.3.18; >= 4.0.0, < 5.1.6
- Installed 3.3.11 in `package-lock.json`. Fixed in 3.3.18. Patch: Transitive dependency. Run `npm update nanoid`; if `npm ls nanoid` still shows 3.3.11, add `"overrides": {"nanoid": "^3.3.18"}` to `package.json` and run `npm install`.
- Tracking issue: [#10](https://github.com/timothyryner/marketplace-hub/issues/10)

### GHSA-xwg4-73v4-xw9w: nanoid (High)
<!-- securitybot-id: GHSA-xwg4-73v4-xw9w|npm|nanoid -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-xwg4-73v4-xw9w](https://github.com/advisories/GHSA-xwg4-73v4-xw9w)
- CVE: CVE-2026-73086
- Severity: High
- CISA known-exploited: No
- Summary: nanoid: Integer Overflow or Wraparound
- Package: `nanoid` (npm)
- Affected versions: < 3.3.12; >= 4.0.0, < 5.1.11
- Installed 3.3.11 in `package-lock.json`. Fixed in 3.3.12. Patch: Transitive dependency. Run `npm update nanoid`; if `npm ls nanoid` still shows 3.3.11, add `"overrides": {"nanoid": "^3.3.12"}` to `package.json` and run `npm install`.
- Tracking issue: [#10](https://github.com/timothyryner/marketplace-hub/issues/10)

### GHSA-267c-6grr-h53f: next (High)
<!-- securitybot-id: GHSA-267c-6grr-h53f|npm|next -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-267c-6grr-h53f](https://github.com/advisories/GHSA-267c-6grr-h53f)
- CVE: CVE-2026-44575
- Severity: High
- CISA known-exploited: No
- Summary: Next.js has a Middleware / Proxy bypass in App Router applications via segment-prefetch routes
- Package: `next` (npm)
- Affected versions: >= 15.2.0, < 15.5.16; >= 16.0.0, < 16.2.5
- Installed 16.2.3 in `package-lock.json`. Fixed in 16.2.5. Patch: `npm install next@16.2.5`

### GHSA-26hh-7cqf-hhc6: next (High)
<!-- securitybot-id: GHSA-26hh-7cqf-hhc6|npm|next -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-26hh-7cqf-hhc6](https://github.com/advisories/GHSA-26hh-7cqf-hhc6)
- CVE: CVE-2026-45109
- Severity: High
- CISA known-exploited: No
- Summary: Next.js has a Middleware / Proxy bypass in App Router applications via segment-prefetch routes - Incomplete Fix Follow-Up
- Package: `next` (npm)
- Affected versions: >= 15.2.0, < 15.5.18; >= 16.0.0, < 16.2.6
- Installed 16.2.3 in `package-lock.json`. Fixed in 16.2.6. Patch: `npm install next@16.2.6`

### GHSA-36qx-fr4f-26g5: next (High)
<!-- securitybot-id: GHSA-36qx-fr4f-26g5|npm|next -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-36qx-fr4f-26g5](https://github.com/advisories/GHSA-36qx-fr4f-26g5)
- CVE: CVE-2026-44573
- Severity: High
- CISA known-exploited: No
- Summary: Next.js has a Middleware / Proxy bypass in Pages Router applications using i18n
- Package: `next` (npm)
- Affected versions: >= 12.2.0, < 15.5.16; >= 16.0.0, < 16.2.5
- Installed 16.2.3 in `package-lock.json`. Fixed in 16.2.5. Patch: `npm install next@16.2.5`

### GHSA-492v-c6pp-mqqv: next (High)
<!-- securitybot-id: GHSA-492v-c6pp-mqqv|npm|next -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-492v-c6pp-mqqv](https://github.com/advisories/GHSA-492v-c6pp-mqqv)
- CVE: CVE-2026-44574
- Severity: High
- CISA known-exploited: No
- Summary: Next.js has a Middleware / Proxy bypass through dynamic route parameter injection
- Package: `next` (npm)
- Affected versions: >= 15.4.0, < 15.5.16; >= 16.0.0, < 16.2.5
- Installed 16.2.3 in `package-lock.json`. Fixed in 16.2.5. Patch: `npm install next@16.2.5`

### GHSA-6gpp-xcg3-4w24: next (High)
<!-- securitybot-id: GHSA-6gpp-xcg3-4w24|npm|next -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-6gpp-xcg3-4w24](https://github.com/advisories/GHSA-6gpp-xcg3-4w24)
- CVE: CVE-2026-64642
- Severity: High
- CISA known-exploited: No
- Summary: Next.js: Middleware / Proxy bypass in App Router applications using Turbopack and single locale
- Package: `next` (npm)
- Affected versions: >= 16.0.0, < 16.2.11
- Installed 16.2.3 in `package-lock.json`. Fixed in 16.2.11. Patch: `npm install next@16.2.11`

### GHSA-89xv-2m56-2m9x: next (High)
<!-- securitybot-id: GHSA-89xv-2m56-2m9x|npm|next -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-89xv-2m56-2m9x](https://github.com/advisories/GHSA-89xv-2m56-2m9x)
- CVE: CVE-2026-64649
- Severity: High
- CISA known-exploited: No
- Summary: Next.js: Server-Side Request Forgery in Server Actions on custom servers
- Package: `next` (npm)
- Affected versions: >= 14.1.1, < 15.5.21; >= 16.0.0, < 16.2.11
- Installed 16.2.3 in `package-lock.json`. Fixed in 16.2.11. Patch: `npm install next@16.2.11`

### GHSA-8h8q-6873-q5fj: next (High)
<!-- securitybot-id: GHSA-8h8q-6873-q5fj|npm|next -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-8h8q-6873-q5fj](https://github.com/advisories/GHSA-8h8q-6873-q5fj)
- Severity: High
- CISA known-exploited: No
- Summary: Next.js Vulnerable to Denial of Service with Server Components
- Package: `next` (npm)
- Affected versions: >= 13.0.0, < 15.5.16; >= 16.0.0, < 16.2.5
- Installed 16.2.3 in `package-lock.json`. Fixed in 16.2.5. Patch: `npm install next@16.2.5`

### GHSA-c4j6-fc7j-m34r: next (High)
<!-- securitybot-id: GHSA-c4j6-fc7j-m34r|npm|next -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-c4j6-fc7j-m34r](https://github.com/advisories/GHSA-c4j6-fc7j-m34r)
- CVE: CVE-2026-44578
- Severity: High
- CISA known-exploited: No
- Summary: Next.js vulnerable to server-side request forgery in applications using WebSocket upgrades
- Package: `next` (npm)
- Affected versions: >= 13.4.13, < 15.5.16; >= 16.0.0, < 16.2.5
- Installed 16.2.3 in `package-lock.json`. Fixed in 16.2.5. Patch: `npm install next@16.2.5`

### GHSA-cjq9-62q9-8jv4: next (High)
<!-- securitybot-id: GHSA-cjq9-62q9-8jv4|npm|next -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-cjq9-62q9-8jv4](https://github.com/advisories/GHSA-cjq9-62q9-8jv4)
- CVE: CVE-2026-94483
- Severity: High
- CISA known-exploited: No
- Summary: Next.js has Server-Side Request Forgery in Image Optimization
- Package: `next` (npm)
- Affected versions: >= 16.0.0, < 16.3.8
- Installed 16.2.3 in `package-lock.json`. Fixed in 16.3.8. Patch: `npm install next@16.3.8`

### GHSA-m99w-x7hq-7vfj: next (High)
<!-- securitybot-id: GHSA-m99w-x7hq-7vfj|npm|next -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-m99w-x7hq-7vfj](https://github.com/advisories/GHSA-m99w-x7hq-7vfj)
- CVE: CVE-2026-64641
- Severity: High
- CISA known-exploited: No
- Summary: Next.js: Denial of Service in App Router using Server Actions
- Package: `next` (npm)
- Affected versions: >= 13.0.0, < 15.5.21; >= 16.0.0, < 16.2.11
- Installed 16.2.3 in `package-lock.json`. Fixed in 16.2.11. Patch: `npm install next@16.2.11`

### GHSA-mg66-mrh9-m8jx: next (High)
<!-- securitybot-id: GHSA-mg66-mrh9-m8jx|npm|next -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-mg66-mrh9-m8jx](https://github.com/advisories/GHSA-mg66-mrh9-m8jx)
- CVE: CVE-2026-44579
- Severity: High
- CISA known-exploited: No
- Summary: Next.js vulnerable to Denial of Service via connection exhaustion in applications using Cache Components
- Package: `next` (npm)
- Affected versions: >= 15.0.0, < 15.5.16; >= 16.0.0, < 16.2.5
- Installed 16.2.3 in `package-lock.json`. Fixed in 16.2.5. Patch: `npm install next@16.2.5`

### GHSA-p3m5-59mp-jv5r: next (High)
<!-- securitybot-id: GHSA-p3m5-59mp-jv5r|npm|next -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-p3m5-59mp-jv5r](https://github.com/advisories/GHSA-p3m5-59mp-jv5r)
- CVE: CVE-2026-94482
- Severity: High
- CISA known-exploited: No
- Summary: Next.js: Denial of Service in App Router using Server Actions
- Package: `next` (npm)
- Affected versions: >= 13.0.0, < 15.5.28; >= 16.0.0, < 16.4.1
- Installed 16.2.3 in `package-lock.json`. Fixed in 16.4.1. Patch: `npm install next@16.4.1`

### GHSA-p9j2-gv94-2wf4: next (High)
<!-- securitybot-id: GHSA-p9j2-gv94-2wf4|npm|next -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-p9j2-gv94-2wf4](https://github.com/advisories/GHSA-p9j2-gv94-2wf4)
- CVE: CVE-2026-64645
- Severity: High
- CISA known-exploited: No
- Summary: Next.js: Server-Side Request Forgery in rewrites via attacker-controlled destination hostname
- Package: `next` (npm)
- Affected versions: >= 12.0.0, < 15.5.21; >= 16.0.0, < 16.2.11
- Installed 16.2.3 in `package-lock.json`. Fixed in 16.2.11. Patch: `npm install next@16.2.11`

### GHSA-6g55-p6wh-862q: postcss (High)
<!-- securitybot-id: GHSA-6g55-p6wh-862q|npm|postcss -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-6g55-p6wh-862q](https://github.com/advisories/GHSA-6g55-p6wh-862q)
- CVE: CVE-2026-45623
- Severity: High
- CISA known-exploited: No
- Summary: PostCSS: Arbitrary file read and information disclosure via attacker-controlled sourceMappingURL in CSS comments
- Package: `postcss` (npm)
- Affected versions: < 8.5.12
- Installed 8.4.31 in `package-lock.json`. Fixed in 8.5.12. Patch: Transitive dependency. Run `npm update postcss`; if `npm ls postcss` still shows 8.4.31, add `"overrides": {"postcss": "^8.5.12"}` to `package.json` and run `npm install`.
- Installed 8.5.9 in `package-lock.json`. Fixed in 8.5.12. Patch: Transitive dependency. Run `npm update postcss`; if `npm ls postcss` still shows 8.5.9, add `"overrides": {"postcss": "^8.5.12"}` to `package.json` and run `npm install`.
- Tracking issue: [#11](https://github.com/timothyryner/marketplace-hub/issues/11)

### GHSA-r28c-9q8g-f849: postcss (High)
<!-- securitybot-id: GHSA-r28c-9q8g-f849|npm|postcss -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-r28c-9q8g-f849](https://github.com/advisories/GHSA-r28c-9q8g-f849)
- CVE: CVE-2026-73646
- Severity: High
- CISA known-exploited: No
- Summary: PostCSS: Path Traversal in Previous Source Map Auto-Loading (sourceMappingURL) leads to Arbitrary .map File Disclosure
- Package: `postcss` (npm)
- Affected versions: < 8.5.18
- Installed 8.4.31 in `package-lock.json`. Fixed in 8.5.18. Patch: Transitive dependency. Run `npm update postcss`; if `npm ls postcss` still shows 8.4.31, add `"overrides": {"postcss": "^8.5.18"}` to `package.json` and run `npm install`.
- Installed 8.5.9 in `package-lock.json`. Fixed in 8.5.18. Patch: Transitive dependency. Run `npm update postcss`; if `npm ls postcss` still shows 8.5.9, add `"overrides": {"postcss": "^8.5.18"}` to `package.json` and run `npm install`.
- Tracking issue: [#11](https://github.com/timothyryner/marketplace-hub/issues/11)

### GHSA-f88m-g3jw-g9cj: sharp (High)
<!-- securitybot-id: GHSA-f88m-g3jw-g9cj|npm|sharp -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-f88m-g3jw-g9cj](https://github.com/advisories/GHSA-f88m-g3jw-g9cj)
- CVE: CVE-2026-114113
- Severity: High
- CISA known-exploited: No
- Summary: sharp inherited vulnerabilities in libvips: CVE-2026-33327, CVE-2026-33328, CVE-2026-35590, CVE-2026-35591
- Package: `sharp` (npm)
- Affected versions: < 0.35.0
- Installed 0.34.5 in `package-lock.json`. Fixed in 0.35.0. Patch: Transitive dependency. Run `npm update sharp`; if `npm ls sharp` still shows 0.34.5, add `"overrides": {"sharp": "^0.35.0"}` to `package.json` and run `npm install`.
- Tracking issue: [#12](https://github.com/timothyryner/marketplace-hub/issues/12)

### GHSA-rgj7-g3m4-5g8c: sharp (High)
<!-- securitybot-id: GHSA-rgj7-g3m4-5g8c|npm|sharp -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-rgj7-g3m4-5g8c](https://github.com/advisories/GHSA-rgj7-g3m4-5g8c)
- CVE: CVE-2026-114112
- Severity: High
- CISA known-exploited: No
- Summary: sharp: Vulnerabilities in libheif: GHSA-g89c-p67h-r497 and GHSA-2jg2-4ch7-h545
- Package: `sharp` (npm)
- Affected versions: < 0.35.4
- Installed 0.34.5 in `package-lock.json`. Fixed in 0.35.4. Patch: Transitive dependency. Run `npm update sharp`; if `npm ls sharp` still shows 0.34.5, add `"overrides": {"sharp": "^0.35.4"}` to `package.json` and run `npm install`.
- Tracking issue: [#12](https://github.com/timothyryner/marketplace-hub/issues/12)

### GHSA-wq5f-xc86-pv6w: sharp (High)
<!-- securitybot-id: GHSA-wq5f-xc86-pv6w|npm|sharp -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-wq5f-xc86-pv6w](https://github.com/advisories/GHSA-wq5f-xc86-pv6w)
- CVE: CVE-2026-114111
- Severity: High
- CISA known-exploited: No
- Summary: sharp : Vulnerability in librsvg dependency CVE-2026-96889
- Package: `sharp` (npm)
- Affected versions: < 0.35.5
- Installed 0.34.5 in `package-lock.json`. Fixed in 0.35.5. Patch: Transitive dependency. Run `npm update sharp`; if `npm ls sharp` still shows 0.34.5, add `"overrides": {"sharp": "^0.35.5"}` to `package.json` and run `npm install`.
- Tracking issue: [#12](https://github.com/timothyryner/marketplace-hub/issues/12)

### GHSA-68fv-2mgg-jv7q: source-map-js (High)
<!-- securitybot-id: GHSA-68fv-2mgg-jv7q|npm|source-map-js -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-68fv-2mgg-jv7q](https://github.com/advisories/GHSA-68fv-2mgg-jv7q)
- CVE: CVE-2026-93749
- Severity: High
- CISA known-exploited: No
- Summary: source-map-js allows event-loop denial of service through indexed source-map section offsets
- Package: `source-map-js` (npm)
- Affected versions: >= 1.0.0, < 1.2.2
- Installed 1.2.1 in `package-lock.json`. Fixed in 1.2.2. Patch: Transitive dependency. Run `npm update source-map-js`; if `npm ls source-map-js` still shows 1.2.1, add `"overrides": {"source-map-js": "^1.2.2"}` to `package.json` and run `npm install`.
- Tracking issue: [#13](https://github.com/timothyryner/marketplace-hub/issues/13)

### GHSA-96hv-2xvq-fx4p: ws (High)
<!-- securitybot-id: GHSA-96hv-2xvq-fx4p|npm|ws -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-96hv-2xvq-fx4p](https://github.com/advisories/GHSA-96hv-2xvq-fx4p)
- CVE: CVE-2026-48779
- Severity: High
- CISA known-exploited: No
- Summary: ws: Memory exhaustion DoS from tiny fragments and data chunks
- Package: `ws` (npm)
- Affected versions: >= 1.1.0, < 5.2.5; >= 6.0.0, < 6.2.4; >= 7.0.0, < 7.5.11; >= 8.0.0, < 8.21.0
- Installed 8.20.0 in `package-lock.json`. Fixed in 8.21.0. Patch: Transitive dependency. Run `npm update ws`; if `npm ls ws` still shows 8.20.0, add `"overrides": {"ws": "^8.21.0"}` to `package.json` and run `npm install`.
- Tracking issue: [#14](https://github.com/timothyryner/marketplace-hub/issues/14)

### GHSA-mrhx-c7xc-m3w5: zod (High)
<!-- securitybot-id: GHSA-mrhx-c7xc-m3w5|npm|zod -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-mrhx-c7xc-m3w5](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5)
- CVE: CVE-2023-54404
- Severity: High
- CISA known-exploited: No
- Summary: Zod can exhaust memory while validating oversized constrained collections
- Package: `zod` (npm)
- Affected versions: < 4.6.6
- Installed 4.3.6 in `package-lock.json`. Fixed in 4.6.6. Patch: Transitive dependency. Run `npm update zod`; if `npm ls zod` still shows 4.3.6, add `"overrides": {"zod": "^4.6.6"}` to `package.json` and run `npm install`.
- Tracking issue: [#15](https://github.com/timothyryner/marketplace-hub/issues/15)

### GHSA-p498-v437-472g: @humanfs/node (Moderate)
<!-- securitybot-id: GHSA-p498-v437-472g|npm|@humanfs/node -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-p498-v437-472g](https://github.com/advisories/GHSA-p498-v437-472g)
- Severity: Moderate
- CISA known-exploited: No
- Summary: humanfs: Recursive copy follows symlinked files and copies data from outside the source tree
- Package: `@humanfs/node` (npm)
- Affected versions: < 0.16.8
- Installed 0.16.7 in `package-lock.json`. Fixed in 0.16.8. Patch: Transitive dependency. Run `npm update @humanfs/node`; if `npm ls @humanfs/node` still shows 0.16.7, add `"overrides": {"@humanfs/node": "^0.16.8"}` to `package.json` and run `npm install`.

### GHSA-w5vr-8v7q-w6rv: baseline-browser-mapping (Moderate)
<!-- securitybot-id: GHSA-w5vr-8v7q-w6rv|npm|baseline-browser-mapping -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-w5vr-8v7q-w6rv](https://github.com/advisories/GHSA-w5vr-8v7q-w6rv)
- CVE: CVE-2026-45819
- Severity: Moderate
- CISA known-exploited: No
- Summary: baseline-browser-mapping process termination on invalid input causes denial of service
- Package: `baseline-browser-mapping` (npm)
- Affected versions: >= 2.0.0, < 2.11.0
- Installed 2.10.17 in `package-lock.json`. Fixed in 2.11.0. Patch: Transitive dependency. Run `npm update baseline-browser-mapping`; if `npm ls baseline-browser-mapping` still shows 2.10.17, add `"overrides": {"baseline-browser-mapping": "^2.11.0"}` to `package.json` and run `npm install`.

### GHSA-jxxr-4gwj-5jf2: brace-expansion (Moderate)
<!-- securitybot-id: GHSA-jxxr-4gwj-5jf2|npm|brace-expansion -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-jxxr-4gwj-5jf2](https://github.com/advisories/GHSA-jxxr-4gwj-5jf2)
- CVE: CVE-2026-45149
- Severity: Moderate
- CISA known-exploited: No
- Summary: brace-expansion: Large numeric range defeats documented `max` DoS protection
- Package: `brace-expansion` (npm)
- Affected versions: >= 5.0.0, < 5.0.6
- Installed 5.0.5 in `package-lock.json`. Fixed in 5.0.6. Patch: Transitive dependency. Run `npm update brace-expansion`; if `npm ls brace-expansion` still shows 5.0.5, add `"overrides": {"brace-expansion": "^5.0.6"}` to `package.json` and run `npm install`.

### GHSA-q2hr-2g5m-vwhr: brace-expansion (Moderate)
<!-- securitybot-id: GHSA-q2hr-2g5m-vwhr|npm|brace-expansion -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-q2hr-2g5m-vwhr](https://github.com/advisories/GHSA-q2hr-2g5m-vwhr)
- CVE: CVE-2026-102277
- Severity: Moderate
- CISA known-exploited: No
- Summary: brace-expansion: Quadratic-time expansion of the `{a},b}` rewrite causes CPU denial of service
- Package: `brace-expansion` (npm)
- Affected versions: < 1.1.21; >= 2.0.0, < 2.1.7; >= 3.0.0, < 3.0.9; >= 4.0.0, < 5.0.12
- Installed 1.1.13 in `package-lock.json`. Fixed in 1.1.21. Patch: Transitive dependency. Run `npm update brace-expansion`; if `npm ls brace-expansion` still shows 1.1.13, add `"overrides": {"brace-expansion": "^1.1.21"}` to `package.json` and run `npm install`.
- Installed 5.0.5 in `package-lock.json`. Fixed in 5.0.12. Patch: Transitive dependency. Run `npm update brace-expansion`; if `npm ls brace-expansion` still shows 5.0.5, add `"overrides": {"brace-expansion": "^5.0.12"}` to `package.json` and run `npm install`.

### GHSA-h67p-54hq-rp68: js-yaml (Moderate)
<!-- securitybot-id: GHSA-h67p-54hq-rp68|npm|js-yaml -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-h67p-54hq-rp68](https://github.com/advisories/GHSA-h67p-54hq-rp68)
- CVE: CVE-2026-53550
- Severity: Moderate
- CISA known-exploited: No
- Summary: JS-YAML: Quadratic-complexity DoS in merge key handling via repeated aliases
- Package: `js-yaml` (npm)
- Affected versions: < 3.15.0; >= 4.0.0, < 4.2.0
- Installed 4.1.1 in `package-lock.json`. Fixed in 4.2.0. Patch: Transitive dependency. Run `npm update js-yaml`; if `npm ls js-yaml` still shows 4.1.1, add `"overrides": {"js-yaml": "^4.2.0"}` to `package.json` and run `npm install`.

### GHSA-4633-3j49-mh5q: next (Moderate)
<!-- securitybot-id: GHSA-4633-3j49-mh5q|npm|next -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-4633-3j49-mh5q](https://github.com/advisories/GHSA-4633-3j49-mh5q)
- CVE: CVE-2026-64647
- Severity: Moderate
- CISA known-exploited: No
- Summary: Next.js: Cache confusion of response bodies for requests with bodies containing invalid UTF-8 byte sequences
- Package: `next` (npm)
- Affected versions: >= 13.0.0, < 15.5.21; >= 16.0.0, < 16.2.11
- Installed 16.2.3 in `package-lock.json`. Fixed in 16.2.11. Patch: `npm install next@16.2.11`

### GHSA-4c39-4ccg-62r3: next (Moderate)
<!-- securitybot-id: GHSA-4c39-4ccg-62r3|npm|next -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-4c39-4ccg-62r3](https://github.com/advisories/GHSA-4c39-4ccg-62r3)
- CVE: CVE-2026-64646
- Severity: Moderate
- CISA known-exploited: No
- Summary: Next.js: Unbounded Server Action payload in Edge runtime
- Package: `next` (npm)
- Affected versions: >= 13.0.0, < 15.5.21; >= 16.0.0, < 16.2.11
- Installed 16.2.3 in `package-lock.json`. Fixed in 16.2.11. Patch: `npm install next@16.2.11`

### GHSA-4jqv-mc3x-m676: next (Moderate)
<!-- securitybot-id: GHSA-4jqv-mc3x-m676|npm|next -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-4jqv-mc3x-m676](https://github.com/advisories/GHSA-4jqv-mc3x-m676)
- CVE: CVE-2026-94543
- Severity: Moderate
- CISA known-exploited: No
- Summary: Next.js has cache poisoning of SSG and ISR pages in self-hosted applications
- Package: `next` (npm)
- Affected versions: >= 15.0.0, < 15.5.27; >= 16.0.0, < 16.3.8
- Installed 16.2.3 in `package-lock.json`. Fixed in 16.3.8. Patch: `npm install next@16.3.8`

### GHSA-68g3-v927-f742: next (Moderate)
<!-- securitybot-id: GHSA-68g3-v927-f742|npm|next -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-68g3-v927-f742](https://github.com/advisories/GHSA-68g3-v927-f742)
- CVE: CVE-2026-64648
- Severity: Moderate
- CISA known-exploited: No
- Summary: Next.js: Cache confusion of response bodies for requests with bodies
- Package: `next` (npm)
- Affected versions: >= 13.0.0, < 15.5.21; >= 16.0.0, < 16.2.11
- Installed 16.2.3 in `package-lock.json`. Fixed in 16.2.11. Patch: `npm install next@16.2.11`

### GHSA-955p-x3mx-jcvp: next (Moderate)
<!-- securitybot-id: GHSA-955p-x3mx-jcvp|npm|next -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-955p-x3mx-jcvp](https://github.com/advisories/GHSA-955p-x3mx-jcvp)
- CVE: CVE-2026-64643
- Severity: Moderate
- CISA known-exploited: No
- Summary: Next.js: Unauthenticated disclosure of internal Server Function endpoints
- Package: `next` (npm)
- Affected versions: >= 13.0.0, < 15.5.21; >= 16.0.0, < 16.2.11
- Installed 16.2.3 in `package-lock.json`. Fixed in 16.2.11. Patch: `npm install next@16.2.11`

### GHSA-f87g-xv8r-7p7x: next (Moderate)
<!-- securitybot-id: GHSA-f87g-xv8r-7p7x|npm|next -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-f87g-xv8r-7p7x](https://github.com/advisories/GHSA-f87g-xv8r-7p7x)
- CVE: CVE-2026-94485
- Severity: Moderate
- CISA known-exploited: No
- Summary: Next.js has information disclosure in App Router metadata image routes via dynamicParams bypass
- Package: `next` (npm)
- Affected versions: >= 16.0.0, < 16.3.8
- Installed 16.2.3 in `package-lock.json`. Fixed in 16.3.8. Patch: `npm install next@16.3.8`

### GHSA-ffhc-5mcf-pf4q: next (Moderate)
<!-- securitybot-id: GHSA-ffhc-5mcf-pf4q|npm|next -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-ffhc-5mcf-pf4q](https://github.com/advisories/GHSA-ffhc-5mcf-pf4q)
- CVE: CVE-2026-44581
- Severity: Moderate
- CISA known-exploited: No
- Summary: Next.js vulnerable to cross-site scripting in App Router applications using CSP nonces
- Package: `next` (npm)
- Affected versions: >= 13.4.0, < 15.5.16; >= 16.0.0, < 16.2.5
- Installed 16.2.3 in `package-lock.json`. Fixed in 16.2.5. Patch: `npm install next@16.2.5`

### GHSA-gx5p-jg67-6x7h: next (Moderate)
<!-- securitybot-id: GHSA-gx5p-jg67-6x7h|npm|next -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-gx5p-jg67-6x7h](https://github.com/advisories/GHSA-gx5p-jg67-6x7h)
- CVE: CVE-2026-44580
- Severity: Moderate
- CISA known-exploited: No
- Summary: Next.js has cross-site scripting in beforeInteractive scripts with untrusted input
- Package: `next` (npm)
- Affected versions: >= 13.0.0, < 15.5.16; >= 16.0.0, < 16.2.5
- Installed 16.2.3 in `package-lock.json`. Fixed in 16.2.5. Patch: `npm install next@16.2.5`

### GHSA-h64f-5h5j-jqjh: next (Moderate)
<!-- securitybot-id: GHSA-h64f-5h5j-jqjh|npm|next -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-h64f-5h5j-jqjh](https://github.com/advisories/GHSA-h64f-5h5j-jqjh)
- CVE: CVE-2026-44577
- Severity: Moderate
- CISA known-exploited: No
- Summary: Next.js has a Denial of Service in the Image Optimization API
- Package: `next` (npm)
- Affected versions: >= 10.0.0, < 15.5.16; >= 16.0.0, < 16.2.5
- Installed 16.2.3 in `package-lock.json`. Fixed in 16.2.5. Patch: `npm install next@16.2.5`

### GHSA-mcj8-r9mp-w47p: next (Moderate)
<!-- securitybot-id: GHSA-mcj8-r9mp-w47p|npm|next -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-mcj8-r9mp-w47p](https://github.com/advisories/GHSA-mcj8-r9mp-w47p)
- CVE: CVE-2026-94484
- Severity: Moderate
- CISA known-exploited: No
- Summary: Next.js has cache poisoning in SSG/ISR rendering that leads to cross-user content substitution and persistent denial of service
- Package: `next` (npm)
- Affected versions: >= 15.0.0, < 15.5.27; >= 16.0.0, < 16.3.8
- Installed 16.2.3 in `package-lock.json`. Fixed in 16.3.8. Patch: `npm install next@16.3.8`

### GHSA-q8wf-6r8g-63ch: next (Moderate)
<!-- securitybot-id: GHSA-q8wf-6r8g-63ch|npm|next -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-q8wf-6r8g-63ch](https://github.com/advisories/GHSA-q8wf-6r8g-63ch)
- CVE: CVE-2026-64644
- Severity: Moderate
- CISA known-exploited: No
- Summary: Next.js: Denial of Service in the Image Optimization API using SVGs
- Package: `next` (npm)
- Affected versions: >= 15.5.0, < 15.5.21; >= 16.0.0, < 16.2.11
- Installed 16.2.3 in `package-lock.json`. Fixed in 16.2.11. Patch: `npm install next@16.2.11`

### GHSA-wfc6-r584-vfw7: next (Moderate)
<!-- securitybot-id: GHSA-wfc6-r584-vfw7|npm|next -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-wfc6-r584-vfw7](https://github.com/advisories/GHSA-wfc6-r584-vfw7)
- CVE: CVE-2026-44576
- Severity: Moderate
- CISA known-exploited: No
- Summary: Next.js vulnerable to cache poisoning in React Server Component responses
- Package: `next` (npm)
- Affected versions: >= 14.2.0, < 15.5.16; >= 16.0.0, < 16.2.5
- Installed 16.2.3 in `package-lock.json`. Fixed in 16.2.5. Patch: `npm install next@16.2.5`

### GHSA-fxqj-rqcc-2cmp: postcss (Moderate)
<!-- securitybot-id: GHSA-fxqj-rqcc-2cmp|npm|postcss -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-fxqj-rqcc-2cmp](https://github.com/advisories/GHSA-fxqj-rqcc-2cmp)
- CVE: CVE-2026-69153
- Severity: Moderate
- CISA known-exploited: No
- Summary: PostCSS: incomplete fix of GHSA-6g55-p6wh-862q — attacker-controlled sourceMappingURL reads arbitrary .map files when `from` is unset
- Package: `postcss` (npm)
- Affected versions: < 8.5.23
- Installed 8.4.31 in `package-lock.json`. Fixed in 8.5.23. Patch: Transitive dependency. Run `npm update postcss`; if `npm ls postcss` still shows 8.4.31, add `"overrides": {"postcss": "^8.5.23"}` to `package.json` and run `npm install`.
- Installed 8.5.9 in `package-lock.json`. Fixed in 8.5.23. Patch: Transitive dependency. Run `npm update postcss`; if `npm ls postcss` still shows 8.5.9, add `"overrides": {"postcss": "^8.5.23"}` to `package.json` and run `npm install`.

### GHSA-qx2v-qp2m-jg93: postcss (Moderate)
<!-- securitybot-id: GHSA-qx2v-qp2m-jg93|npm|postcss -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-qx2v-qp2m-jg93](https://github.com/advisories/GHSA-qx2v-qp2m-jg93)
- CVE: CVE-2026-41305
- Severity: Moderate
- CISA known-exploited: No
- Summary: PostCSS has XSS via Unescaped </style> in its CSS Stringify Output
- Package: `postcss` (npm)
- Affected versions: < 8.5.10
- Installed 8.4.31 in `package-lock.json`. Fixed in 8.5.10. Patch: Transitive dependency. Run `npm update postcss`; if `npm ls postcss` still shows 8.4.31, add `"overrides": {"postcss": "^8.5.10"}` to `package.json` and run `npm install`.
- Installed 8.5.9 in `package-lock.json`. Fixed in 8.5.10. Patch: Transitive dependency. Run `npm update postcss`; if `npm ls postcss` still shows 8.5.9, add `"overrides": {"postcss": "^8.5.10"}` to `package.json` and run `npm install`.

### GHSA-w5hq-g745-h8pq: uuid (Moderate)
<!-- securitybot-id: GHSA-w5hq-g745-h8pq|npm|uuid -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-w5hq-g745-h8pq](https://github.com/advisories/GHSA-w5hq-g745-h8pq)
- CVE: CVE-2026-41907, CVE-2026-41988
- Severity: Moderate
- CISA known-exploited: No
- Summary: uuid: Missing buffer bounds check in v3/v5/v6 when buf is provided
- Package: `uuid` (npm)
- Affected versions: < 11.1.1; >= 12.0.0, < 12.0.1; >= 13.0.0, < 13.0.1
- Installed 13.0.0 in `package-lock.json`. Fixed in 13.0.1. Patch: `npm install uuid@13.0.1`

### GHSA-58qx-3vcg-4xpx: ws (Moderate)
<!-- securitybot-id: GHSA-58qx-3vcg-4xpx|npm|ws -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-58qx-3vcg-4xpx](https://github.com/advisories/GHSA-58qx-3vcg-4xpx)
- CVE: CVE-2026-45736
- Severity: Moderate
- CISA known-exploited: No
- Summary: ws: Uninitialized memory disclosure
- Package: `ws` (npm)
- Affected versions: >= 8.0.0, < 8.20.1
- Installed 8.20.0 in `package-lock.json`. Fixed in 8.20.1. Patch: Transitive dependency. Run `npm update ws`; if `npm ls ws` still shows 8.20.0, add `"overrides": {"ws": "^8.20.1"}` to `package.json` and run `npm install`.

### GHSA-4x5r-pxfx-6jf8: @babel/core (Low)
<!-- securitybot-id: GHSA-4x5r-pxfx-6jf8|npm|@babel/core -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-4x5r-pxfx-6jf8](https://github.com/advisories/GHSA-4x5r-pxfx-6jf8)
- CVE: CVE-2026-49356
- Severity: Low
- CISA known-exploited: No
- Summary: @babel/core: Arbitrary File Read via sourceMappingURL Comment
- Package: `@babel/core` (npm)
- Affected versions: < 7.29.6; >= 8.0.0-alpha.0, < 8.0.0-rc.6
- Installed 7.29.0 in `package-lock.json`. Fixed in 7.29.6. Patch: Transitive dependency. Run `npm update @babel/core`; if `npm ls @babel/core` still shows 7.29.0, add `"overrides": {"@babel/core": "^7.29.6"}` to `package.json` and run `npm install`.

### GHSA-39w2-rjm5-chcv: next (Low)
<!-- securitybot-id: GHSA-39w2-rjm5-chcv|npm|next -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-39w2-rjm5-chcv](https://github.com/advisories/GHSA-39w2-rjm5-chcv)
- CVE: CVE-2026-94486
- Severity: Low
- CISA known-exploited: No
- Summary: Next.js has information disclosure in development server's Model Context Protocol endpoint
- Package: `next` (npm)
- Affected versions: >= 16.0.0, < 16.3.8
- Installed 16.2.3 in `package-lock.json`. Fixed in 16.3.8. Patch: `npm install next@16.3.8`

### GHSA-3g8h-86w9-wvmq: next (Low)
<!-- securitybot-id: GHSA-3g8h-86w9-wvmq|npm|next -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-3g8h-86w9-wvmq](https://github.com/advisories/GHSA-3g8h-86w9-wvmq)
- CVE: CVE-2026-44572
- Severity: Low
- CISA known-exploited: No
- Summary: Next.js's Middleware / Proxy redirects can be cache-poisoned
- Package: `next` (npm)
- Affected versions: >= 12.2.0, < 15.5.16; >= 16.0.0, < 16.2.5
- Installed 16.2.3 in `package-lock.json`. Fixed in 16.2.5. Patch: `npm install next@16.2.5`

### GHSA-vfv6-92ff-j949: next (Low)
<!-- securitybot-id: GHSA-vfv6-92ff-j949|npm|next -->
- Status: Resolved (verified 2026-10-27 CDT: the default branch no longer resolves an affected version)
- Advisory: [GHSA-vfv6-92ff-j949](https://github.com/advisories/GHSA-vfv6-92ff-j949)
- CVE: CVE-2026-44582
- Severity: Low
- CISA known-exploited: No
- Summary: Next.js vulnerable to cache poisoning via collisions in React Server Component cache-busting
- Package: `next` (npm)
- Affected versions: >= 13.4.6, < 15.5.16; >= 16.0.0, < 16.2.5
- Installed 16.2.3 in `package-lock.json`. Fixed in 16.2.5. Patch: `npm install next@16.2.5`
