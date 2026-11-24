# Squarefree three-prime odd edge: restrictions
Status: elementary proofs and an executed finite search; not end-to-end Lean verified; no novelty claim.

Let a=p*q*r, 3<=p<q<r distinct primes, be the odd edge of a primitive perfect cuboid. Let b,c be the even legs and f^2=b^2+c^2. Each x in {b,c,f} has a divisor d_x of a^2 with 0<d_x<a and 2x=a^2/d_x-d_x. The three divisors are distinct: f>b,c and b=c would give f^2=2b^2, impossible for positive integers.

## Close-divisor condition
Write w=d_f<u=d_max(b,c)<v=d_min(b,c). Since X(d)=(a^2/d-d)/2 is strictly decreasing,
f/max(b,c)=(u/w)*(a^2-w^2)/(a^2-u^2)>u/w.
But f^2=b^2+c^2<=2 max(b,c)^2. Thus u^2<2w^2.
Also w>1: if w=1, then u,v>=3 (all divisors odd), giving X(u),X(v)<X(1)/3; hence f^2=b^2+c^2<2f^2/9, a contradiction.
Consequently at least one consecutive pair of nontrivial divisors below a satisfies u^2<2w^2.

## Largest-prime restriction if r divides a leg
Suppose r divides c. By primitivity r does not divide b, and f^2=b^2+c^2 implies r does not divide f. Put A=p*q. For each x in {b,f}, the two positive factors of a^2 from its Pythagorean equation have r-adic exponents 0 and 2: exponents 1 and 1 would imply r divides x. Let s_x be the factor with exponent 0. Then s_x divides A^2, and 2x=abs(r^2*A^2/s_x-s_x), so 4x^2 is congruent to s_x^2 modulo r^2.
Since r^2 divides c^2, r^2 divides s_f^2-s_b^2. The factors s_f,s_b are distinct because s determines x uniquely and f>b. Cancel g=gcd(s_f,s_b), which is coprime to r, and set S=s_f/g, B=s_b/g. They are distinct positive coprime odd divisors of A^2; their product divides A^2. An odd prime r cannot divide both S+B and S-B, so r^2 divides one of these. Both are even and the difference is nonzero. Thus
  2*r^2 <= S+B <= S*B+1 <= A^2+1.
If neither S nor B contains both p and q, each is at most q^2, which contradicts 2*r^2<=S+B. Hence one contains both p and q, and by coprimality the other is 1. There exist i,j in {1,2} such that
  2*r^2 divides p^i*q^j+1 or p^i*q^j-1.
This gives eight explicit integers whose prime-square factors contain every possible r in this branch.

## Other branches
If r divides f instead, it divides neither b nor c, since primitivity would otherwise force r to divide all three edges. Then -1 is a quadratic residue modulo r, so r=1 mod 4. If r divides none of b,c,f, this lemma does not exclude that case.

## Finite search
research/three_prime_search.py enumerates all p<q<=100 and q<r with r^2<2(pq)^2, conditional on the previous large-prime bound. It then applies the close-divisor condition and tests every permissible pair of legs using exact integers. No upper bound on b or c is imposed. Results: 276 prime pairs, 98,161 odd edges, 86,758 pass the close-divisor filter, 15 primitive Euler bricks remaining after the filters, 0 perfect cuboids. Largest odd edge 105,348,499. These counts are not global counts of Euler bricks, because the filters are necessary for perfection only.
