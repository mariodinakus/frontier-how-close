# Odd-edge exclusions — exact elementary derivation
Status: human-readable proof; Lean candidate identities not yet compiled. No novelty claim.
Let a be the odd edge of a primitive perfect cuboid. The other edges b,c are even (two odd edges cannot have a square sum modulo 4; all even is nonprimitive). Put f²=b²+c². For each x in {b,c,f}, there exists y>0 with a²+x²=y². Define u=y-x; then u divides a², 1<=u<a, and X(u)=(a²/u-u)/2=x. X is strictly decreasing.
Since f>b,c, its divisor w is smaller than the distinct divisors u,v for b,c. In particular u,v>1. Since a is odd, u,v>=3; hence b,c < X(1)/3 (compare 3(a²/u-u) <= a²-9 < a²-1). Thus f² < 2 X(1)²/9 < X(1)². Consequently w cannot equal 1 either.
## Prime powers
If a=p^k for an odd prime p and k>=1, u=p^j with 1<=j<k; both u and a²/u are multiples of p. Since p is odd, p divides b. Likewise p divides c. Thus p divides all three edges, contradiction to primitivity.
## Products of two distinct odd primes
Let a=pq with 3<=p<q. The only divisors of a² strictly between 1 and a are p, q, p². Since w<u,v, w=p and {u,v}={q,p²}. Thus f=p(q²-1)/2 and the other edges are q(p²-1)/2 and (q²-p²)/2. But
4(f²-b²-c²) = (p²-1)(q²-p²)(q²+1)>0,
contradicting f²=b²+c².
Therefore a must have at least two distinct prime factors and at least three prime factors counted with multiplicity.
## Scope
These are infinite families, not a general proof of nonexistence. A related preprint exists: https://synapsesocial.com/papers/6a2900886f82f25be989d1a4 . The proof above is an independently derived elementary argument; no novelty asserted.
