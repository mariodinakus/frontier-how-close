# Canonical equations for the four remaining forms
All four identities were checked by exact SymPy expansion. These are necessary equations, not solved equations. Domain: 3<=p<q<r<pq, distinct primes.

(1,6,8): (p⁴+q⁴)(r⁴+1)=r²(p²q²+1)².
Necessarily r²|p⁴+q⁴ and r≡1 mod 8, since (p/q)^4=-1 modulo r has multiplicative order 8. Also r<p² by positivity of D1²-D8².

(8,2,6): (q⁴-p⁴)(r⁴-1)=(p²q²-r²)².
Reducing modulo p and dividing by q⁴r⁴ gives q^(-4)+r^(-4)=1 modulo p. A complete enumeration of the nonzero fourth powers for each prime 3<=p<=100 excludes p=3,5,13,17,41. This finite filter is not a proof for general p.

(10,2,6): (p⁴+1)(q⁴+r⁴)=p²r²(q²+1)².
Necessarily p²|q⁴+r⁴ and r²|p⁴+1 (from reduction modulo p² and r²), hence p,r≡1 mod 8. The latter divisibility also forces r<p².

(12,2,6): (p⁴+1)(q⁴+r⁴)=p²q²(r²+1)².
Necessarily p²|q⁴+r⁴ and q²|p⁴+1, hence p,q≡1 mod 8 and q<p².

For the claims r<p² or q<p²: the prime square divides the positive even integer p⁴+1, so it is at most (p⁴+1)/2<p⁴.

Next task: solve the four canonical equations under the prime and order constraints, or find an additional uniform obstruction. No further complete exclusion is asserted.
