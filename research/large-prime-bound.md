# Large-prime bound for the odd edge
Status: elementary proof draft, not end-to-end Lean verified; novelty not established.
Related work: https://synapsesocial.com/papers/6a2900886f82f25be989d1a4
Existing two-prime exclusion in Lean: https://github.com/yachi/lean-playground (EdgeTwoPrimes.lean); upstream build not independently checked.

## Claim
If a primitive perfect cuboid has odd edge a = A*r, with r an odd prime not dividing A, then r^2 < 2*A^2. In particular an odd edge p*q*r with p<q<r requires r < sqrt(2)*p*q.

## Proof
Suppose T=r^2 > 2*A^2. Equality is impossible for positive integers. For each x=b,c,f, where f^2=b^2+c^2, choose its positive hypotenuse y and divisor d=y-x of a^2. Then 0<d<a and 2*x=a^2/d-d. Since r>A, d cannot contain r^2. There are two types:
- type 0: d divides A^2; 2*x=(A^2/d)*T-d, which is nonzero modulo r.
- type 1: d=r*s, s divides A^2; 2*x=r*(A^2/s-s), divisible by r.
At least one of b,c is type 0 by primitivity. Exactly one type 0 among b,c,f is impossible modulo r from f^2=b^2+c^2. Thus either all three are type 0 or precisely two are type 0.

Case I: all three type 0. Let w,u,v be the divisors for f,b,c respectively. Because x(d) is strictly decreasing and f>b,c, w<u,v. Set C=u^2+v^2-w^2, so 0<C<2*A^4. Substitution into 4(f^2-b^2-c^2)=0 gives
  0 = K*T^2 + 2*A^2*T - C,
where K=(A^2/w)^2-(A^2/u)^2-(A^2/v)^2 is an integer. Thus C=k*T, with integer k>0 and k<2*A^4/T<A^2. But k=K*T+2*A^2 implies k congruent to 2*A^2 modulo T. This is impossible since 0<k<A^2<2*A^2<T.

Case II: f and exactly one of b,c (say b) are type 0. Write w,u for their respective divisors, so w<u. The other leg's doubled square is divisible by T. Reduction modulo T gives T divides u^2-w^2. Because r is odd and divides neither u nor w, r cannot divide both u-w and u+w. Therefore r^2 divides one of these positive factors. But both are <=u+w<=2*A^2<T, a contradiction.

Case III: f is type 1 and both b,c are type 0. Write w=r*s, u,v for their divisors. Monotonicity implies u,v>w>=r. Modulo T, u^2+v^2=0. Set U=A^2/u and V=A^2/v. Multiplication by U^2*V^2 gives A^4*(U^2+V^2)=0 modulo T, hence T divides U^2+V^2 because gcd(A,r)=1. Yet 0<U^2+V^2<2*A^4/T<A^2<T. Contradiction.

All cases contradict T>2*A^2. This proves the stated bound.

## Limits
No conclusion for primes occurring with multiplicity >1, or for a balanced product p*q*r. This does not solve the perfect cuboid problem. Candidate Lean identities cover only polynomial expansion, not the number-theoretic proof.
