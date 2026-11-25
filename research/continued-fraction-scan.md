# Continued fractions and extended finite searches
Status: executed Python/SymPy checks on the four conditional quartics. No new complete symbolic exclusion or Lean-certified proof.

Case 1: write A=p^4+q^4, B=(p²q²+1)². Then A(r²+1/r²)=B. Since p<q, A<2q⁴ and B>p⁴q⁴, giving r²>p⁴/2-1>4p² for p>=3. Also q⁴r⁴<r²B gives r<p²+1/q², hence r<p² (r prime). Thus 2p<r<p². Because r² divides A, k=p/q modulo r² satisfies k⁴=-1; r=1 mod 8. Enumerate the four roots modulo r via a quadratic nonresidue, then uniquely Hensel lift to r² (derivative nonzero mod r). Write kq-p=h*r². Then |k/r²-h/q|=p/(r²q)<1/(2q²), because q<r and 2p<r. gcd(h,q)=1 since p,q are distinct primes. Legendre's continued fraction criterion guarantees h/q is a convergent. Enumerating all convergents with q<r is exhaustive for the necessary congruence, then test the exact quartic. This also uses the earlier conditional bound r<pq. For p<=2000: 70695 primes r, 282780 lifted roots, 15 candidate prime triples, no exact solutions.

Case 2: the necessary bound q^4<2p^4 follows from (q⁴-p⁴)=(p²q²-r²)²/(r⁴-1), because r>q>p and r<pq give 0<p²q²-r²<p²(q²-1) and r⁴-1>(q²-1)². Execute the exact quadratic discriminant search for p<=10000: 122698 quadratics, zero square discriminants, no integer roots.

Cases 3 and 4: unify as (p⁴+1)(s⁴+t⁴)=p²s²(t²+1)² with s and t the other primes in either order. Mod p implies -1 is a fourth power mod p, hence p=1 mod 8. Mod s² implies s²|p⁴+1. Because s is odd and the latter integer even, 2s²<=p⁴+1. Factor p⁴+1 for each eligible p<=100000: 2384 primes p, zero prime-square divisors s² with s>p. SymPy factorization is computational evidence, not a formal certificate.

Results are conditional on the earlier reduction and r<pq, which still require independent proof verification. All four cases remain symbolically open. The combined finite bound is p>2000, conditional on that reduction.
