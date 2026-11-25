# Linear prime-factor bound for residual equation 2

Status: elementary proof and actual exact Python/SymPy checks. Conditional on the earlier reduction to residual equation 2 and 3<=p<q<r<pq. No claim of novelty or successful Lean compilation.

Suppose (q^4-p^4)(r^4-1)=(p^2q^2-r^2)^2. Expanding gives the symmetric identity
  (p^4+1)(q^4+r^4)=(q^2*r^2+p^2)^2.
Let l be an odd prime occurring with odd exponent in p^4+1. Then l divides q^4+r^4 (even total valuation on the RHS) and q^2*r^2+p^2. In particular q,r,p are nonzero mod l. Thus q^4+r^4=0 and q^4*r^4=p^4=-1 mod l. Consequently q^8=1, q^4=+1 or -1, and r^4 has the opposite sign.
There are four possibilities:
- q²=1 mod l: l divides q-1 or q+1.
- q²=-1 mod l: r²=p² mod l, so l divides r-p or r+p.
- q²=p² mod l: l divides q-p or q+p.
- q²=-p² mod l: r²=1 mod l, so l divides r-1 or r+1.
All listed positive linear factors are even (take positive differences). Since l is odd and each nonzero factor is at most r+p, l<=(r+p)/2.

In addition q^4<2p^4: divide the original equation by r^4-1 and use
0<p²q²-r²<p²(q²-1), r^4-1>(q²-1)².
Also q>=p+2 implies A=q^4-p^4>8p³. Taking square roots and using sqrt(r^4-1)>r²-1 gives r²<1+p²q²/sqrt(A)<1+p^(5/2)/2.
Hence l<(p+sqrt(1+p^(5/2)/2))/2. This replaces the earlier quadratic-in-p bound by O(p^(5/4)).

Finite exact regression, Python/SymPy factorint and integer inequalities:
p<=5000: 668 odd primes; 159 pass old bound; 2 pass new bound (1907,3373).
p<=30000: 3244 odd primes; 789 pass old bound; 19 pass new bound. The 19 surviving primes have 5376 prime pairs with p<q and q^4<2p^4. Zero satisfy K | q^8-1, where K is the product of odd prime factors of p^4+1 of odd valuation. Thus no residual equation 2 solution with p<=30000 under the stated order assumptions.
The code reproduces these counts. This does not settle equation 2 for arbitrary primes, and does not solve the other residual equations.
