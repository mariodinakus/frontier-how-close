# Open Mathematics Lab
An isolated research branch of FRONTIER. The main branch remains unchanged.
## Problem 001: Perfect cuboid
Open: find positive integer edges and four integer diagonals, or prove nonexistence.
The Lean conjecture is a proposition, not a theorem. Initial modular certificates are known necessary conditions, not a solution. Until Actions succeeds they are uncompiled candidates. Native computation certificates depend on compiler trust; see printed axioms.
## Run
Install Lean with elan, then run:
```sh
lake update
lake exe cache get
lake build
lake env lean OpenMathLab/PerfectCuboid.lean
python3 research/residue_search.py
python3 research/cuboid_search.py 1000
```
CI checks Lean and independent bounded searches. Never interpret a finite search as a nonexistence proof. No admitted statements.
Sources: https://github.com/leanprover-community/mathlib4 and https://mathworld.wolfram.com/PerfectCuboid.html
