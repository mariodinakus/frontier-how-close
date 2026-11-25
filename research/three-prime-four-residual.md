# Four residual squarefree three-prime cases

Status: elementary case exclusions with exact SymPy identity checks executed locally. Conditional on earlier r<pq and the preceding sieve; no Lean end-to-end certification, novelty, or full cuboid proof claimed.

Let 3<=p<q<r<pq be distinct primes, a=pqr, and use the doubled lengths D_i from three_prime_symbolic_sieve.py (absolute values when negative). A valid triple (f,b,c) requires D_f²=D_b²+D_c², so both differences D_f²-D_b² and D_f²-D_c² are positive. The sieve was rerun and returned stage counts 270,85,39,24,17. Case (8,6,12) was already excluded.

## Common inequality
For integers X>Y>=3 and Z>=1, put H=X²-Y². Then H>=2 and
H(Y²Z²-1)-X²Z²=[H(Y²-1)-Y²]Z²-H>0,
because H(Y²-2)>Y². Hence H(Y²Z²-1)>X²Z².

## Eight exclusions by inequalities
1. (1,2,8): D1²-D8²=(p⁴-r²)(q⁴r²-1)>0 forces r<p². Apply the common inequality with X=p²,Y=r,Z=q²: the difference exceeds p⁴q⁴>D2².
2. (1,8,11): same factorization forces r<p². Since p⁴-r²>=p² and q²>r, q⁴r²-1>r⁴. Thus the difference exceeds p²r⁴>D11².
3–5. (3,2,8), (3,6,8), (3,8,11): D3²-D8²=(p⁴-q²)(q²r⁴-1)>0 forces q<p². The common inequality with X=p²,Y=q,Z=r² yields a difference greater than p⁴r⁴. Each of D2²,D6²,D11² is strictly below p⁴r⁴ under p<q<r<pq.
6–8. (8,2,3), (8,3,6), (8,3,11): D8²-D3²=(q²-p⁴)(q²r⁴-1)>0 forces q>p². Since q²-p⁴>=2, the difference exceeds q²r⁴. Each of D2²,D6²,D11² is strictly below q²r⁴ under q>p² and r>q. Contradiction in all eight cases.

## Four exclusions by divisibility and inequalities
9. (8,2,12): The gap F=D8²-D2²-D12² modulo p² equals r⁴(q⁴-1). Thus p² divides q⁴-1, and because gcd(q²-1,q²+1) divides 2, p² divides one of the two positive even factors. This gives q²>=2p²-1. But D8²-D12²=(q²-p²)(q²r⁴-p²)>(p²-1)(q²-1)q⁴>=2(p²-1)²q⁴>p⁴q⁴>D2². Contradiction.
10. (7,2,6): D7²-D2²=(r²-p⁴)(q⁴-r²)>0 forces r>p² (since r<pq<q²). Meanwhile F modulo r² equals -q⁴(p⁴+1). Therefore r² divides p⁴+1, which is impossible for integer r>p².
11. (5,2,6): D5²-D6²=(q²-p⁴)(r⁴-q²)>0 forces q>p². F modulo q² equals -r⁴(p⁴+1), forcing q²|p⁴+1, impossible.
12. (10,5,6): D10²-D6²=(p²r²-1)(q⁴-p²r²)>0 forces q²>pr. F modulo q² equals -p²r²(p²r²-1), so q²|p²r²-1. Since q is odd, q² divides one of pr-1, pr+1, both positive even and strictly less than q² (pr and q² odd). Contradiction.

## Remaining
(1,6,8), (8,2,6), (10,2,6), (12,2,6). These are not claimed impossible. Counts: 17 minus the previous one minus 12 new exclusions = 4. The exact identity checks verify polynomial algebra and modular remainders only; the number-theoretic inequalities above are human-readable proof steps.
