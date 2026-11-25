# 17 to 16: eliminate case (8,6,12)
Status: independently reproduced symbolic sieve (270 -> 85 -> 39 -> 24 -> 17). Elementary exclusion below is conditional on the earlier r<pq theorem, which has not been machine-verified. No novelty claim.

Use the zero-based form indices from three_prime_symbolic_sieve.py. The doubled lengths are:
D8 = p²-q²r², D6 = p²r²-q², D12 = pq(r²-1).
The Pythagorean condition is D8²-D6²-D12²=0.
Exact expansion gives
D8²-D6²-D12² = (r²-1)*[(q⁴-p⁴)(r²+1)-p²q²(r²-1)].
As r>1, the bracket must vanish. Since p,q are distinct primes, gcd(p²,q⁴-p⁴)=gcd(q²,q⁴-p⁴)=1. Consequently p²|r²+1 and q²|r²+1, so p²q²|r²+1.
But r<pq implies 0<r²+1<(pq)² (since pq>=15 and r<=pq-1), contradiction.
This excludes one entire symbolic form for every admissible triple, leaving 16.

## Modular tests and limitation
An independent exact modular test of all 17 cases at moduli 3,5,7,8,9,11,13,16,17,19,23,25,27,31,32,37,49,64,81,125,128 found no case whose polynomial lacked all admissible local residues.
In fact this obstruction is structural: p=q=r=1 mod m makes every doubled form zero mod m. For any finite collection of fixed moduli the common residue 1 mod their least common multiple survives. These are local residues, not actual equal primes or positive cuboid solutions. Hence tests of these polynomial equations at fixed moduli alone cannot prove nonexistence. Variable moduli p²,q²,r² and inequalities are promising because they are not subject to that particular limitation.

The remaining 16 cases are not settled. The Lean addition certifies the factorization only if compilation succeeds; it is not an end-to-end formal proof.
